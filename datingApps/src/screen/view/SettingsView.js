import React, { Component } from 'react';
import { Image, StyleSheet, AsyncStorage, Alert, TouchableOpacity, ActivityIndicator, } from 'react-native'
import Geocoder from 'react-native-geocoder'
import { connect } from 'react-redux'
import {
    Container, Content,
    CardItem, Left,
    View, Text, Right, Card, Icon, Body, Switch, Button, Toast,
} from 'native-base';

import { patchLocation } from '../../publics/redux/actions/users'

class SettingsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        }
    }

    static navigationOptions = {
        title: 'Settings'
    }

    //WATCH POSISITION
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    getLocation() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        );
    }

    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             this.setState({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //                 error: null,
    //             });
    //         },
    //         (error) => this.setState({ error: error.message }),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    //     );
    // }

    //GeoCoding
    async getData() {
        const MY_KEY = "AIzaSyA-XW8f56W4TgL0joEoZEcrrpZP0Qxis7g"
        // simply add your google key
        Geocoder.fallbackToGoogle(MY_KEY);
        let lat = this.state.latitude
        let lng = this.state.longitude
        // use the lib as usual
        let res = await Geocoder.geocodePosition({ lat, lng })
        // you get the same results
        //console.warn(res[0].subAdminArea)
        // this.setState({
        //     city: res[0].subAdminArea
        // })
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        await this.props.dispatch(patchLocation(Number(val_id), val_token, {
            location: res[0].subAdminArea
        }))
    }

    updateLocation() {
        Alert.alert(
            '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tConfirm',
            `Are you sure want update location right now?`,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        try {
                            await this.getLocation()
                            setTimeout(() => {
                                this.getData()
                                //console.warn(this.state.latitude)
                            }, 20000)
                            return true
                        }
                        catch (exception) {
                            return false
                        }
                    }
                },
            ],
            { cancelable: false },
        )
    }

    movetoUpdate() {
        this.props.navigation.navigate('LocationSettings')
    }

    logoutAccount(id, token) {
        Alert.alert(
            '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tConfirm',
            `Are you sure you want to Logout?`,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        try {
                            await AsyncStorage.removeItem(id)
                            await AsyncStorage.removeItem(token)
                            this.props.navigation.navigate('LoginView')
                            Toast.show({
                                text: "Account Logout Success",
                                position: "top",
                                type: 'success',
                                textStyle: { textAlign: 'center' }
                            })
                            return true
                        }
                        catch (exception) {
                            return false
                        }
                    }
                },
            ],
            { cancelable: false },
        )
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                        <View>
                            <Text style={styles.textTitle}>Account Settings</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('PhoneNumberSettingsView')}
                            >
                                <Card>
                                    <CardItem>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: 'sans-serif-thin' }}>Phone Number</Text>
                                            <Text style={{ marginLeft: 90, color: '#9e9e9e' }}>{this.props.users.profile.phone_number}</Text>
                                        </View>
                                        <Icon name='ios-arrow-forward' style={{ marginLeft: 10, color: '#9e9e9e' }} />
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                            <Text style={styles.textSubTitle}>Verify a Phone Number to help secure your account</Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.textTitle}>Discovery Settings</Text>
                            <Card>
                                <CardItem>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontFamily: 'sans-serif-thin' }}>Swiping in</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <Icon type='FontAwesome5' name='map-marker-alt' style={{ color: '#448aff' }} />
                                            <TouchableOpacity
                                                onPress={() => this.movetoUpdate()}
                                            >
                                                <Text style={{ marginLeft: 10 }}>My Current Location</Text>
                                            </TouchableOpacity>
                                            <Icon type='Entypo' name='check' style={{ color: '#448aff', marginLeft: 100 }} />
                                        </View>
                                        {
                                            this.loadingView()
                                        }
                                    </View>
                                </CardItem>
                            </Card>
                            <Text style={styles.textSubTitle}>Change your swipe location to see Insta love members in other cities</Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Card>
                                <CardItem>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: 'sans-serif-thin' }}>Men</Text>
                                            <View style={{ marginLeft: 220 }}>
                                                <Switch value={false} />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <Text style={{ fontFamily: 'sans-serif-thin' }}>Woman</Text>
                                            <View style={{ marginLeft: 200 }}>
                                                <Switch value={true} />
                                            </View>
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                            <Text style={styles.textSubTitle}>This Apps uses these preferences to suggest matches.</Text>
                            <Text style={styles.textSubTitle}>Some match suggestions may not fall within your desired parameters.</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button block bordered style={{ borderColor: '#E91E63', borderRadius: 5 }}
                                onPress={() => this.logoutAccount('id', 'token')}
                            >
                                <Text style={{ color: '#E91E63', fontWeight: 'bold' }}>
                                    Logout
                                </Text>
                            </Button>
                        </View>
                        <View style={{ marginTop: 20, marginBottom: 20 }}>
                            <Button block bordered style={{ borderColor: '#E91E63', borderRadius: 5 }}>
                                <Text style={{ color: '#E91E63' }}>
                                    Delete Account
                                </Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
    loadingView = () => {
        if (this.props.users.isLoading === true) {
            return (
                <View style={{ alignSelf: 'center' }}>
                    <ActivityIndicator size="small" color="#00ff00" />
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{ marginLeft: 33, fontSize: 15, color: '#03A9F4', fontWeight: 'bold', fontFamily: 'notoserif' }}>
                        {this.props.users.location.location}</Text>
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(SettingsView)

const styles = StyleSheet.create({
    textTitle: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    textSubTitle: {
        fontWeight: 'bold',
        fontSize: 13,
        fontFamily: 'sans-serif-thin',
        marginLeft: 5,
        color: '#9e9e9e',
    }
})
