import React from 'react';
import { LineChart, } from "react-native-chart-kit";
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import { firebaseApp } from '../components/FirebaseConfig'
import { getIncomeCurrentMonth, getSpendingCurrentMonth } from '../api/OverviewApi'
import { getMonthAndYear } from '../api/MonthAndYear'

import {
    ScrollView,
    RefreshControl,
    StyleSheet,
    Text,
    SafeAreaView,
    View
} from 'react-native';


export default class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),

            totalSpending: 0,
            totalIncome: 0,

            totalSpending1: 0,
            totalIncome1: 0,

            totalSpending2: 0,
            totalIncome2: 0,

            totalSpending3: 0,
            totalIncome3: 0,

            totalSpending4: 0,
            totalIncome4: 0,

            wallet: 0,
            refreshing: false
        }
    }

    getWallet() {
        let wallet = 0;
        firebaseApp.database().ref('/user').on('value', snapshot => {
            wallet = snapshot.val().wallet
        })
        this.setState({
            wallet: wallet,
        })
    }

    componentDidMount() {
        let month = this.state.currentMonth;
        let year = this.state.currentYear;
        let monthYear1 = getMonthAndYear(month - 1, year);
        let monthYear2 = getMonthAndYear(month - 2, year);
        let monthYear3 = getMonthAndYear(month - 3, year);
        let monthYear4 = getMonthAndYear(month - 4, year);

        this.setState({
            totalIncome: getIncomeCurrentMonth(month, year),
            totalSpending: getSpendingCurrentMonth(month, year),
            totalIncome1: getIncomeCurrentMonth(monthYear1[0], monthYear1[1]),
            totalSpending1: getSpendingCurrentMonth(monthYear1[0], monthYear1[1]),
            totalIncome2: getIncomeCurrentMonth(monthYear2[0], monthYear2[1]),
            totalSpending2: getSpendingCurrentMonth(monthYear2[0], monthYear2[1]),
            totalIncome3: getIncomeCurrentMonth(monthYear3[0], monthYear3[1]),
            totalSpending3: getSpendingCurrentMonth(monthYear3[0], monthYear3[1]),
            totalIncome4: getIncomeCurrentMonth(monthYear4[0], monthYear4[1]),
            totalSpending4: getSpendingCurrentMonth(monthYear4[0], monthYear4[1]),
        })
        this.getWallet();

        setTimeout(() => {
            this.onRefresh();
        })
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh() {
        let month = this.state.currentMonth;
        let year = this.state.currentYear;
        let monthYear1 = getMonthAndYear(month - 1, year);
        let monthYear2 = getMonthAndYear(month - 2, year);
        let monthYear3 = getMonthAndYear(month - 3, year);
        let monthYear4 = getMonthAndYear(month - 4, year);

        this.setState({
            totalIncome: getIncomeCurrentMonth(month, year),
            totalSpending: getSpendingCurrentMonth(month, year),
            totalIncome1: getIncomeCurrentMonth(monthYear1[0], monthYear1[1]),
            totalSpending1: getSpendingCurrentMonth(monthYear1[0], monthYear1[1]),
            totalIncome2: getIncomeCurrentMonth(monthYear2[0], monthYear2[1]),
            totalSpending2: getSpendingCurrentMonth(monthYear2[0], monthYear2[1]),
            totalIncome3: getIncomeCurrentMonth(monthYear3[0], monthYear3[1]),
            totalSpending3: getSpendingCurrentMonth(monthYear3[0], monthYear3[1]),
            totalIncome4: getIncomeCurrentMonth(monthYear4[0], monthYear4[1]),
            totalSpending4: getSpendingCurrentMonth(monthYear4[0], monthYear4[1]),
        })
        this.getWallet();
        this.wait(2000).then(() => this.setState({ refreshing: false }));
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={["red", "green", "orange"]} refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                >
                    <View>
                        <ScrollView>
                            <Content padder>
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={{ fontWeight: "bold" }}>{'Tổng quan tháng ' + this.state.currentMonth}</Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body style={{ marginLeft: 20 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 250 }}>
                                                <Text style={{ color: "green" }}>Thu nhập:</Text>
                                                <Text style={{ color: "green" }}>{parseInt(this.state.totalIncome).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 250 }}>
                                                <Text style={{ color: "red" }}>Chi tiêu:</Text>
                                                <Text style={{ color: "red" }}>{parseInt(this.state.totalSpending).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                            </View>
                                            {
                                                (
                                                    this.state.totalIncome - this.state.totalSpending >= 0 &&
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: 250 }}>
                                                        <Text style={{ color: "#0e49b5" }}>Tổng cộng:</Text>
                                                        <Text style={{ color: "#0e49b5" }}>{parseInt(this.state.totalIncome - this.state.totalSpending).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                    </View>
                                                )
                                                ||
                                                (
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: 250 }}>
                                                        <Text style={{ color: "#fc8621" }}>Tổng cộng:</Text>
                                                        <Text style={{ color: "#fc8621" }}>{parseInt(this.state.totalIncome - this.state.totalSpending).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                    </View>
                                                )
                                            }

                                        </Body>
                                    </CardItem>
                                </Card>
                                {/* tài khoản */}
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={{ fontWeight: "bold", color: "#1f6f8b" }}>Giá trị tài khoản hiện tại</Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body style={{ marginLeft: 20 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "flex-end", width: 250 }}>
                                                <Text style={{ color: "#28abb9" }}>{parseInt(this.state.wallet).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                                {/* biểu đồ */}
                                <Card>
                                    <CardItem header >
                                        <Text style={{ fontWeight: "bold", color: "#41aea9" }}>Biến động số dư theo tháng</Text>
                                    </CardItem>
                                    <LineChart
                                        data={{
                                            labels: [
                                                getMonthAndYear(this.state.currentMonth - 5, 0)[0],
                                                getMonthAndYear(this.state.currentMonth - 4, 0)[0],
                                                getMonthAndYear(this.state.currentMonth - 3, 0)[0],
                                                getMonthAndYear(this.state.currentMonth - 2, 0)[0],
                                                getMonthAndYear(this.state.currentMonth - 1, 0)[0],
                                                this.state.currentMonth],
                                            datasets: [
                                                {
                                                    data: [
                                                        (this.state.wallet - (this.state.totalIncome - this.state.totalSpending) - (this.state.totalIncome1 - this.state.totalSpending1) - (this.state.totalIncome2 - this.state.totalSpending2) - (this.state.totalIncome3 - this.state.totalSpending3) - (this.state.totalIncome4 - this.state.totalSpending4)) / 1000000,
                                                        (this.state.wallet - (this.state.totalIncome - this.state.totalSpending) - (this.state.totalIncome1 - this.state.totalSpending1) - (this.state.totalIncome2 - this.state.totalSpending2) - (this.state.totalIncome3 - this.state.totalSpending3)) / 1000000,
                                                        (this.state.wallet - (this.state.totalIncome - this.state.totalSpending) - (this.state.totalIncome1 - this.state.totalSpending1) - (this.state.totalIncome2 - this.state.totalSpending2)) / 1000000,
                                                        (this.state.wallet - (this.state.totalIncome - this.state.totalSpending) - (this.state.totalIncome1 - this.state.totalSpending1)) / 1000000,
                                                        (this.state.wallet - (this.state.totalIncome - this.state.totalSpending)) / 1000000,
                                                        this.state.wallet / 1000000,
                                                    ]
                                                }
                                            ]
                                        }}
                                        width={335} // from react-native
                                        height={220}
                                        yAxisLabel=""
                                        yAxisSuffix="tr"
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                            backgroundColor: "#fff",
                                            backgroundGradientFrom: "#fff",
                                            backgroundGradientTo: "#fff",
                                            decimalPlaces: 1, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(150, 0, 200, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(150, 0, 200, ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#fff",
                                            }
                                        }}
                                        bezier
                                        style={{
                                        }}
                                    />
                                </Card>


                            </Content>
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
