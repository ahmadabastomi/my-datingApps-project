import React, { Component } from 'react'
import { TextInput, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
    Container, Content,
    View, Text, Icon, Button, Toast
} from 'native-base'

import { patchProfile } from '../../publics/redux/actions/users'

class PhoneNumberSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone_number: props.users.profile.phone_number
        }

    }
    static navigationOptions = {
        title: 'Phone Number Settings'
    }

    async patchProfile() {
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        Alert.alert(
            '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tConfirm',
            `Are you sure you want change phone number?`,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        try {
                            await this.props.dispatch(patchProfile(Number(val_id), val_token,
                                {
                                    phone_number: this.state.phone_number
                                }))
                            Toast.show({
                                text: "Success Update Phone Number",
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
                        <Text style={{ fontWeight: 'bold' }}>Phone Number</Text>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 10, }}>
                            <TextInput
                                placeholder=' Add Job Company'
                                style={{ backgroundColor: 'white', borderRadius: 10, marginLeft: 10, fontSize: 16 }}
                                onChangeText={(phone_number) => this.setState({ phone_number })}
                                value={this.state.phone_number}
                            />
                        </View>
                        <Text style={{ marginTop: 10, color: '#9E9E9E', fontSize: 14 }}>Verified Phone Number</Text>
                        <View style={{ marginTop: 20 }}>
                            <Button block bordered style={{ borderRadius: 10, borderColor: '#E91E63', backgroundColor: 'white' }}
                                onPress={() => this.patchProfile()}
                            >
                                <Text style={{ color: '#E91E63' }}>Update My Phone Number</Text>
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
export default connect(mapStateToProps)(PhoneNumberSettings)