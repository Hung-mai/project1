import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";

export default function CardItemButton({ navigation }) {

    return (
        <Container>

            <Content padder>
                <Card >
                    <CardItem button onPress={() => navigation.navigate('AddCategory')} style={{ backgroundColor: "rgba(0, 170, 0, 0.3)" }}>
                        <Body >
                            <Text>
                                Thêm danh mục giao dịch.
                            </Text>
                        </Body>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem button onPress={() => navigation.navigate('DeleteCategory')} style={{ backgroundColor: "rgba(200, 0, 0, 0.3)" }}>
                        <Body>
                            <Text>
                                Xóa danh mục giao dịch.
                            </Text>
                        </Body>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem button onPress={() => navigation.navigate('CompletedPlans')} style={{ backgroundColor: "rgba(0, 186, 255, 0.3)" }}>
                        <Body>
                            <Text>
                                Những kế hoạch đã hoàn thành
                            </Text>
                        </Body>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem button onPress={() => navigation.navigate('PeriodicTransaction')} style={{ backgroundColor: "rgba(255, 111, 255, 0.3)" }}>
                        <Body>
                            <Text>
                                Thiết lập khoản thu chi định kỳ
                            </Text>
                        </Body>
                    </CardItem>
                </Card>

            </Content>
        </Container>
    );
}


