import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Modal, Alert, ActivityIndicator } from 'react-native';
import DateTime from '../components/DateTimePicker';
import AddTransaction from '../components/AddTransaction';
import React, { Component, useEffect } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Body, Button } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { firebaseApp } from '../components/FirebaseConfig'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    RefreshControl,
    SafeAreaView,
} from 'react-native';

export default class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeData: [],
            spendingData: [],
            date: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
            totalMoney: 0,
            modal: false,

        }
    }


    render() {
        return (
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }} >
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={["red", "green", "orange"]} refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                >
                    <View style={{ height: 560 }}>

                        <DateTime parentCallBack={(childDate) => this.callBackDate(childDate)} />

                        <View style={{ marginHorizontal: 10, marginTop: 0, zIndex: 0 }}>



                            {(parseInt(this.state.totalMoney) >= 0 &&
                                (<Card>
                                    <CardItem footer bordered>
                                        <Text style={{ color: "green" }}>{'Tổng tiền trong ngày:  ' + parseInt(this.state.totalMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                    </CardItem>
                                </Card>))
                                ||
                                (<Card>
                                    <CardItem footer bordered>
                                        <Text style={{ color: "red" }}>{'Tổng tiền trong ngày:  ' + parseInt(this.state.totalMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                    </CardItem>
                                </Card>)

                            }

                        </View>


                        {/* <View style={{marginHorizontal: 10}}> */}
                        <ScrollView style={{ marginHorizontal: 10, marginBottom: 0, marginTop: 0, height: 280, zIndex: 0 }}>
                            <Card>

                                {/* income */}
                                <FlatList
                                    data={this.state.incomeData}
                                    keyExtractor={income => income.money}
                                    renderItem={(income) => (
                                        <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                                            <CardItem bordered>
                                                <Body style={{ borderRightWidth: 5, borderRightColor: "green" }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <View style={{ width: 45, height: 45, marginRight: 20, backgroundColor: "#00bcd4", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                            <Ionicons style={{ color: "#fff48f" }} name={income.item.icon} size={30} />
                                                        </View>

                                                        <View style={{ width: "72%" }}>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                <Text style={{ fontSize: 15 }}>{income.item.category} </Text>
                                                                <Text style={{ fontSize: 14, marginTop: 2, color: "green" }}> {parseInt(income.item.money).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'} </Text>
                                                            </View>
                                                            <View style={{ flexDirection: "row", marginTop: 3 }}>
                                                                <Text style={{ fontSize: 12 }}>Thu nhập</Text>
                                                                <Text style={{ marginLeft: "auto", fontSize: 12 }}> {income.item.date} </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Body>
                                            </CardItem>
                                        </TouchableOpacity>
                                    )}
                                />

                                {/* spending */}
                                <FlatList
                                    data={this.state.spendingData}
                                    keyExtractor={spending => spending.money}
                                    renderItem={(spending) => (
                                        <TouchableOpacity onPress={() => Alert.alert('Xóa', 'Xóa')}>
                                            <CardItem bordered>
                                                <Body style={{ borderRightWidth: 5, borderRightColor: "red" }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <View style={{ width: 45, height: 45, marginRight: 20, backgroundColor: "red", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                            <Ionicons style={{ color: "#fff48f" }} name={spending.item.icon} size={30} />
                                                        </View>

                                                        <View style={{ width: "72%" }}>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                <Text style={{ fontSize: 15 }}>{spending.item.category} </Text>
                                                                <Text style={{ fontSize: 14, marginTop: 2, color: "red" }}> {parseInt(spending.item.money).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'} </Text>
                                                            </View>
                                                            <View style={{ flexDirection: "row", marginTop: 3 }}>
                                                                <Text style={{ fontSize: 12 }}>Chi tiêu</Text>
                                                                <Text style={{ marginLeft: "auto", fontSize: 12 }}> {spending.item.date} </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Body>
                                            </CardItem>
                                        </TouchableOpacity>
                                    )}
                                />

                            </Card>
                        </ScrollView>

                        <AddTransaction navigation={this.props.navigation} style={{ zIndex: 2 }} />

                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }

    callBackDate(childDate) {
        this.setState({
            incomeData: [],
            spendingData: [],
            date: childDate.getDate() + '/' + (childDate.getMonth() + 1) + '/' + childDate.getFullYear(),
            totalMoney: 0,
        })
        this.setState({ totalMoney: 0 })
        this.listenIncomeTransactions();
        this.listenSpedingTransactions();
    }




    listenIncomeTransactions() {
        var items = []
        firebaseApp.database().ref('/income_transactions').orderByChild("date").equalTo(this.state.date).on('value', (dataSnapshot) => {
            dataSnapshot.forEach((snapshot) => {
                firebaseApp.database().ref('income_categories').child(snapshot.val().income_category_id).on('value', (snapshotChild) => {
                    items.push({
                        icon: snapshotChild.val().icon,
                        category: snapshotChild.val().name,
                        date: snapshot.val().date,
                        money: snapshot.val().money,
                        name: snapshot.val().name,
                    })

                    this.state.totalMoney += parseInt(snapshot.val().money)
                })
            })
        })

        this.setState({
            incomeData: items
        })

    }

    listenSpedingTransactions() {
        var items = []
        firebaseApp.database().ref('/spending_transactions').orderByChild("date").equalTo(this.state.date).on('value', (dataSnapshot) => {
            dataSnapshot.forEach((snapshot) => {
                firebaseApp.database().ref('spending_categories').child(snapshot.val().spending_category_id).on('value', (snapshotChild) => {
                    items.push({
                        icon: snapshotChild.val().icon,
                        category: snapshotChild.val().name,
                        date: snapshot.val().date,
                        money: snapshot.val().money,
                        name: snapshot.val().name,
                    })

                    this.state.totalMoney -= parseInt(snapshot.val().money);
                })
            })
        })

        this.setState({
            spendingData: items
        })
    }

    componentDidMount() {
        this.setState({ totalMoney: 0 })
        this.listenIncomeTransactions();
        this.listenSpedingTransactions();

    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh() {
        this.setState({
            refreshing: true,
            incomeData: [],
            spendingData: [],
        })

        this.setState({ totalMoney: 0 })
        setTimeout(() => {
            this.listenIncomeTransactions();
            this.listenSpedingTransactions();
        })

        this.wait(2000).then(() => this.setState({ refreshing: false }));
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
