import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, FlatList, Modal, TouchableHighlight, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebaseApp } from '../../components/FirebaseConfig'
import { Card, CardItem, Text, Body, Item, Input, Button } from "native-base";

import DateTimePicker from '@react-native-community/datetimepicker';


export default class AddIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 'java',
            incomeCategories: [],
            selectedCategory: { name: 'Chọn danh mục', id: '', type: '' },
            icon: "ios-list",
            money: '',
            note: '',
            totalMoney: 0,

            modal: false,
            modal2: false,
            active: false,
            modalVisible: false,

            show: false,
            date: new Date(),
            mode: 'date',
        }
    }

    onChange(selectedDate) {
        const currentDate = new Date(selectedDate.nativeEvent.timestamp) || this.state.date;
        this.setState({
            show: Platform.OS === 'ios',
            date: currentDate,
        })
    };

    showMode(currentMode) {
        this.setState({
            show: true,
            mode: currentMode,
        })
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    getCategory() {
        var data = [];
        firebaseApp.database().ref('/income_categories').on('value', (snapshots) => {
            snapshots.forEach((snapshot) => {
                this.state.incomeCategories.push({
                    id: snapshot.key,
                    name: snapshot.val().name,
                    icon: snapshot.val().icon,
                    type: snapshot.val().type
                })
            })
        })
    }

    componentDidMount() {
        this.getCategory();
    }

    confirmAddIncome() {
        try {
            if (this.state.money && this.state.selectedCategory.id && this.state.date) {
                firebaseApp.database().ref('/income_transactions').push({
                    name: this.state.note,
                    date: this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear(),
                    money: this.state.money,
                    user_id: 1,
                    income_category_id: this.state.selectedCategory.id

                })
                Alert.alert('Thông báo', 'Thêm thành công !');
                var tien;
                firebaseApp.database().ref('/user').on("value", snapshot => {
                    tien = snapshot.val().wallet

                })
                tien = parseInt(tien) + parseInt(this.state.money);

                firebaseApp.database().ref('user').set({
                    id: 1,
                    name: 'hung',
                    wallet: tien,
                });
                this.props.navigation.navigate('Transaction');
            } else {
                Alert.alert('Lỗi', 'Hãy điền đầy đủ các trường !');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Hãy điền đầy đủ các trường !');
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modal}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Danh mục thu nhập</Text>

                                <FlatList
                                    data={this.state.incomeCategories}
                                    renderItem={(category) => (
                                        <Card style={{ width: 260 }}>
                                            <CardItem button onPress={() => { this.setState({ selectedCategory: { name: category.item.name, id: category.item.id }, modal: false, icon: category.item.icon }) }}>
                                                <Body style={{ flexDirection: 'row' }}>
                                                    <View style={{ width: 45, height: 45, marginRight: 20, backgroundColor: "#00bcd4", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                        <Ionicons style={{ color: "#fff48f" }} name={category.item.icon} size={30} />
                                                    </View>
                                                    <Text style={{ marginTop: 10, fontWeight: "bold", color: "green" }}>
                                                        {category.item.name}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    )}
                                />

                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={{ flexDirection: "row" }}>

                    <View style={{ width: 53, height: 53, marginRight: 20, backgroundColor: "#318fb5", borderRadius: 28, justifyContent: "center", alignItems: "center" }}>
                        <Ionicons style={{ color: "pink" }} name={this.state.icon} size={35} />
                    </View>
                    <TouchableOpacity style={{ width: 200, height: 40, flexDirection: 'row', justifyContent: "space-between", marginTop: 13 }}
                        onPress={() => this.setState({ modal: true })}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#318fb5" }}>{this.state.selectedCategory.name}</Text>
                    </TouchableOpacity>
                </View>

                {/* ngày  */}
                <Card style={{ width: "95%", marginTop: 30 }}>
                    <CardItem button onPress={() => this.showDatepicker()}>
                        <Body style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>
                                {'Ngày:   ' + this.state.date.getDate() + "/" + (this.state.date.getMonth() + 1) + "/" + this.state.date.getFullYear()}
                            </Text>
                            <Ionicons name='md-calendar' size={20} style={{ color: "#000" }} />
                        </Body>
                    </CardItem>
                </Card>

                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange.bind(this)}
                    />
                )}

                {/* Số tiền  */}

                <Item style={{ marginTop: 10, width: "50%" }}>
                    <Input
                        keyboardType="numeric"
                        onChangeText={text => this.setState({ money: text })}
                        value={this.state.textIn}
                        placeholder='Số tiền' />
                </Item>

                {/* ghi chú */}

                <Item style={{ marginTop: 10, width: "70%" }}>
                    <Input
                        onChangeText={text => this.setState({ note: text })}
                        value={this.state.textIn}
                        placeholder='Ghi chú' />
                </Item>

                {/* nút xác nhận */}

                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 120, marginBottom: 50 }}>
                    <Button
                        rounded danger
                        style={{ width: 100, justifyContent: "center", marginTop: 30 }}
                        onPress={() => this.props.navigation.navigate('Transaction')}
                    >
                        <Text style={{ color: "white" }}>Hủy</Text>
                    </Button>

                    <Button
                        rounded info
                        style={{ width: 100, justifyContent: "center", marginTop: 30 }}
                        onPress={() => this.confirmAddIncome()}
                    >
                        <Text style={{ color: "white" }}>Lưu</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "90%",
        height: "80%"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"

    }
});
