import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import Tab1 from './StatisticalTabs/Tab1'
import Tab2 from './StatisticalTabs/Tab2'
import Tab3 from './StatisticalTabs/Tab3'

export default class Statistical extends React.Component {

    render() {
        return (
            <Container>
                <Tabs renderTabBar={() => <ScrollableTab underlineStyle={{ backgroundColor: "#d789d7" }} />}>
                    <Tab heading={
                        <TabHeading style={{ backgroundColor: "#fff" }}>
                            <Text style={{ fontWeight: "700", color: "#d789d7" }}>Theo danh mục</Text>
                        </TabHeading>}>
                        <Tab1 />
                    </Tab>
                    <Tab heading={
                        <TabHeading style={{ backgroundColor: "#fff" }}>
                            <Text style={{ fontWeight: "700", color: "#d789d7" }}>Biến động</Text>
                        </TabHeading>}>
                        <Tab2 />
                    </Tab>
                    <Tab heading={
                        <TabHeading style={{ backgroundColor: "#fff" }}>
                            <Text style={{ fontWeight: "700", color: "#d789d7" }}>Tổng quan theo tháng</Text>
                        </TabHeading>}>
                        <Tab3 />
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
