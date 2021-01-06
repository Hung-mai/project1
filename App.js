import * as React from 'react';
import { Root } from "native-base";
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OverviewScreen from './screens/OverviewScreen';
import PlanScreen from './screens/PlanScreen';
import StatisticalScreen from './screens/StatisticalScreen';
import TransactionScreen from './screens/TransactionScreen';
import SettingScreen from './screens/SettingScreen'
import AddCategoryScreen from './screens/AddCategoryScreen';
import DeleteCategoryScreen from './screens/DeleteCategoryScreen';
import AddIncomeScreen from './screens/transaction/AddIncomeScreen'
import AddSpendingScreen from './screens/transaction/AddSpendingScreen'
import CompletedPlansScreen from './screens/plan/CompletedPlansScreen'

import Ionicons from 'react-native-vector-icons/Ionicons';



// overview stack
const OverviewStack = createStackNavigator();
function OverviewStackScreen() {
    return (
        <OverviewStack.Navigator initialRouteName="Overview">
            <OverviewStack.Screen name="Overview" component={OverviewScreen} options={{
                title: 'Tổng quan', headerStyle: {
                    backgroundColor: '#d789d7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </OverviewStack.Navigator>
    );
}

// transaction stack
const TransactionStack = createStackNavigator();
function TransactionStackScreen() {
    return (
        <TransactionStack.Navigator initialRouteName="Transaction">
            <TransactionStack.Screen name="Transaction" component={TransactionScreen} options={{
                title: 'Giao dịch', headerStyle: {
                    backgroundColor: '#d789d7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <TransactionStack.Screen name="AddIncome" component={AddIncomeScreen} options={{
                title: 'Thêm thu nhập', headerStyle: {
                    backgroundColor: '#81b214',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <TransactionStack.Screen name="AddSpending" component={AddSpendingScreen} options={{
                title: 'Thêm chi tiêu', headerStyle: {
                    backgroundColor: '#c62a88',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </TransactionStack.Navigator>
    );
}

// statistical stack
const StatisticalStack = createStackNavigator();
function StatisticalStackScreen() {
    return (
        <StatisticalStack.Navigator initialRouteName="Statistical">
            <StatisticalStack.Screen name="Statistical" component={StatisticalScreen} options={{
                title: 'Thống kê', headerStyle: {
                    backgroundColor: '#d789d7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </StatisticalStack.Navigator>
    );
}

// plan stack
const PlanStack = createStackNavigator();
function PlanStackScreen() {
    return (
        <PlanStack.Navigator initialRouteName="Plan">
            <PlanStack.Screen name="Plan" component={PlanScreen} options={{
                title: 'Kế hoạch', headerStyle: {
                    backgroundColor: '#d789d7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </PlanStack.Navigator>
    );
}

// setting stack
const SettingStack = createStackNavigator();
function SettingStackScreen() {
    return (
        <SettingStack.Navigator initialRouteName="Setting">
            <SettingStack.Screen name="Setting" component={SettingScreen} options={{
                title: 'Settings', headerStyle: {
                    backgroundColor: '#d789d7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <OverviewStack.Screen name="AddCategory" component={AddCategoryScreen} options={{
                title: 'Thêm danh mục', headerStyle: {
                    backgroundColor: '#d789d7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <OverviewStack.Screen name="DeleteCategory" component={DeleteCategoryScreen} options={{
                title: 'Xóa danh mục', headerStyle: {
                    backgroundColor: '#d789d7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <OverviewStack.Screen name="CompletedPlans" component={CompletedPlansScreen} options={{
                title: 'Kế hoạch đã hoàn thành', headerStyle: {
                    backgroundColor: '#d789d7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </SettingStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function AppNavigation() {
    return (
        <Root>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Overview') {
                                iconName = focused
                                    ? 'logo-buffer'
                                    : 'logo-buffer';
                            } else if (route.name === 'Transaction') {
                                iconName = focused ? 'ios-cash' : 'ios-cash';
                            } else if (route.name === 'Statistical') {
                                iconName = focused ? 'ios-stats' : 'ios-stats';
                            } else if (route.name === 'Plan') {
                                iconName = focused ? 'md-timer' : 'md-timer';
                            } else if (route.name === 'Setting') {
                                iconName = focused ? 'md-settings' : 'md-settings';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#81b214',
                        inactiveTintColor: 'gray',
                    }}
                >


                    <Tab.Screen name="Overview" component={OverviewStackScreen} />
                    <Tab.Screen name="Transaction" component={TransactionStackScreen} />
                    <Tab.Screen name="Statistical" component={StatisticalStackScreen} />
                    <Tab.Screen name="Plan" component={PlanStackScreen} />
                    <Tab.Screen name="Setting" component={SettingStackScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </Root>
    )
}

export default AppNavigation;
