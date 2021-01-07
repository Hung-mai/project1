import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import Tab11 from './Tab11'
import Tab12 from './Tab12'

export default class PeriodicTransactionScreen extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Container>
                <Tabs tabBarUnderlineStyle={{backgroundColor: "#d789d7"}}>
                    <Tab heading={
                        <TabHeading style={{ backgroundColor: "#fff" }}>
                            <Text style={{ fontWeight: "700", color: "#d789d7" }}>Thu nhập định kỳ</Text>
                        </TabHeading>}>
                        <Tab11 navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading={
                        <TabHeading style={{ backgroundColor: "#fff" }}>
                            <Text style={{ fontWeight: "700", color: "#d789d7" }}>Chi tiêu định kỳ</Text>
                        </TabHeading>}>
                        <Tab12 navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
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
    },
});
