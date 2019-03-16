import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextInput, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import {
    Container, Content, Text, View,
    Icon, Button, Toast
} from 'native-base'

import { postLogin, getLocation } from '../../publics/redux/actions/users'
import { getImages, getMatch } from '../../publics/redux/actions/images'

class LoginView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            gender: '',
        }
    }
    static navigationOptions = {
        header: null
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

    async loginAuth() {
        try {
            await this.props.dispatch(postLogin({
                email: this.state.email,
                password: this.state.password
            }))
            if (this.props.users.data.message == undefined) {
                await this.props.dispatch(getLocation(this.props.users.data.id, this.props.users.data.token))
                const tmp = this.props.users.profile.gender
                await this.checkGender(tmp)
                await this.props.dispatch(getImages(this.props.users.data.id, this.props.users.location.location, this.props.users.data.token, this.state.gender))
                await this.props.dispatch(getMatch(this.props.users.data.id, this.props.users.data.token))
                await AsyncStorage.setItem('id', (this.props.users.data.id).toString())
                await AsyncStorage.setItem('token', this.props.users.data.token)
                Toast.show({
                    text: 'Login Success',
                    position: "top",
                    type: "success",
                    textStyle: { textAlign: 'center' }

                })
                this.moveMainPage()
            }
            else {
                Toast.show({
                    text: 'Wrong Username or Password',
                    position: "top",
                    type: "danger",
                    textStyle: { textAlign: 'center' }

                })
            }
        } catch (error) {
            Toast.show({
                text: 'Wrong Username or Password',
                position: "top",
                type: "danger",
                textStyle: { textAlign: 'center' }

            })
        }
    }

    moveRegisterPage() {
        this.props.navigation.navigate('RegisterView')
    }
    moveMainPage() {
        this.props.navigation.navigate('TabScreen')
    }
    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
                <Content>
                    <View style={styles.contentView}>
                        <View>
                            <Text style={{ fontSize: 20, color: '#E91E63' }}>Sign In</Text>
                        </View>
                        <View style={styles.formView}>
                            <Icon type='AntDesign' name='mail'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Email'
                                style={styles.inputStyle}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='SimpleLineIcons' name='lock'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Password'
                                secureTextEntry={true}
                                style={styles.inputStyle}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button block rounded style={{ backgroundColor: '#E91E63' }}
                                onPress={() => this.loginAuth()}
                            >
                                <Text>SIGN IN</Text>
                            </Button>
                        </View>
                        <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center' }}>
                            <Text style={styles.textSub}>Don't Have an Account? </Text>
                            <Text style={styles.textSub2}
                                onPress={() => this.moveRegisterPage()}
                            >Sign Up</Text>
                        </View>
                    </View>
                </Content>
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(LoginView)

const styles = StyleSheet.create({
    contentView: {
        marginLeft: 20,
        marginTop: 60,
        flexDirection: 'column',
        width: 300
    },
    formView: {
        flexDirection: 'row',
        paddingTop: 20,
        borderBottomWidth: 0.5,
        borderColor: '#BDBDBD',
        paddingLeft: 5
    },
    iconStyle: {
        paddingTop: 15,
        color: '#BDBDBD',
        fontSize: 18
    },
    inputStyle: {
        width: 300,
        marginLeft: 10,
        fontSize: 15
    },
    textSub: {
        fontSize: 14,
        color: '#E91E63'
    },
    textSub2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#E91E63'
    }

})
