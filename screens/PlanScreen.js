import { StatusBar } from 'expo-status-bar';
import { View, FlatList, Modal, Alert } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Fab, Item, Input } from 'native-base';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { firebaseApp } from '../components/FirebaseConfig'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    ScrollView,
    RefreshControl,
    StyleSheet,
    Text,
    SafeAreaView,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default class Plan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],

            planName: '',
            planMoney: '',

            totalMoney: 0,
            modal: false,
            modal2: false,
            active: false,
            modalVisible: false,

            show: false,
            date: new Date(),
            mode: 'date',

            check_complete: 0,
            check_money: 0,

            refreshing: false,

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

    componentDidMount() {
        var i = 0;
        var lap = setInterval(() => {
            i++;
            this.listenTotalMoney();
            this.listenData();
            if (i == 2) {
                clearInterval(lap);
            }
        }, 1000);
    };

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh() {
        this.setState({
            refreshing: true
        })
        this.listenTotalMoney();
        this.listenData();

        this.wait(2000).then(() => this.setState({ refreshing: false }));
    }

    render() {


        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={["red", "green", "orange"]} refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                >
                    <View style={{ height: 630 }}>

                        {/* modal */}
                        <View>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.modal}

                            >

                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>

                                        <View>
                                            <Text style={{ fontSize: 25 }}>Thêm kế hoạch</Text>
                                        </View>

                                        <Card style={{ width: "100%", marginTop: 30 }}>
                                            <CardItem button onPress={() => this.showDatepicker()}>
                                                <Body style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text>
                                                        {'Đến ngày:   ' + this.state.date.getDate() + "/" + (this.state.date.getMonth() + 1) + "/" + this.state.date.getFullYear()}
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

                                        <View style={{ width: "100%" }}>
                                            {/* tên kế hoạch */}
                                            <Item style={{ marginTop: 10, width: "100%" }}>
                                                <Input
                                                    onChangeText={text => this.setState({ planName: text })}
                                                    value={this.state.planName}
                                                    placeholder='Tên kế hoạch' />
                                            </Item>

                                            {/* Số tiền  */}
                                            <Item style={{ marginTop: 10, width: "100%" }}>
                                                <Input
                                                    keyboardType="numeric"
                                                    onChangeText={text => this.setState({ planMoney: text })}
                                                    value={this.state.planMoney}
                                                    placeholder='Số tiền' />
                                            </Item>
                                        </View>


                                        {/* nút xác nhận */}
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                                            <Button
                                                rounded danger
                                                style={{ width: 100, justifyContent: "center", marginTop: 30 }}
                                                onPress={() => this.setState({ modal: false })}
                                            >
                                                <Text style={{ color: "white" }}>Hủy</Text>
                                            </Button>

                                            <Button
                                                rounded info
                                                style={{ width: 100, justifyContent: "center", marginTop: 30 }}
                                                onPress={() => { this.confirmAddPlan() }}
                                            >
                                                <Text style={{ color: "white" }}>Lưu</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        {/* hết modal */}

                        {/* modal 2 */}
                        <View>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.modal2}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView2}>
                                        <View>
                                            <Text style={{ fontSize: 25 }}>Chức năng</Text>
                                        </View>

                                        <View>
                                            <Button
                                                danger
                                                style={{ width: 150, justifyContent: "center", marginTop: 30 }}
                                                onPress={() => this.setState({ modal2: false })}
                                            >
                                                <Text style={{ color: "white" }}>Quay lại</Text>
                                            </Button>

                                            <Button
                                                info
                                                style={{ width: 150, justifyContent: "center", marginTop: 15 }}
                                                onPress={() => this.completePlan()}
                                            >
                                                <Text style={{ color: "white" }}>Hoàn thành</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        {/* hết modal */}


                        <View style={{ marginHorizontal: 10, marginTop: 10, zIndex: 0 }}>

                            {(parseInt(this.state.totalMoney) >= 0 &&
                                (<Card>
                                    <CardItem footer bordered>
                                        <Text style={{ color: "green" }}>{'Số tiền hiện có:  ' + parseInt(this.state.totalMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                    </CardItem>
                                </Card>))
                                ||
                                (<Card>
                                    <CardItem footer bordered>
                                        <Text style={{ color: "red" }}>{'Số tiền hiện có:  ' + parseInt(this.state.totalMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                    </CardItem>
                                </Card>)
                            }

                        </View>

                        {/* <View style={{marginHorizontal: 10}}> */}
                        <ScrollView style={{ marginHorizontal: 10, marginBottom: 0, marginTop: 0, height: 280, zIndex: 0 }}>
                            <Card>

                                {/* income */}
                                <FlatList
                                    data={this.state.data}
                                    keyExtractor={plan => plan.money}
                                    renderItem={(plan) => (
                                        <View>
                                            {(parseInt(plan.item.planMoney) <= parseInt(this.state.totalMoney) && (
                                                <TouchableOpacity onPress={() => this.setState({ modal2: true, check_money: parseInt(plan.item.planMoney), check_complete: plan.item.planId })}>
                                                    <CardItem bordered style={{ backgroundColor: "rgba(0, 160, 0, 0.2)" }}>
                                                        <Body style={{ borderRightWidth: 5, borderRightColor: "rgba(0, 160, 0, 0.9)" }}>
                                                            <View style={{ flexDirection: "row" }}>
                                                                <View style={{ width: 45, height: 45, marginRight: 20, backgroundColor: "rgba(0, 160, 0, 0.9)", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                                    <Text style={{ color: "#fff", fontSize: 13 }}>100%</Text>
                                                                </View>

                                                                <View style={{ width: "72%" }}>
                                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                        <Text style={{ fontSize: 15 }}>{plan.item.planName}</Text>
                                                                        <Text style={{ fontSize: 14, marginTop: 2 }}>{plan.item.planDate}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: "row", marginTop: 3 }}>
                                                                        <Text style={{ fontSize: 12 }}>{parseInt(plan.item.planMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                                        <Text style={{ marginLeft: "auto", fontSize: 12 }}>Có thể hoàn thành</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </Body>
                                                    </CardItem>
                                                </TouchableOpacity>
                                            ))
                                                ||
                                                (new Date(plan.item.planDate.split('/')[2], plan.item.planDate.split('/')[1] - 1, plan.item.planDate.split('/')[0]) < new Date() && (
                                                    <TouchableOpacity onPress={() => this.setState({ modal2: true, check_money: plan.item.money, check_complete: plan.item.planId })}>
                                                        <CardItem bordered style={{ backgroundColor: "rgba(255, 0, 0, 0.2)" }}>
                                                            <Body style={{ borderRightWidth: 5, borderRightColor: "red" }}>
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <View style={{ width: 45, height: 45, marginRight: 20, backgroundColor: "red", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                                        <Text style={{ color: "#fff", fontSize: 13 }}>{Math.round(this.state.totalMoney / plan.item.planMoney * 100) + '%'}</Text>
                                                                    </View>

                                                                    <View style={{ width: "72%" }}>
                                                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                            <Text style={{ fontSize: 15 }}>{plan.item.planName}</Text>
                                                                            <Text style={{ fontSize: 14, marginTop: 2 }}>{plan.item.planDate}</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginTop: 3 }}>
                                                                            <Text style={{ fontSize: 12 }}>{parseInt(plan.item.planMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                                            <Text style={{ marginLeft: "auto", fontSize: 12 }}>Đang quá hạn</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </Body>
                                                        </CardItem>
                                                    </TouchableOpacity>
                                                ))
                                                ||
                                                ((
                                                    <TouchableOpacity onPress={() => this.setState({ modal2: true, check_money: plan.item.money, check_complete: plan.item.planId })}>
                                                        <CardItem bordered style={{ backgroundColor: "rgba(255, 234, 0, 0.2)" }}>
                                                            <Body style={{ borderRightWidth: 5, borderRightColor: "rgba(255, 200, 0, 1)" }}>
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <View style={{ width: 45, height: 45, marginRight: 20, backgroundColor: "rgba(255, 200, 0, 1)", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                                        <Text style={{ color: "#fff", fontSize: 13 }}>{Math.round(this.state.totalMoney / plan.item.planMoney * 100) + '%'}</Text>
                                                                    </View>

                                                                    <View style={{ width: "72%" }}>
                                                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                            <Text style={{ fontSize: 15 }}>{plan.item.planName}</Text>
                                                                            <Text style={{ fontSize: 14, marginTop: 2 }}>{plan.item.planDate}</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginTop: 3 }}>
                                                                            <Text style={{ fontSize: 12 }}>{parseInt(plan.item.planMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                                            <Text style={{ marginLeft: "auto", fontSize: 12 }}>Chưa hoàn thành</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </Body>
                                                        </CardItem>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>)


                                    }
                                />
                            </Card>
                        </ScrollView>


                        {/* nút thêm kế hoạch */}
                        <Container>
                            <View style={{ flex: 1 }}>
                                <Fab
                                    active={this.state.active}
                                    direction="left"
                                    containerStyle={{}}
                                    style={{ backgroundColor: '#1877f2' }}
                                    position=""
                                    onPress={() => this.setState({ modal: true })}>
                                    <Icon name="add" />
                                </Fab>
                            </View>
                        </Container>
                    </View>
                </ScrollView>
            </SafeAreaView>


        );
    }

    completePlan() {
        if (parseInt(this.state.check_money) <= parseInt(this.state.totalMoney)) {
            firebaseApp.database().ref('plans').child(this.state.check_complete).update({
                is_completed: true
            });
            this.state.totalMoney -= parseInt(this.state.check_money);
            firebaseApp.database().ref('user').set({
                id: 1,
                name: 'hung',
                wallet: this.state.totalMoney
            });
            Alert.alert('Thông báo', 'Đã hoàn thành. Số tiền của bạn sẽ được trừ!');
            this.setState({ modal2: false })
            this.listenData();
            this.listenTotalMoney();
        } else {
            Alert.alert('Thông báo', 'Bạn chưa đủ số tiền để hoàn thành!');
        }
    }

    listenData() {
        var data = [];
        firebaseApp.database().ref('/plans').orderByChild('is_completed').equalTo(false).on('value', (dataSnapshot) => {
            dataSnapshot.forEach((snapshot) => {
                data.push({
                    planId: snapshot.key,
                    planMoney: snapshot.val().planMoney,
                    planName: snapshot.val().planName,
                    planDate: snapshot.val().date,
                })
            })
        })

        this.setState({
            data: data,
        })
    }

    listenTotalMoney() {
        var tien = 0;
        firebaseApp.database().ref('/user').on("value", snapshot => {
            tien = snapshot.val().wallet
        })

        firebaseApp.database().ref('/user').on("child_changed", snapshot => {
            tien = snapshot
        })
        this.state.totalMoney = tien;

    }

    confirmAddPlan() {
        if (!this.state.planMoney || !this.state.planName) {
            alert('Hãy điền đầy đủ các thông tin');
        } else {

            this.setState({ data: [] })
            firebaseApp.database().ref('plans').push({
                date: this.state.date.getDate() + "/" + (this.state.date.getMonth() + 1) + "/" + this.state.date.getFullYear(),
                planMoney: this.state.planMoney,
                planName: this.state.planName,
                is_completed: false
            })

            this.setState({
                modal: false,
                active: false,
                modalVisible: false,
                planName: '',
                planMoney: ''
            })

            this.listenData();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    totalMoneyText: {
        fontSize: 18,
        fontWeight: "500",
        marginTop: 5
    },
    AddContainer: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    addButton: {
        borderRadius: 5,
        color: "green"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        // width: 200,
        // height: 100
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
        height: 370
    },
    modalView2: {
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
        width: "70%",
        height: 250
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
