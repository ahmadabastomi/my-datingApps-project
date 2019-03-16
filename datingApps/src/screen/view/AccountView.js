import React, { Component } from 'react'
import { Image, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import {
    Container, Content,
    View, Text, Icon, Toast, Button
} from 'native-base'
import Swiper from 'react-native-swiper'

import { patchProfile, patchProfilePhoto, getAvatar } from '../../publics/redux/actions/users'


class AccountView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar_image: props.users.avatar
        }
    }
    moveSettings() {
        this.props.navigation.navigate('SettingsView')
    }
    moveEditInfo() {
        this.props.navigation.navigate('InfoView')
    }

    async patchProfile() {
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        const options = {
            title: 'Change Avatar',

            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }
        ImagePicker.showImagePicker(options, async (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);

            } else {
                var formData = new FormData()
                formData.append('path', {
                    name: response.fileName,
                    type: response.type,
                    uri: response.uri
                })
                formData.append('fileName', response.fileName)
                await this.props.dispatch(patchProfilePhoto(Number(val_id), val_token,
                    formData
                ))
                await Toast.show({
                    text: "Success Update Photo Profile",
                    position: "top",
                    type: 'success',
                    textStyle: { textAlign: 'center' }
                })
            }
        });
    }
    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
                <Content>
                    <View style={{ marginTop: 30, flexDirection: 'column' }}>
                        <Image source={{ uri: this.props.users.avatar }}
                            style={{ alignSelf: 'center', width: 120, height: 120, borderRadius: 120 }}
                        />
                        <View style={{ alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.props.users.profile.name},</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}> 22</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => this.moveSettings()}
                                    >
                                        <View style={{ marginLeft: 30, backgroundColor: '#BDBDBD', width: 50, height: 50, borderRadius: 50 }}>
                                            <Icon type='SimpleLineIcons' name='settings' style={{ color: 'white', alignSelf: 'center', marginTop: 13, fontSize: 22 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: 25, color: '#BDBDBD', marginTop: 10, fontSize: 15 }}>SETTINGS</Text>
                                </View>
                                <View style={{ marginLeft: 160 }}>
                                    <TouchableOpacity
                                        onPress={() => this.moveEditInfo()}
                                    >
                                        <View style={{ marginLeft: 35, backgroundColor: '#BDBDBD', width: 50, height: 50, borderRadius: 50 }}>
                                            <Icon type='MaterialIcons' name='edit' style={{ color: 'white', alignSelf: 'center', marginTop: 13, fontSize: 22 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: 28, color: '#BDBDBD', marginTop: 10, fontSize: 15 }}>EDIT INFO</Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: 120, marginTop: -50 }}>
                                <View style={{ marginLeft: 23, backgroundColor: '#E91E63', width: 75, height: 75, borderRadius: 75 }}>
                                    <TouchableOpacity
                                        onPress={() => this.patchProfile()}
                                    >
                                        <Icon type='FontAwesome' name='camera' style={{ color: 'white', alignSelf: 'center', marginTop: 25 }} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ marginLeft: 13, color: '#BDBDBD', marginTop: 10, fontSize: 15 }}>CHANGE AVATAR</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Swiper style={{ width: '100%', height: 200, flex: 0 }}
                                activeDotColor='#E91E63'
                                autoplay={true}

                            >
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ alignSelf: 'center', marginTop: 20, fontFamily: 'sans-serif-condensed', color: '#E91E63' }}>Lets Join Gold Member</Text>
                                    <Button rounded bordered style={{ marginTop: 50, borderColor: '#E91E63' }}>
                                        <Text style={{ color: '#E91E63' }}>Get Gold Member</Text>
                                    </Button>
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ alignSelf: 'center', marginTop: 20, fontFamily: 'sans-serif-condensed', color: '#E91E63' }}>Lets Get Unlimited Access</Text>
                                    <Button rounded bordered style={{ marginTop: 50, borderColor: '#E91E63' }}>
                                        <Text style={{ color: '#E91E63' }}>Get Unlimited Access</Text>
                                    </Button>
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ alignSelf: 'center', marginTop: 20, fontFamily: 'sans-serif-condensed', color: '#E91E63' }}>Lets Join Premium Member</Text>
                                    <Button rounded bordered style={{ marginTop: 50, borderColor: '#E91E63' }}>
                                        <Text style={{ color: '#E91E63' }}>Get Premium Member</Text>
                                    </Button>
                                </View>
                            </Swiper>
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
export default connect(mapStateToProps)(AccountView)