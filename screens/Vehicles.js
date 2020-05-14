import React, {Component} from 'react';
import {Alert, Button, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TouchableHighlightBase} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Header from '../components/Header';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import vehicleAdd from './screens/vehicleAdd';
import axiosInstance from '../components/axiosInstance';
import axios from 'axios'
import Background from '../components/Background'

// const Stack = createStackNavigator();

export default class Vehicles extends Component {
    

    state = {
        carData: '',
        responseData: '',
        status: '',
        index: 0,
        car: '',
        nickname: '',
        make: '',
        model: '',
        year: ''
    };

    setCars = (value, index) => {
        this.setState({
            index: index,
            car: value,
            nickname: this.state.carData[index]["nickname"],
            make: this.state.carData[index]["manufacturer"],
            model: this.state.carData[index]["model"],
            year: this.state.carData[index]["year"]
        })
    }

    initCars = () => {
        this.setState({
            nickname: this.state.carData[this.state.index]["nickname"],
            make: this.state.carData[this.state.index]["manufacturer"],
            model: this.state.carData[this.state.index]["model"],
            year: this.state.carData[this.state.index]["year"]
        })
    }

    getStatus = () => {
        this.setState({
            status: this.state.responseData[0]["status"]
        })
    }

    getData = async () => {
        if (this.state.carData === ''){
            let res = await axiosInstance.get(
                '/api.php',
                {params : {version: 1, collection : 'cars'}}
                )
            this.setState({carData: res.data});
            this.initCars();
        }
    }

    // postData = async () => {
    //     const data = {
    //         collection: 'cars',
    //         data: {"nickname":"Vinh", "manufacturer":"Tesla", "model":"Model S", "year":"2018"}
    //     }

    //     const config = {
    //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //     }

    //     let res = await axiosInstance.post('/update.php', data, config)
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
        
    //     // this.setState({responseData: res.data});
    //     Alert.alert('Car Added!');
    // }

    // postData = async () => {
    //     var config = axiosInstance({
    //         url: '/update.php',
    //         method: 'post',
    //         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //         data: {
    //             collection: 'cars',
    //             data: {"nickname":"Vinh", "manufacturer":"Tesla", "model":"Model S", "year":"2018"}
    //         }
    //     });

    //     let res = await axiosInstance.request(config);
    //     this.setState({responseData: res.data});
    //     Alert.alert('Car Added!');
    // }

    postData = () => {

        let data = {
            collection: 'cars',
            data: {
                nickname: 'Drail', 
                manufacturer: 'Tesla', 
                model: 'Model S', 
                year: '2018' 
            }
        }

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axiosInstance.post('/update.php', 'collection=cars&data={?nickname=Drail&manufacturer=Tesla&model=ModelS&year=2018}', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then((res) => {
                this.setState({responseData: res.data});
                Alert.alert(res.status.toString())
                // Alert.alert('Car Added!');
            })

            .catch((err) => {
                Alert.alert(err.toString())
            })

    }

    render() {
        // connect to backend
        this.getData();

        // TESTING POST
        // this.postData();

        return (
            <View style={styles.container}>
                <Header title='Vehicles'/>
                <Background/>
                <View style={styles.container}>

                    <View style={styles.container}>
                        <Text style={styles.headingText}>Select a Vehicle</Text>
                        <Picker
                        selectedValue={this.state.car}
                        style={{height: 75, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setCars(itemValue, itemIndex)
                        }>
                        <Picker.Item label="Emon's Car" value="E" />
                        <Picker.Item label="Mary's Car" value="M" />
                        <Picker.Item label="Joseph's Car" value="J" />
                        </Picker>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.headingText}>Vehicle Information</Text>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Nickname</Text>
                            <Text style={styles.infoTextRight}>{this.state.nickname}</Text>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Make</Text>
                            <Text style={styles.infoTextRight}>{this.state.make}</Text>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Model</Text>
                            <Text style={styles.infoTextRight}>{this.state.model}</Text>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Year</Text>
                            <Text style={styles.infoTextRight}>{this.state.year}</Text>
                        </View>
                    </View>

                    <View style={styles.optionsContainer}>
                        <Text style={styles.headingText}>Vehicle Options</Text>
                        <View style={styles.buttonContainer}>
                            <View style={{width: "33%"}}>
                                <Button
                                title="Remove"
                                color="#f04646"
                                onPress={() => Alert.alert('Car Removed')}
                                />
                            </View>
                            <View style={{width: "33%"}}>
                                <Button
                                title="Add"
                                onPress={this.postData}
                                />
                            </View>
                            <View style={{width: "33%"}}>
                                <Button
                                title="Edit"
                                color="#a8329e"
                                onPress={() => Alert.alert('Edit your Vehicle parameters')}
                                />
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    optionsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headingText: {
        paddingTop: 10,
        fontSize: 24,
        color: '#999999',
    },
    infoTextLeft: {
        flex: 1,
        textAlign: 'left',
        paddingTop: 15,
        paddingLeft: 16,
        fontSize: 18,
    },
    infoTextRight: {
        flex: 1,
        textAlign: 'right',
        paddingTop: 15,
        paddingRight: 16,
        fontSize: 18,
    },
    infoView: {
        flexDirection: 'row',
    },
})