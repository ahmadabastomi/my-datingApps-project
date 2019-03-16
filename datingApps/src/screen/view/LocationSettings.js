import React, { Component } from 'react'
import { TextInput, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
    Container, Content,
    View, Text, Icon, Button, Toast
} from 'native-base'

import { patchLocation } from '../../publics/redux/actions/users'

class LocationSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: props.users.location.location
        }

    }
    static navigationOptions = {
        title: 'Change Location'
    }

    async patchLocation() {
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        Alert.alert(
            '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tConfirm',
            `Are you sure you want change location?`,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        try {
                            await this.props.dispatch(patchLocation(Number(val_id), val_token,
                                {
                                    location: this.state.location
                                }))
                            Toast.show({
                                text: "Success Change Location",
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
                <Content style={{ backgroundColor: '#eff1f4' }}>
                    <View style={{ marginTop: 10, marginLeft: 15, marginRight: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>Your Location</Text>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 10, }}>
                            <TextInput
                                placeholder=' Add Job Company'
                                style={{ backgroundColor: 'white', borderRadius: 10, marginLeft: 10, fontSize: 16 }}
                                onChangeText={(location) => this.setState({ location })}
                                value={this.state.location}
                            />
                        </View>
                        <Text style={{ marginTop: 10, color: '#9E9E9E', fontSize: 14 }}>*Fill your new location</Text>
                        <View style={{ marginTop: 20 }}>
                            <Button block bordered style={{ borderRadius: 10, borderColor: '#E91E63', backgroundColor: 'white' }}
                                onPress={() => this.patchLocation()}
                            >
                                <Text style={{ color: '#E91E63' }}>Update My Location</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(LocationSettings)