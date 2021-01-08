import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
    LineChart,
} from "react-native-chart-kit";
import { Content, Card, CardItem, Text, Item, Form, Picker } from "native-base";
import { firebaseApp } from '../../components/FirebaseConfig'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getIncomeCurrentMonth, getSpendingCurrentMonth } from '../../api/Tab2.Api'
import {
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import { getMonthAndYear } from '../../api/MonthAndYear'

export default class Tab2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),
            active: 0,

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

            totalSpending5: 0,
            totalIncome5: 0,

            wallet: 0,

            refreshing: false,
        }
    }

    onValueChange2(value) {
        this.setState({
            active: value
        });
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

        this.state.totalIncome = getIncomeCurrentMonth(month, year).total;
        this.state.totalSpending = getSpendingCurrentMonth(month, year).total;

        this.state.totalIncome1 = getIncomeCurrentMonth(monthYear1[0], monthYear1[1]).total;
        this.state.totalSpending1 = getSpendingCurrentMonth(monthYear1[0], monthYear1[1]).total;

        this.state.totalIncome2 = getIncomeCurrentMonth(monthYear2[0], monthYear2[1]).total;
        this.state.totalSpending2 = getSpendingCurrentMonth(monthYear2[0], monthYear2[1]).total;

        this.state.totalIncome3 = getIncomeCurrentMonth(monthYear3[0], monthYear3[1]).total;
        this.state.totalSpending3 = getSpendingCurrentMonth(monthYear3[0], monthYear3[1]).total;

        this.state.totalIncome4 = getIncomeCurrentMonth(monthYear4[0], monthYear4[1]).total;
        this.state.totalSpending4 = getSpendingCurrentMonth(monthYear4[0], monthYear4[1]).total;

        this.getWallet();
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

        let month = this.state.currentMonth;
        let year = this.state.currentYear;
        let monthYear1 = getMonthAndYear(month - 1, year);
        let monthYear2 = getMonthAndYear(month - 2, year);
        let monthYear3 = getMonthAndYear(month - 3, year);
        let monthYear4 = getMonthAndYear(month - 4, year);

        this.state.totalIncome = getIncomeCurrentMonth(month, year).total;
        this.state.totalSpending = getSpendingCurrentMonth(month, year).total;

        this.state.totalIncome1 = getIncomeCurrentMonth(monthYear1[0], monthYear1[1]).total;
        this.state.totalSpending1 = getSpendingCurrentMonth(monthYear1[0], monthYear1[1]).total;

        this.state.totalIncome2 = getIncomeCurrentMonth(monthYear2[0], monthYear2[1]).total;
        this.state.totalSpending2 = getSpendingCurrentMonth(monthYear2[0], monthYear2[1]).total;

        this.state.totalIncome3 = getIncomeCurrentMonth(monthYear3[0], monthYear3[1]).total;
        this.state.totalSpending3 = getSpendingCurrentMonth(monthYear3[0], monthYear3[1]).total;

        this.state.totalIncome4 = getIncomeCurrentMonth(monthYear4[0], monthYear4[1]).total;
        this.state.totalSpending4 = getSpendingCurrentMonth(monthYear4[0], monthYear4[1]).total;

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

                                {/* form */}
                                <Card>
                                    <Form>
                                        <Item picker >
                                            <Picker
                                                mode="dialog"
                                                iosIcon={<Ionicons name="md-arrow-dropdown-circle" size={25} />}
                                                placeholder="Select your SIM"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={this.state.active}
                                                onValueChange={this.onValueChange2.bind(this)}
                                            >
                                                <Picker.Item label="Biến động số dư theo tháng" value="0" />
                                                <Picker.Item label="Biến động thu nhập theo tháng" value="1" />
                                                <Picker.Item label="Biến động chi tiêu theo tháng" value="2" />
                                            </Picker>
                                        </Item>
                                    </Form>
                                </Card>

                                {/* biểu đồ số dư*/}
                                {this.state.active == 0 &&
                                    <Card>
                                        <CardItem header >
                                            <Text style={{ fontWeight: "bold", color: "#41aea9" }}>Số dư theo tháng</Text>
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
                                }


                                {/* biểu đồ thu nhập*/}
                                {
                                    this.state.active == 1 &&
                                    <Card>
                                        <CardItem header >
                                            <Text style={{ fontWeight: "bold", color: "green" }}>Thu nhập theo tháng</Text>
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
                                                            this.state.totalIncome5 / 1000000,
                                                            this.state.totalIncome4 / 1000000,
                                                            this.state.totalIncome3 / 1000000,
                                                            this.state.totalIncome2 / 1000000,
                                                            this.state.totalIncome1 / 1000000,
                                                            this.state.totalIncome / 1000000,
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
                                                color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`,
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
                                }

                                {/* biểu đồ chi tiêu*/}
                                {this.state.active == 2 &&
                                    <Card>
                                        <CardItem header >
                                            <Text style={{ fontWeight: "bold", color: "red" }}>Chi tiêu theo tháng</Text>
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
                                                            this.state.totalSpending5 / 1000000,
                                                            this.state.totalSpending4 / 1000000,
                                                            this.state.totalSpending3 / 1000000,
                                                            this.state.totalSpending2 / 1000000,
                                                            this.state.totalSpending1 / 1000000,
                                                            this.state.totalSpending / 1000000,
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
                                                color: (opacity = 1) => `rgba(200, 0, 0, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(200, 0, 0, ${opacity})`,
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
                                }
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
