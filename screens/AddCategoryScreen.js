import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Picker, Label, Input, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../components/FirebaseConfig'
export default class AddCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected1: undefined,
            selected2: undefined,
            textIn: ''
        };
    }
    onValueChange1(value) {
        this.setState({
            selected1: value
        });
    }
    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }
    onChangeText(text) {
        this.setState({
            textIn: text
        })
    }
    addCategory() {
        try {
            if (this.state.selected1 && this.state.selected2 && this.state.textIn) {
                firebaseApp.database().ref('/' + this.state.selected1).push({
                    name: this.state.textIn,
                    type: this.state.selected2
                })
                Alert.alert('Thông báo', 'Thêm thành công !');
                this.setState({
                    selected1: '',
                    selected2: '',
                    textIn: ''
                });
            } else {
                Alert.alert('Lỗi', 'Hãy điền đầy đủ các trường !');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Hãy điền đầy đủ các trường !');
        }
    }
    render() {
        return (
            <Container>
                <Content>
                    <Form style={styles.container}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Ionicons name="ios-arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange1.bind(this)}
                            >
                                <Picker.Item label="Loại giao dịch" value="" />
                                <Picker.Item label="Thu nhập" value="income_categories" />
                                <Picker.Item label="Chi tiêu" value="spending_categories" />
                            </Picker>
                        </Item>

                        <Item picker style={{ marginTop: 30 }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Ionicons name="ios-arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="Mức độ thường xuyên" value="" />
                                <Picker.Item label="Bất thường" value="0" />
                                <Picker.Item label="Định kỳ" value="1" />
                            </Picker>
                        </Item>

                        <Item style={{ marginTop: 30, width: "100%", marginLeft: 0 }}>
                            <Input
                                onChangeText={text => this.onChangeText(text)}
                                value={this.state.textIn}
                                placeholder='Tên danh mục' />
                        </Item>

                        <View style={{ justifyContent: "center", marginTop: 20 }}>
                            <Button
                                rounded info
                                style={{ width: 100, justifyContent: "center", marginTop: 30 }}
                                onPress={() => { this.addCategory() }}>
                                <Text style={{ color: "white" }}>Xác nhận</Text>
                            </Button>
                        </View>

                    </Form>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        marginLeft: "5%",
        marginTop: 100
    },
});