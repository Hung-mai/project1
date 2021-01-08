import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PieChart, } from "react-native-chart-kit";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { getMonthAndYear } from '../../api/MonthAndYear'
import { getIncomeCurrentMonth, getSpendingCurrentMonth } from '../../api/Tab3Api'
import {
    RefreshControl,
    SafeAreaView,
} from 'react-native';

export default class Tab3 extends React.Component {

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

            refreshing: false,
        }
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

        this.wait(1000).then(() => this.setState({ refreshing: false }));
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={["red", "green", "orange"]} refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                >
                    <View>
                        <ScrollView>
                            <Content padder>
                                <Card>
                                    <CardItem header>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#d6d" }}>{'Tổng quan tháng ' + this.state.currentMonth}</Text>
                                    </CardItem>
                                    <View style={{ flexDirection: "row", borderBottomColor: "#333", paddingBottom: 10 }}>
                                        <PieChart
                                            data={[
                                                {
                                                    name: 'Seoul',
                                                    population: this.state.totalIncome,
                                                    color: 'green',
                                                },
                                                {
                                                    name: 'Toronto',
                                                    population: this.state.totalSpending,
                                                    color: 'red',
                                                },
                                            ]}
                                            width={100}
                                            height={100}
                                            chartConfig={{
                                                backgroundColor: '#1cc910',
                                                backgroundGradientFrom: '#eff3ff',
                                                backgroundGradientTo: '#efefef',
                                                decimalPlaces: 2,
                                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                style: {
                                                    borderRadius: 16,
                                                },
                                            }}
                                            style={{
                                                paddingLeft: 20
                                            }}
                                            accessor="population"
                                            backgroundColor="#fff"
                                            paddingLeft="15"
                                            hasLegend={false}
                                        //for the absolute number remove if you want percentage
                                        />
                                        <CardItem >

                                            <Body style={{ marginLeft: 0 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 8 }}>
                                                    <Text style={{ color: "green", fontSize: 15 }}>Thu nhập:</Text>
                                                    <Text style={{ color: "green", fontSize: 15 }}>{parseInt(this.state.totalIncome).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                    <Text style={{ color: "red", fontSize: 15 }}>Chi tiêu:</Text>
                                                    <Text style={{ color: "red", fontSize: 15 }}>{parseInt(this.state.totalSpending).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                {
                                                    (
                                                        1 &&
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>Tổng cộng:</Text>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>{parseInt(this.state.totalIncome - this.state.totalSpending).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                        </View>
                                                    )
                                                }
                                            </Body>
                                        </CardItem>
                                    </View>
                                    <CardItem header style={{ borderTopWidth: 1, borderTopColor: "#bbb" }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#d6d" }}>{'Tổng quan tháng ' + getMonthAndYear(this.state.currentMonth - 1, 0)[0]}</Text>
                                    </CardItem>
                                    <View style={{ flexDirection: "row", borderBottomColor: "#333", paddingBottom: 10 }}>
                                        <PieChart
                                            data={[
                                                {
                                                    name: 'Seoul',
                                                    population: this.state.totalIncome1,
                                                    color: 'green',
                                                },
                                                {
                                                    name: 'Toronto',
                                                    population: this.state.totalSpending1,
                                                    color: 'red',
                                                },
                                            ]}
                                            width={100}
                                            height={100}
                                            chartConfig={{
                                                backgroundColor: '#1cc910',
                                                backgroundGradientFrom: '#eff3ff',
                                                backgroundGradientTo: '#efefef',
                                                decimalPlaces: 2,
                                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                style: {
                                                    borderRadius: 16,
                                                },
                                            }}
                                            style={{
                                                paddingLeft: 20
                                            }}
                                            accessor="population"
                                            backgroundColor="#fff"
                                            paddingLeft="15"
                                            hasLegend={false}
                                        //for the absolute number remove if you want percentage
                                        />
                                        <CardItem>
                                            <Body style={{ marginLeft: 0 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 8 }}>
                                                    <Text style={{ color: "green", fontSize: 15 }}>Thu nhập:</Text>
                                                    <Text style={{ color: "green", fontSize: 15 }}>{parseInt(this.state.totalIncome1).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                    <Text style={{ color: "red", fontSize: 15 }}>Chi tiêu:</Text>
                                                    <Text style={{ color: "red", fontSize: 15 }}>{parseInt(this.state.totalSpending1).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                {
                                                    (
                                                        1 &&
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>Tổng cộng:</Text>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>{parseInt(this.state.totalIncome1 - this.state.totalSpending1).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                        </View>
                                                    )
                                                }
                                            </Body>
                                        </CardItem>
                                    </View>

                                    <CardItem header style={{ borderTopWidth: 1, borderTopColor: "#bbb" }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#d6d" }}>{'Tổng quan tháng ' + getMonthAndYear(this.state.currentMonth - 2, 0)[0]}</Text>
                                    </CardItem>
                                    <View style={{ flexDirection: "row", borderBottomColor: "#333", paddingBottom: 10 }}>
                                        <PieChart
                                            data={[
                                                {
                                                    name: 'Seoul',
                                                    population: this.state.totalIncome2,
                                                    color: 'green',
                                                },
                                                {
                                                    name: 'Toronto',
                                                    population: this.state.totalSpending2,
                                                    color: 'red',
                                                },
                                            ]}
                                            width={100}
                                            height={100}
                                            chartConfig={{
                                                backgroundColor: '#1cc910',
                                                backgroundGradientFrom: '#eff3ff',
                                                backgroundGradientTo: '#efefef',
                                                decimalPlaces: 2,
                                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                style: {
                                                    borderRadius: 16,
                                                },
                                            }}
                                            style={{
                                                paddingLeft: 20
                                            }}
                                            accessor="population"
                                            backgroundColor="#fff"
                                            paddingLeft="15"
                                            hasLegend={false}
                                        //for the absolute number remove if you want percentage
                                        />
                                        <CardItem >

                                            <Body style={{ marginLeft: 0 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 8 }}>
                                                    <Text style={{ color: "green", fontSize: 15 }}>Thu nhập:</Text>
                                                    <Text style={{ color: "green", fontSize: 15 }}>{parseInt(this.state.totalIncome2).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                    <Text style={{ color: "red", fontSize: 15 }}>Chi tiêu:</Text>
                                                    <Text style={{ color: "red", fontSize: 15 }}>{parseInt(this.state.totalSpending2).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                {
                                                    (
                                                        1 &&
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>Tổng cộng:</Text>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>{parseInt(this.state.totalIncome2 - this.state.totalSpending2).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                        </View>
                                                    )
                                                }
                                            </Body>
                                        </CardItem>
                                    </View>

                                    {/* thang -3 */}
                                    <CardItem header style={{ borderTopWidth: 1, borderTopColor: "#bbb" }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#d6d" }}>{'Tổng quan tháng ' + getMonthAndYear(this.state.currentMonth - 3, 0)[0]}</Text>
                                    </CardItem>
                                    <View style={{ flexDirection: "row", borderBottomColor: "#333", paddingBottom: 10 }}>
                                        <PieChart
                                            data={[
                                                {
                                                    name: 'Seoul',
                                                    population: this.state.totalIncome3,
                                                    color: 'green',
                                                },
                                                {
                                                    name: 'Toronto',
                                                    population: this.state.totalSpending3,
                                                    color: 'red',
                                                },
                                            ]}
                                            width={100}
                                            height={100}
                                            chartConfig={{
                                                backgroundColor: '#1cc910',
                                                backgroundGradientFrom: '#eff3ff',
                                                backgroundGradientTo: '#efefef',
                                                decimalPlaces: 2,
                                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                style: {
                                                    borderRadius: 16,
                                                },
                                            }}
                                            style={{
                                                paddingLeft: 20
                                            }}
                                            accessor="population"
                                            backgroundColor="#fff"
                                            paddingLeft="15"
                                            hasLegend={false}
                                        //for the absolute number remove if you want percentage
                                        />
                                        <CardItem >

                                            <Body style={{ marginLeft: 0 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 8 }}>
                                                    <Text style={{ color: "green", fontSize: 15 }}>Thu nhập:</Text>
                                                    <Text style={{ color: "green", fontSize: 15 }}>{parseInt(this.state.totalIncome3).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                    <Text style={{ color: "red", fontSize: 15 }}>Chi tiêu:</Text>
                                                    <Text style={{ color: "red", fontSize: 15 }}>{parseInt(this.state.totalSpending3).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                {
                                                    (
                                                        1 &&
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>Tổng cộng:</Text>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>{parseInt(this.state.totalIncome3 - this.state.totalSpending3).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                        </View>
                                                    )
                                                }
                                            </Body>
                                        </CardItem>
                                    </View>
                                    {/* thang - 4 */}
                                    <CardItem header style={{ borderTopWidth: 1, borderTopColor: "#bbb" }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#d6d" }}>{'Tổng quan tháng ' + getMonthAndYear(this.state.currentMonth - 4, 0)[0]}</Text>
                                    </CardItem>
                                    <View style={{ flexDirection: "row", borderBottomColor: "#333", paddingBottom: 10 }}>
                                        <PieChart
                                            data={[
                                                {
                                                    name: 'Seoul',
                                                    population: this.state.totalIncome4,
                                                    color: 'green',
                                                },
                                                {
                                                    name: 'Toronto',
                                                    population: this.state.totalSpending4,
                                                    color: 'red',
                                                },
                                            ]}
                                            width={100}
                                            height={100}
                                            chartConfig={{
                                                backgroundColor: '#1cc910',
                                                backgroundGradientFrom: '#eff3ff',
                                                backgroundGradientTo: '#efefef',
                                                decimalPlaces: 2,
                                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                style: {
                                                    borderRadius: 16,
                                                },
                                            }}
                                            style={{
                                                paddingLeft: 20
                                            }}
                                            accessor="population"
                                            backgroundColor="#fff"
                                            paddingLeft="15"
                                            hasLegend={false}
                                        //for the absolute number remove if you want percentage
                                        />
                                        <CardItem >

                                            <Body style={{ marginLeft: 0 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 8 }}>
                                                    <Text style={{ color: "green", fontSize: 15 }}>Thu nhập:</Text>
                                                    <Text style={{ color: "green", fontSize: 15 }}>{parseInt(this.state.totalIncome4).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                    <Text style={{ color: "red", fontSize: 15 }}>Chi tiêu:</Text>
                                                    <Text style={{ color: "red", fontSize: 15 }}>{parseInt(this.state.totalSpending4).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                </View>
                                                {
                                                    (
                                                        1 &&
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200 }}>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>Tổng cộng:</Text>
                                                            <Text style={{ color: "#0e49b5", fontSize: 15 }}>{parseInt(this.state.totalIncome4 - this.state.totalSpending4).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                        </View>
                                                    )
                                                }

                                            </Body>
                                        </CardItem>
                                    </View>
                                </Card>
                            </Content>
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
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
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.onRefresh();
          });
    }

    componentWillUnmount() {
        this._unsubscribe();
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
