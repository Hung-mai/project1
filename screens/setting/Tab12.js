import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Alert } from 'react-native';
import { firebaseApp } from '../../components/FirebaseConfig'
import { Content, Card, CardItem, Text, Item, Form, Picker, Button, Icon, Body, Container } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMonthAndYear } from '../../api/MonthAndYear'
import {
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Tab11 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),
            active: new Date().getMonth() + 1,

            spendingData: [],

            refreshing: false,
        }
    }

    

    componentDidMount(){
        this.listenSpendingTransactions();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.onRefresh();
          });
    }

    componentWillUnmount() {
        this._unsubscribe();
      }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh() {
        this.setState({
            refreshing: true
        })
        this.listenSpendingTransactions();
        this.wait(1000).then(() => this.setState({ refreshing: false }));
    }

    delete(item){
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn xóa giao dịch này ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        firebaseApp.database().ref('/spending_recurring_transactions').child(item.item.id).remove();
                        this.listenSpendingTransactions();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    listenSpendingTransactions() {
        var items = []
        firebaseApp.database().ref('/spending_recurring_transactions').on('value', (dataSnapshot) => {
            dataSnapshot.forEach((snapshot) => {
                firebaseApp.database().ref('spending_categories').child(snapshot.val().spending_category_id).on('value', (snapshotChild) => {
                    items.push({
                        id: snapshot.key,
                        category: snapshotChild.val().name,
                        date: snapshot.val().date,
                        money: snapshot.val().money,
                    })

                })
            })
        })

        this.setState({
            spendingData: items
        })

    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={["red", "green", "orange"]} refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                >
                    <View style={{marginLeft: "auto"}}>
                        <Button onPress={() => this.props.navigation.navigate('AddTab12')} iconLeft style={{backgroundColor: "#d9ecf2", borderWidth: 1, borderColor: "#51adcf", margin: 10}}>
                            <Icon name='add' style={{color: "#51adcf"}} />
                            <Text style={{color:"#51adcf"}} >Add</Text>
                        </Button>
                    </View>
                    <View>
                        <ScrollView style={{marginHorizontal: 10}}>
                            {this.state.spendingData.length > 0 &&
                            <Card>
                                <FlatList
                                    data={this.state.spendingData}
                                    keyExtractor={spending => spending}
                                    renderItem={(spending) => (
                                        <CardItem bordered>
                                            <Body style={{ borderLeftWidth: 5, borderLeftColor: "red" }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <View style={{ width: "82%", marginLeft: 10 }}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                            <Text style={{ fontSize: 15 }}>{spending.item.category}</Text>
                                                            <Text style={{ fontSize: 14, marginTop: 2, color: "red" }}> {parseInt(spending.item.money).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'} </Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", marginTop: 3 }}>
                                                            <Text style={{ fontSize: 12 }}>Chi tiêu</Text>
                                                            <Text style={{ marginLeft: "auto", fontSize: 12 }}>{"Ngày "+spending.item.date+" hàng tháng"} </Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity onPress={() => this.delete(spending)} style={{margin: 7, marginLeft: 20}}>
                                                        <Ionicons name="ios-trash" size={30} color="red" />
                                                    </TouchableOpacity>
                                                </View>
                                            </Body>
                                        </CardItem>
                                    )}
                                />
                            </Card>
                            ||
                            <Card>
                                <CardItem>
                                    <Body style={{height: 100, alignItems: "center", justifyContent: "center"}}>
                                        <Text>
                                            Không có giao dịch định kỳ nào
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            }
                            

                                
                            
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>


        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
