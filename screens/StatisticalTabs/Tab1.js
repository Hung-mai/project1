import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import {
    PieChart,
} from "react-native-chart-kit";
import { Content, Card, CardItem, Text, Item, Form, Picker } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getIncomeCurrentMonth, getSpendingCurrentMonth } from '../../api/Tab1Api'
import { getMonthAndYear } from '../../api/MonthAndYear'

import {
    RefreshControl,
    SafeAreaView,
} from 'react-native';

export default class Tab1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),
            active: new Date().getMonth() + 1,

            incomeByMonth: [],

            spendingByMonth: [],

            wallet: 0,
            refreshing: false,
        }
    }

    onValueChange2(value) {
        this.setState({
            active: value
        });
    }

    componentDidMount() {
        let month = this.state.currentMonth;
        let year = this.state.currentYear;
        let monthYear1 = getMonthAndYear(month - 1, year);
        let monthYear2 = getMonthAndYear(month - 2, year);
        let monthYear3 = getMonthAndYear(month - 3, year);
        let monthYear4 = getMonthAndYear(month - 4, year);


        this.state.incomeByMonth[0] = getIncomeCurrentMonth(month, year);
        this.state.spendingByMonth[0] = getSpendingCurrentMonth(month, year);

        this.state.incomeByMonth[1] = getIncomeCurrentMonth(monthYear1[0], monthYear1[1]);
        this.state.spendingByMonth[1] = getSpendingCurrentMonth(monthYear1[0], monthYear1[1]);

        this.state.incomeByMonth[2] = getIncomeCurrentMonth(monthYear2[0], monthYear2[1]);
        this.state.spendingByMonth[2] = getSpendingCurrentMonth(monthYear2[0], monthYear2[1]);

        this.state.incomeByMonth[3] = getIncomeCurrentMonth(monthYear3[0], monthYear3[1]);
        this.state.spendingByMonth[3] = getSpendingCurrentMonth(monthYear3[0], monthYear3[1]);

        this.state.incomeByMonth[4] = getIncomeCurrentMonth(monthYear4[0], monthYear4[1]);
        this.state.spendingByMonth[4] = getSpendingCurrentMonth(monthYear4[0], monthYear4[1]);
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


        this.state.incomeByMonth[0] = getIncomeCurrentMonth(month, year);
        this.state.spendingByMonth[0] = getSpendingCurrentMonth(month, year);

        this.state.incomeByMonth[1] = getIncomeCurrentMonth(monthYear1[0], monthYear1[1]);
        this.state.spendingByMonth[1] = getSpendingCurrentMonth(monthYear1[0], monthYear1[1]);

        this.state.incomeByMonth[2] = getIncomeCurrentMonth(monthYear2[0], monthYear2[1]);
        this.state.spendingByMonth[2] = getSpendingCurrentMonth(monthYear2[0], monthYear2[1]);

        this.state.incomeByMonth[3] = getIncomeCurrentMonth(monthYear3[0], monthYear3[1]);
        this.state.spendingByMonth[3] = getSpendingCurrentMonth(monthYear3[0], monthYear3[1]);

        this.state.incomeByMonth[4] = getIncomeCurrentMonth(monthYear4[0], monthYear4[1]);
        this.state.spendingByMonth[4] = getSpendingCurrentMonth(monthYear4[0], monthYear4[1]);

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
                                                <Picker.Item label={"Tháng " + this.state.currentMonth + " năm " + this.state.currentYear} value={this.state.currentMonth} />
                                                <Picker.Item label={"Tháng " + getMonthAndYear(this.state.currentMonth - 1, this.state.currentYear)[0] + " năm " + getMonthAndYear(this.state.currentMonth - 1, this.state.currentYear)[1]} value={getMonthAndYear(this.state.currentMonth - 1, this.state.currentYear)[0]} />
                                                <Picker.Item label={"Tháng " + getMonthAndYear(this.state.currentMonth - 2, this.state.currentYear)[0] + " năm " + getMonthAndYear(this.state.currentMonth - 1, this.state.currentYear)[1]} value={getMonthAndYear(this.state.currentMonth - 2, this.state.currentYear)[0]} />
                                                <Picker.Item label={"Tháng " + getMonthAndYear(this.state.currentMonth - 3, this.state.currentYear)[0] + " năm " + getMonthAndYear(this.state.currentMonth - 1, this.state.currentYear)[1]} value={getMonthAndYear(this.state.currentMonth - 3, this.state.currentYear)[0]} />
                                                <Picker.Item label={"Tháng " + getMonthAndYear(this.state.currentMonth - 4, this.state.currentYear)[0] + " năm " + getMonthAndYear(this.state.currentMonth - 1, this.state.currentYear)[1]} value={getMonthAndYear(this.state.currentMonth - 4, this.state.currentYear)[0]} />
                                            </Picker>
                                        </Item>
                                    </Form>
                                </Card>

                                <FlatList
                                    data={this.state.incomeByMonth}
                                    keyExtractor={income => income.month}
                                    renderItem={(income) => (
                                        <View>
                                            {/* biểu đồ thu nhap*/}
                                            { this.state.active == income.item.month &&
                                                <View>
                                                    <Card>
                                                        <CardItem header >
                                                            <Text style={{ fontWeight: "bold", color: "green" }}>Theo danh mục thu nhập</Text>
                                                        </CardItem>
                                                        {
                                                            ((income.item.tongLuongThuong == 0 && income.item.tongTroCap == 0 && income.item.tongTienLatVat == 0)
                                                                &&
                                                                (
                                                                    <View style={{ alignItems: "center", height: 100, justifyContent: "center" }}>
                                                                        <Text style={{ color: "#7f7f7f" }}>Không có giao dịch</Text>
                                                                    </View>
                                                                ))
                                                            ||
                                                            <PieChart
                                                                data={[
                                                                    {
                                                                        name: 'Lương thưởng',
                                                                        population: income.item.tongLuongThuong,
                                                                        color: '#035aa6',
                                                                        legendFontColor: '#7F7F7F',
                                                                        legendFontSize: 13,
                                                                    },
                                                                    {
                                                                        name: 'Trợ cấp',
                                                                        population: income.item.tongTroCap,
                                                                        color: '#40bad5',
                                                                        legendFontColor: '#7F7F7F',
                                                                        legendFontSize: 13,
                                                                    },
                                                                    {
                                                                        name: 'Tiền lặt vặt',
                                                                        population: income.item.tongTienLatVat,
                                                                        color: '#fcbf1e',
                                                                        legendFontColor: '#7F7F7F',
                                                                        legendFontSize: 13,
                                                                    },
                                                                ]}
                                                                width={350}
                                                                height={150}
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
                                                                    marginBottom: 8,
                                                                    borderRadius: 16,
                                                                }}
                                                                center={[20, 0]}
                                                                accessor="population"
                                                                backgroundColor="transparent"
                                                                paddingLeft="-20"
                                                            //for the absolute number remove if you want percentage
                                                            />
                                                        }
                                                    </Card>

                                                </View>

                                            }
                                        </View>
                                    )}
                                />

                                <FlatList
                                    data={this.state.spendingByMonth}
                                    keyExtractor={income => income.month}
                                    renderItem={(spending) => (
                                        <View>
                                            { this.state.active == spending.item.month &&
                                                <View>

                                                    <Card>
                                                        <CardItem header >
                                                            <Text style={{ fontWeight: "bold", color: "red" }}>Theo danh mục chi tiêu</Text>
                                                        </CardItem>
                                                        {
                                                            ((spending.item.tonganUong == 0 &&
                                                                spending.item.tonggiaiTri == 0 &&
                                                                spending.item.tongtiecTung == 0 &&
                                                                spending.item.tongthueNha == 0 &&
                                                                spending.item.tongduLich == 0 &&
                                                                spending.item.tongquaCap == 0 &&
                                                                spending.item.tongmuaSam == 0 &&
                                                                spending.item.tongxeCo == 0)
                                                                &&
                                                                (
                                                                    <View style={{ alignItems: "center", height: 100, justifyContent: "center" }}>
                                                                        <Text style={{ color: "#7f7f7f" }}>Không có giao dịch</Text>
                                                                    </View>
                                                                ))
                                                            ||
                                                            <View style={{ flexDirection: "row" }}>
                                                                <PieChart
                                                                    data={[
                                                                        {
                                                                            name: 'Ăn uống',
                                                                            population: spending.item.tonganUong,
                                                                            color: '#ec0101',
                                                                            legendFontColor: '#7F7F7F',
                                                                            legendFontSize: 13,

                                                                        },
                                                                        {
                                                                            name: 'Giải trí',
                                                                            population: spending.item.tonggiaiTri,
                                                                            color: '#ff9a76',
                                                                            legendFontColor: '#7F7F7F',
                                                                            legendFontSize: 13,
                                                                        },
                                                                        {
                                                                            name: 'Tiệc tùng',
                                                                            population: spending.item.tongtiecTung,
                                                                            color: '#fddb3a',
                                                                            legendFontColor: '#7F7F7F',
                                                                            legendFontSize: 13,
                                                                        },
                                                                        {
                                                                            name: 'Thuê nhà',
                                                                            population: spending.item.tongthueNha,
                                                                            color: '#81b214',
                                                                            legendFontColor: '#7F7F7F',
                                                                            legendFontSize: 13,
                                                                        },
                                                                        {
                                                                            name: 'Du Lịch',
                                                                            population: spending.item.tongduLich,
                                                                            color: '#00b7c2',
                                                                            legendFontColor: '#7F7F7F',
                                                                            legendFontSize: 13,
                                                                        },
                                                                        {
                                                                            name: 'Quà cáp',
                                                                            population: spending.item.tongquaCap,
                                                                            color: '#b0cac7',
                                                                            legendFontColor: '#7F7F7F',
                                                                            legendFontSize: 13,
                                                                        },
                                                                        {
                                                                            name: 'Mua sắm',
                                                                            population: spending.item.tongmuaSam,
                                                                            color: '#f09ae9',
                                                                            legendFontColor: '#7F7F7F',
                                                                            legendFontSize: 13,
                                                                        },
                                                                        {
                                                                            name: 'Xe cộ',
                                                                            population: spending.item.tongxeCo,
                                                                            color: '#050505',
                                                                            legendFontColor: '#7F7F7F',
                                                                            legendFontSize: 13,
                                                                        },
                                                                    ]}
                                                                    width={150}
                                                                    height={150}
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
                                                                        marginBottom: 8,
                                                                        borderRadius: 16,
                                                                    }}
                                                                    accessor="population"
                                                                    backgroundColor="#fff"
                                                                    center={[50, 0]}
                                                                    hasLegend={false}
                                                                //for the absolute number remove if you want percentage
                                                                />
                                                                <View style={{ justifyContent: "space-around", height: 120, marginTop: 15, marginLeft: 35 }}>
                                                                    {Math.round(spending.item.tonganUong) > 0 &&
                                                                        <View style={{ flexDirection: "row" }}>
                                                                            <View style={{ height: 16, width: 16, backgroundColor: "#ec0101", borderRadius: 16, marginTop: 2 }}></View>
                                                                            <Text style={{ color: "#7F7F7F", fontSize: 13, marginLeft: 8 }}>{Math.round(spending.item.tonganUong * 100 / (spending.item.tonganUong + spending.item.tonggiaiTri + spending.item.tongtiecTung + spending.item.tongthueNha + spending.item.tongduLich + spending.item.tongquaCap + spending.item.tongmuaSam + spending.item.tongxeCo))}% Ăn uống</Text>
                                                                        </View>
                                                                    }
                                                                    {Math.round(spending.item.tonggiaiTri) > 0 &&
                                                                        <View style={{ flexDirection: "row" }}>
                                                                            <View style={{ height: 16, width: 16, backgroundColor: "#ff9a76", borderRadius: 16, marginTop: 2 }}></View>
                                                                            <Text style={{ color: "#7F7F7F", fontSize: 13, marginLeft: 8 }}>{Math.round(spending.item.tonggiaiTri * 100 / (spending.item.tonganUong + spending.item.tonggiaiTri + spending.item.tongtiecTung + spending.item.tongthueNha + spending.item.tongduLich + spending.item.tongquaCap + spending.item.tongmuaSam + spending.item.tongxeCo))}% Giải trí</Text>
                                                                        </View>
                                                                    }
                                                                    {Math.round(spending.item.tongtiecTung) > 0 &&
                                                                        <View style={{ flexDirection: "row" }}>
                                                                            <View style={{ height: 16, width: 16, backgroundColor: "#fddb3a", borderRadius: 16, marginTop: 2 }}></View>
                                                                            <Text style={{ color: "#7F7F7F", fontSize: 13, marginLeft: 8 }}>{Math.round(spending.item.tongtiecTung * 100 / (spending.item.tonganUong + spending.item.tonggiaiTri + spending.item.tongtiecTung + spending.item.tongthueNha + spending.item.tongduLich + spending.item.tongquaCap + spending.item.tongmuaSam + spending.item.tongxeCo))}% Tiệc tùng</Text>
                                                                        </View>
                                                                    }
                                                                    {Math.round(spending.item.tongthueNha) > 0 &&
                                                                        <View style={{ flexDirection: "row" }}>
                                                                            <View style={{ height: 16, width: 16, backgroundColor: "#81b214", borderRadius: 16, marginTop: 2 }}></View>
                                                                            <Text style={{ color: "#7F7F7F", fontSize: 13, marginLeft: 8 }}>{Math.round(spending.item.tongthueNha * 100 / (spending.item.tonganUong + spending.item.tonggiaiTri + spending.item.tongtiecTung + spending.item.tongthueNha + spending.item.tongduLich + spending.item.tongquaCap + spending.item.tongmuaSam + spending.item.tongxeCo))}% Thuê nhà</Text>
                                                                        </View>
                                                                    }
                                                                    {Math.round(spending.item.tongduLich) > 0 &&
                                                                        <View style={{ flexDirection: "row" }}>
                                                                            <View style={{ height: 16, width: 16, backgroundColor: "#00b7c2", borderRadius: 16, marginTop: 2 }}></View>
                                                                            <Text style={{ color: "#7F7F7F", fontSize: 13, marginLeft: 8 }}>{Math.round(spending.item.tongduLich * 100 / (spending.item.tonganUong + spending.item.tonggiaiTri + spending.item.tongtiecTung + spending.item.tongthueNha + spending.item.tongduLich + spending.item.tongquaCap + spending.item.tongmuaSam + spending.item.tongxeCo))}% Du lịch</Text>
                                                                        </View>
                                                                    }
                                                                    {Math.round(spending.item.tongquaCap) > 0 &&
                                                                        <View style={{ flexDirection: "row" }}>
                                                                            <View style={{ height: 16, width: 16, backgroundColor: "#b0cac7", borderRadius: 16, marginTop: 2 }}></View>
                                                                            <Text style={{ color: "#7F7F7F", fontSize: 13, marginLeft: 8 }}>{Math.round(spending.item.tongquaCap * 100 / (spending.item.tonganUong + spending.item.tonggiaiTri + spending.item.tongtiecTung + spending.item.tongthueNha + spending.item.tongduLich + spending.item.tongquaCap + spending.item.tongmuaSam + spending.item.tongxeCo))}% Quà cáp</Text>
                                                                        </View>
                                                                    }
                                                                    {Math.round(spending.item.tongmuaSam) > 0 &&
                                                                        <View style={{ flexDirection: "row" }}>
                                                                            <View style={{ height: 16, width: 16, backgroundColor: "#f09ae9", borderRadius: 16, marginTop: 2 }}></View>
                                                                            <Text style={{ color: "#7F7F7F", fontSize: 13, marginLeft: 8 }}>{Math.round(spending.item.tongmuaSam * 100 / (spending.item.tonganUong + spending.item.tonggiaiTri + spending.item.tongtiecTung + spending.item.tongthueNha + spending.item.tongduLich + spending.item.tongquaCap + spending.item.tongmuaSam + spending.item.tongxeCo))}% Mua sắm</Text>
                                                                        </View>
                                                                    }
                                                                    {Math.round(spending.item.tongxeCo) > 0 &&
                                                                        <View style={{ flexDirection: "row" }}>
                                                                            <View style={{ height: 16, width: 16, backgroundColor: "#050505", borderRadius: 16, marginTop: 2 }}></View>
                                                                            <Text style={{ color: "#7F7F7F", fontSize: 13, marginLeft: 8 }}>{Math.round(spending.item.tongxeCo * 100 / (spending.item.tonganUong + spending.item.tonggiaiTri + spending.item.tongtiecTung + spending.item.tongthueNha + spending.item.tongduLich + spending.item.tongquaCap + spending.item.tongmuaSam + spending.item.tongxeCo))}% Xe cộ</Text>
                                                                        </View>
                                                                    }
                                                                </View>
                                                            </View>
                                                        }

                                                    </Card>
                                                </View>

                                            }
                                        </View>
                                    )}
                                />




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
