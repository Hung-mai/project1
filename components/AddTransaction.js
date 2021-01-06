import React, { Component } from 'react';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight
} from "react-native";
import { firebaseApp } from './FirebaseConfig'
export default class FABExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            modalVisible: false,
            incomeTransaction: '',
            spendingTransaction: ''
        };
    }

    addIncomeTransaction() {
        firebaseApp.database().ref('/income_category_id').push({
            name: '',
            money: '',
            date: '',
            income_category_id: ''
        })
    }

    addSpendingTransaction() {
        firebaseApp.database().ref('/spending_category_id').push({
            name: '',
            money: '',
            date: '',
            spending_category_id: '',
            modalVisible: false,
        })
    }

    render() {
        return (
            <Container>
                <View style={{ flex: 1 }}>
                    <Fab
                        active={this.state.active}
                        direction="left"
                        containerStyle={{}}
                        style={{ backgroundColor: '#1877f2' }}
                        position=""
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="add" />
                        <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.props.navigation.navigate('AddIncome')}>
                            <Icon name="add" />
                        </Button>
                        <Button style={{ backgroundColor: 'red' }} onPress={() => this.props.navigation.navigate('AddSpending')}>
                            <Icon name="ios-remove" />
                        </Button>
                    </Fab>


                </View>
            </Container>
        );
    }
}

