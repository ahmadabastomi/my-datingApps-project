import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimensions, TextInput, StyleSheet, StatusBar } from 'react-native'
import {
    Container, Content, Text, View,
    Icon, Button, Toast, Right
} from 'native-base'

class RegisterView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
        }
    }
    static navigationOptions = {
        header: null
    }

    async moveProfilePage() {
        if (this.state.password1 == this.state.password2) {
            this.props.navigation.navigate('ProfileView',
                {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password2,
                })
        } else {
            Toast.show({
                text: 'Wrong Input Password',
                type: 'warning',
                position: 'top',
                duration: 3000,
                textStyle: { textAlign: 'center' }
            })
        }

    }
    moveLoginPage() {
        this.props.navigation.navigate('LoginView')
    }
    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
                <Content>
                    <View style={styles.contentView}>
                        <View>
                            <Text style={{ fontSize: 20, color: '#E91E63' }}>Sign Up</Text>
                        </View>
                        <View style={styles.formView}>
                            <Icon type='MaterialIcons' name='person-outline'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Username'
                                style={styles.inputStyle}
                                onChangeText={(username) => this.setState({ username })}
                                value={this.state.username}
                            />
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
                                onChangeText={(password1) => this.setState({ password1 })}
                                value={this.state.password1}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='SimpleLineIcons' name='lock'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Retype Password'
                                secureTextEntry={true}
                                style={styles.inputStyle}
                                onChangeText={(password2) => this.setState({ password2 })}
                                value={this.state.password2}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button block rounded style={{ backgroundColor: '#E91E63' }}
                                onPress={() => this.moveProfilePage()}
                            >
                                <Text>NEXT STEP</Text>
                                <Icon name='ios-arrow-forward' style={{ marginLeft: -10 }} />
                            </Button>
                        </View>
                        <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center' }}>
                            <Text style={styles.textSub}>Have an Account? </Text>
                            <Text style={styles.textSub2}
                                onPress={() => this.moveLoginPage()}
                            >SIGN IN</Text>
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
export default connect(mapStateToProps)(RegisterView)

const styles = StyleSheet.create({
    contentView: {
        marginLeft: 20,
        marginTop: 40,
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
