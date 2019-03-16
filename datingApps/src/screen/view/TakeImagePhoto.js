import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class TakeImagePhoto extends Component {
    state = {
        photo: null,
    };

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
                //console.warn(this.state.photo.uri)
            }
        })
    }

    handleTakePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchCamera(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    }



    render() {
        const { photo } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ width: 300, height: 300 }}
                    />
                )}
                <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                <Button title="Take Photo" onPress={this.handleTakePhoto} />

            </View>
        )
    }
}