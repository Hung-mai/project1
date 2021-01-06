import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DateTime(props) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        props.parentCallBack(selectedDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
                <Ionicons name='ios-arrow-back' style={styles.dateIcon} />
                <Text style={styles.dateText}>{"Ngày " + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</Text>
                <Ionicons name='ios-arrow-forward' style={styles.dateIcon} />
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#2ec1ac',
        marginHorizontal: 10,
        borderRadius: 5,
        textAlign: "center",
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    dateText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    dateIcon: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold"
    }
});