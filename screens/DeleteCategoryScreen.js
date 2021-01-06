import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../components/FirebaseConfig'
import { Alert } from 'react-native'

export default class ListDividerExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataIncome: [],
            dataSpending: [],
            modalVisible: false,
        }
    }

    listenDeleteChild1() {
        var items = [];
        firebaseApp.database().ref('/income_categories').on('value', (dataSnapshot) => {
            dataSnapshot.forEach((snapshot) => {
                items.push({
                    id: snapshot.key,
                    name: snapshot.val().name,
                    type: snapshot.val().type,
                })
            })
        })
        firebaseApp.database().ref('/income_categories').on('child_removed', (snapshot) => {
            items = items.filter((item) => item.id !== snapshot.key)
        })
        this.setState({
            dataIncome: items,
        })
    }

    listenDeleteChild2() {
        var items = [];
        firebaseApp.database().ref('/spending_categories').on('value', (dataSnapshot) => {
            dataSnapshot.forEach((snapshot) => {
                items.push({
                    id: snapshot.key,
                    name: snapshot.val().name,
                    type: snapshot.val().type,
                })
            })
        })
        firebaseApp.database().ref('/spending_categories').on('child_removed', (snapshot) => {
            items = items.filter((item) => item.id != snapshot.key)
        })
        this.setState({
            dataSpending: items,
        })
    }

    removeIncome(item) {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn xóa danh mục này ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        firebaseApp.database().ref('/income_categories').child(item.id).remove();
                        this.listenDeleteChild1();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    removeSpending(item) {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn xóa danh mục này ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        firebaseApp.database().ref('/spending_categories').child(item.id).remove();
                        this.listenDeleteChild2();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    render() {
        return (

            <Container>
                <Content>
                    <List>
                        {/* income */}
                        <ListItem itemDivider>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#03c4a1" }}>Danh mục thu nhập</Text>
                        </ListItem>
                        <FlatList
                            data={this.state.dataIncome}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.removeIncome(item)}>
                                    <ListItem style={{ justifyContent: "space-between" }}>
                                        <Text>{item.name}</Text>
                                        <Ionicons name="ios-trash" size={25} color="red" />
                                    </ListItem>
                                </TouchableOpacity>
                            )}
                        />
                        {/* spending */}
                        <ListItem itemDivider>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#d789d7" }}>Danh mục chi tiêu</Text>
                        </ListItem>
                        <FlatList
                            data={this.state.dataSpending}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.removeSpending(item)}>
                                    <ListItem style={{ justifyContent: "space-between" }}>
                                        <Text>{item.name}</Text>
                                        <Ionicons name="ios-trash" size={25} color="red" />
                                    </ListItem>
                                </TouchableOpacity>
                            )}
                        />
                    </List>
                </Content>
            </Container>
        );
    }


    componentDidMount() {
        var i = 0;
        var lap = setInterval(() => {
            i++;
            this.listenDeleteChild1();
            this.listenDeleteChild2();
            if (i == 2) {
                clearInterval(lap);
            }
        }, 1000);

    }
}

