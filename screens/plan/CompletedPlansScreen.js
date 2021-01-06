import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, FlatList, Modal, TouchableHighlight, Alert, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebaseApp } from '../../components/FirebaseConfig'
import {  Card, CardItem, Text, Body, Item, Input, Button } from "native-base";



export default class CompletedPlans extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            count: 0,
            totalMoney: 0,
        }
    }

    componentDidMount(){
        // var i = 0;
        var lap = setInterval(() => {
            // i++;
            this.listenData();
            // if(i == 2){
            //     clearInterval(lap);
            // }
         }, 1000);

    
            
    };
     

    render() {
        return (
            <View style={{marginHorizontal: 10, marginBottom: 0, marginTop: 8, height: "100%", zIndex: 0}}>
                <Card>
                    <CardItem footer bordered style={{justifyContent: "space-between"}}>
                        <Text style={{color: "green"}}>{ 'Tổng:  ' + parseInt(this.state.totalMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                        <Text style={{color: "green"}}>{ 'Plans:  ' + this.state.count}</Text>
                    </CardItem>
                </Card>
                <ScrollView style={{marginBottom: 18, marginTop: 0, zIndex: 0}}>
                        <Card>

                        {/* income */}
                        <FlatList 
                            data={this.state.data}
                            keyExtractor={plan => plan.money}
                            renderItem={(plan)=> (
                            <View>
                                
                                    <TouchableOpacity>
                                    <CardItem bordered style={{backgroundColor: "rgba(0, 186, 255, 0.3)"}}>
                                    <Body style={{borderRightWidth: 5, borderRightColor: "rgba(0, 186, 255, 1)"}}>
                                        <View style={{flexDirection: "row"}}>
                                            <View style={{width: 45, height: 45, marginRight: 20, backgroundColor: "rgba(0, 186, 255, 1)", borderRadius: 25, justifyContent: "center", alignItems: "center"}}>
                                                <Ionicons style={{color: "#fff"}} name="md-done-all" size={30} />
                                            </View>
                                            
                                            <View style={{width: "72%"}}>
                                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                    <Text style={{fontSize: 15, color: "#6f4a8e"}}>{plan.item.planName}</Text>
                                                    <Text style={{fontSize: 14, marginTop: 2, color: "#6f4a8e"}}>{plan.item.planDate}</Text>
                                                </View>
                                                <View style={{flexDirection: "row", marginTop: 3}}>
                                                    <Text style={{fontSize: 12, color: "#6f4a8e"}}>{parseInt(plan.item.planMoney).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}</Text>
                                                    <Text style={{marginLeft: "auto" , fontSize: 12, color: "#6f4a8e"}}>Đã hoàn thành</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </TouchableOpacity>
                                
                                
                            </View>)
                                
                                
                            }
                        />
                        
                            
                        </Card>
                </ScrollView>
              
            </View>
        );
    }


    listenData(){
        var data = [];
        var count = 0;
        var total = 0;
        firebaseApp.database().ref('/plans').orderByChild('is_completed').equalTo(true).on('value', (dataSnapshot) => {
            dataSnapshot.forEach((snapshot) => {
                count++;
                total += parseInt(snapshot.val().planMoney) ;
                data.push({
                    planId: snapshot.key,
                    planMoney: snapshot.val().planMoney,
                    planName: snapshot.val().planName,
                    planDate: snapshot.val().date,
                })
            })
        })

        this.setState({
            data: data,
            count: count,
            totalMoney: total
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        // width: 200,
        // height: 100
      },
   
      
});
