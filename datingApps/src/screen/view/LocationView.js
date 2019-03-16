import React, { Component } from 'react'
import { Image } from 'react-native'
import {
    Container, Content,
    View, Text, Button
} from 'native-base'
import { StatusBar } from 'react-native'
//import Geocoder from 'react-native-geocoding'
import Geocoder from 'react-native-geocoder'

export default class LocationView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            city: null
        }
    }

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
        this.setState({
            city: res[0].subAdminArea
        })

    }

    // getData() {
    //     var NY = {
    //         lat: this.state.latitude,
    //         lng: this.state.longitude
    //     }
    //     Geocoder.geocodePosition(NY).then(res => {
    //         console.warn(res)
    //     })
    //         .catch(err => console.log(err))
    // }
    render() {
        //console.warn(this.state)
        return (
            <Container>
                <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
                <Content>
                    <View style={{ alignSelf: 'center', marginTop: 100 }}>
                        <Button block
                            onPress={() => this.getData()}
                        >
                            <Text>GET DESCRIPTION LOCATION</Text>
                        </Button>
                        <Button block
                            onPress={() => this.getLocation()}
                        >
                            <Text>GET MY LOCATION</Text>
                        </Button>
                    </View>
                    <View style={{ marginTop: 40, alignSelf: 'center' }}>
                        <Text>Latitude: {this.state.latitude}</Text>
                        <Text>Longitude: {this.state.longitude}</Text>
                        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                    </View>
                    <View style={{ marginTop: 30, alignSelf: 'center' }}>
                        <Text>Kota: {this.state.city}</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}
