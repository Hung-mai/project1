import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, FlatList, Modal, TouchableHighlight, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebaseApp } from '../../components/FirebaseConfig'
import { Card, CardItem, Text, Body, Item, Input, Button, Picker } from "native-base";

import DateTimePicker from '@react-native-community/datetimepicker';


export default class AddTab12 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spendingCategories: [],
            selectedCategory: { name: 'Chọn danh mục', id: '', type: '' },
            icon: "ios-list",
            money: '',

            modal: false,

            date: 1,

        }
    }

    onValueChange1(value) {
        this.setState({
            date: value
        });
    }


    getCategory() {
        var data = [];
        firebaseApp.database().ref('/spending_categories').on('value', (snapshots) => {
            snapshots.forEach((snapshot) => {
                data.push({
                    id: snapshot.key,
                    name: snapshot.val().name,
                    icon: snapshot.val().icon,
                    type: snapshot.val().type
                })
            })
        })

        let filteredData = data.filter(val => val.type == 1);

        this.setState({
            spendingCategories : filteredData
        })
    }

    componentDidMount() {
        this.getCategory();
    }

    confirmAddSpending() {
        try {
            if (this.state.money && this.state.selectedCategory.id && this.state.date) {
                firebaseApp.database().ref('/spending_recurring_transactions').push({
                    date: this.state.date,
                    money: this.state.money,
                    user_id: 1,
                    spending_category_id: this.state.selectedCategory.id,
                    traded_month: new Date().getMonth()-1
                })
                Alert.alert('Thông báo', 'Thêm thành công !');
                this.props.navigation.navigate('PeriodicTransaction');
                // console.log(this.state.money , this.state.selectedCategory.id ,this.state.date);
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
                            this.setState({modal: false})
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Danh mục thu nhập</Text>

                                <FlatList
                                    data={this.state.spendingCategories}
                                    renderItem={(category) => (
                                        <Card style={{ width: 260 }}>
                                            <CardItem button onPress={() => { this.setState({ selectedCategory: { name: category.item.name, id: category.item.id }, modal: false, icon: category.item.icon }) }}>
                                                <Body style={{ flexDirection: 'row' }}>
                                                    <View style={{ width: 45, height: 45, marginRight: 20, backgroundColor: "#00bcd4", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                        <Ionicons style={{ color: "#fff48f" }} name={category.item.icon} size={30} />
                                                    </View>
                                                    <Text style={{ marginTop: 10, fontWeight: "bold", color: "red" }}>
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

                {/* <View style={{marginLeft: "auto", marginRight: "auto", marginBottom: 20}}>
                    <Text style={{color: "green", fontWeight: "bold", fontSize: 20}}>THÊM THU ĐỊNH KỲ</Text>
                </View> */}

                <View style={{ flexDirection: "row" }}>

                    <View style={{ width: 53, height: 53, marginRight: 20, backgroundColor: "red", borderRadius: 28, justifyContent: "center", alignItems: "center" }}>
                        <Ionicons style={{ color: "yellow" }} name={this.state.icon} size={35} />
                    </View>
                    <TouchableOpacity style={{ width: 200, height: 40, flexDirection: 'row', justifyContent: "space-between", marginTop: 13 }}
                        onPress={() => this.setState({ modal: true })}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>{this.state.selectedCategory.name}</Text>
                    </TouchableOpacity>
                </View>

                {/* ngày  */}
                <Card style={{marginTop: 30}}>
                    <CardItem>
                        <Body style={{height: 20}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{ marginRight: 20}}>Lặp giao dịch vào ngày: </Text>
                                
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Ionicons name="ios-arrow-down" />}
                                            style={{ width: 85, height: 20, marginBottom: 10 }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.date}
                                            onValueChange={this.onValueChange1.bind(this)}
                                        >
                                            <Picker.Item label="1" value="1" />
                                            <Picker.Item label="2" value="2" />
                                            <Picker.Item label="3" value="3" />
                                            <Picker.Item label="4" value="4" />
                                            <Picker.Item label="5" value="5" />
                                            <Picker.Item label="6" value="6" />
                                            <Picker.Item label="7" value="7" />
                                            <Picker.Item label="8" value="8" />
                                            <Picker.Item label="9" value="9" />
                                            <Picker.Item label="10" value="10" />
                                            <Picker.Item label="11" value="11" />
                                            <Picker.Item label="12" value="12" />
                                            <Picker.Item label="13" value="13" />
                                            <Picker.Item label="14" value="14" />
                                            <Picker.Item label="15" value="15" />
                                            <Picker.Item label="16" value="16" />
                                            <Picker.Item label="17" value="17" />
                                            <Picker.Item label="18" value="18" />
                                            <Picker.Item label="19" value="19" />
                                            <Picker.Item label="20" value="20" />
                                            <Picker.Item label="21" value="21" />
                                            <Picker.Item label="22" value="22" />
                                            <Picker.Item label="23" value="23" />
                                            <Picker.Item label="24" value="24" />
                                            <Picker.Item label="25" value="25" />
                                            <Picker.Item label="26" value="26" />
                                            <Picker.Item label="27" value="27" />
                                            <Picker.Item label="28" value="28" />
                                            <Picker.Item label="29" value="29" />
                                            <Picker.Item label="30" value="30" />
                                        </Picker>
                                    
                                
                                
                            </View>
                        </Body>
                    </CardItem>
                </Card>
                
                            

                {/* Số tiền  */}

                <Item style={{ marginTop: 30, width: "100%" }}>
                    <Input
                        keyboardType="numeric"
                        onChangeText={text => this.setState({ money: text })}
                        value={this.state.textIn}
                        placeholder='Số tiền' />
                </Item>

                {/* nút xác nhận */}

                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 120, marginBottom: 50 }}>
                    <Button
                        rounded danger
                        style={{ width: 100, justifyContent: "center", marginTop: 30 }}
                        onPress={() => this.props.navigation.navigate('PeriodicTransaction')}
                    >
                        <Text style={{ color: "white" }}>Hủy</Text>
                    </Button>

                    <Button
                        rounded info
                        style={{ width: 100, justifyContent: "center", marginTop: 30 }}
                        onPress={() => this.confirmAddSpending()}
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
        height: "50%"
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
