import React, { Component } from 'react'
import { View, Container, Text, Icon } from 'native-base'
import { Dimensions, StatusBar, Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import { getProfile, getLocation, getAvatar } from '../../publics/redux/actions/users'
import { getImages, getMatch } from '../../publics/redux/actions/images'


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gender: ''
        }
    }
    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        setTimeout(() => {
            this.checkToken()
        }, 2500)
    }
    checkGender(gender) {
        if (gender === 'man') {
            this.setState({
                gender: 'woman'
            })
        } else if (gender === 'woman') {
            this.setState({
                gender: 'man'
            })
        }
    }

    async checkToken() {
        try {
            const val_token = await AsyncStorage.getItem('token')
            const val_id = await AsyncStorage.getItem('id')

            if (val_token != null) {
                await this.props.dispatch(getLocation(Number(val_id), val_token))
                await this.props.dispatch(getProfile(Number(val_id), val_token))
                await this.props.dispatch(getAvatar(this.props.users.profile.avatar))
                const tmp = this.props.users.profile.gender
                await this.checkGender(tmp)
                await this.props.dispatch(getImages(Number(val_id), this.props.users.location.location, val_token, this.state.gender))
                await this.props.dispatch(getMatch(Number(val_id), val_token))
                this.props.navigation.navigate('TabScreen')
            }
            else {
                this.props.navigation.navigate('FirstView')
            }
        } catch (e) {
            console.log(message.e)
        }
    }
    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#FDFDFD" barStyle="light-content" hidden={true} />
                <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, backgroundColor: '#FDFDFD' }}>
                    <View style={{ alignSelf: 'center', marginTop: 200 }}>
                        <Image source={require('../../../assets/logo.png')}
                            style={{ width: 200, height: 200 }}
                        />

                    </View>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(SplashScreen)