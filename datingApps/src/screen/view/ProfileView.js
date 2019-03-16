import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextInput, StyleSheet, StatusBar } from 'react-native'
import {
    Container, Content, Text, View,
    Icon, Button, Toast, DatePicker
} from 'native-base'

import { postUser, getUser, postProfile, postLocation } from '../../publics/redux/actions/users'
class ProfileView extends Component {

    constructor(props) {
        super(props)
        const { username, email, password } = props.navigation.state.params
        this.state = {
            username: username,
            email: email,
            password: password,
            name: '',
            gender: '',
            birth_date: '',
            phone_number: '',
            job_title: '',
            job_company: '',
            school: '',
            account_social_media: '',
            location: '',
            chosenDate: new Date()
        }
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    static navigationOptions = {
        header: null
    }
    async addUser() {
        try {
            await this.props.dispatch(postUser({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }))
        } catch (e) {
            console.error(e)
        }
    }
    async addProfile() {
        await this.props.dispatch(getUser(this.state.email))
        await this.props.dispatch(postProfile({
            user_id: this.props.users.key.id,
            name: this.state.name,
            gender: this.state.gender,
            birth_date: this.state.chosenDate.toString().substr(4, 12),
            phone_number: this.state.phone_number,
            job_title: this.state.job_title,
            job_company: this.state.job_company,
            school: this.state.school,
            account_social_media: this.state.account_social_media,
            about_me: 'Hello I Like Meet New Friends',
            avatar: 'https://www.gundemkibris.com/images/album/115_1.jpg',
        }))
        Toast.show({
            text: 'Your Account Has Been Registered Successfully',
            type: 'success',
            position: 'top',
            duration: 3000,
            textStyle: { textAlign: 'center' }
        })
        this.props.navigation.navigate('LoginView')
    }
    async addLocation() {
        await this.props.dispatch(postLocation({
            user_id: this.props.users.key.id,
            location: this.state.location
        }))
    }
    async addAccount() {
        await this.addUser()
        await this.addProfile()
        await this.addLocation()
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
                            <Text style={{ fontSize: 20, color: '#E91E63' }}>ADD PROFILE</Text>
                        </View>
                        <View style={styles.formView}>
                            <Icon type='MaterialIcons' name='person-outline'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Name'
                                style={styles.inputStyle}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='MaterialCommunityIcons' name='gender-male-female'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Gender'
                                style={styles.inputStyle}
                                onChangeText={(gender) => this.setState({ gender })}
                                value={this.state.gender}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='MaterialIcons' name='date-range'
                                style={styles.iconStyle}
                            />
                            {/* <TextInput
                                placeholder='Date of Birth'
                                style={styles.inputStyle}
                                onChangeText={(birth_date) => this.setState({ birth_date })}
                                value={this.state.birth_date}
                            /> */}
                            <DatePicker
                                defaultDate={new Date(2019, 3, 4)}
                                minimumDate={new Date(1950, 1, 1)}
                                maximumDate={new Date(2019, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "black" }}
                                placeHolderTextStyle={{ color: "#9E9E9E", fontSize: 14 }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                            {/* <Text>
                                Date: {this.state.chosenDate.toString().substr(4, 12)}
                            </Text> */}
                        </View>
                        <View style={styles.formView}>
                            <Icon type='EvilIcons' name='location'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Location'
                                style={styles.inputStyle}
                                onChangeText={(location) => this.setState({ location })}
                                value={this.state.location}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='FontAwesome' name='mobile-phone'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Phone Number'
                                style={styles.inputStyle}
                                onChangeText={(phone_number) => this.setState({ phone_number })}
                                value={this.state.phone_number}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='Entypo' name='man'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Job Title'
                                style={styles.inputStyle}
                                onChangeText={(job_title) => this.setState({ job_title })}
                                value={this.state.job_title}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='Entypo' name='briefcase'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Job Company'
                                style={styles.inputStyle}
                                onChangeText={(job_company) => this.setState({ job_company })}
                                value={this.state.job_company}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='FontAwesome5' name='school'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='School'
                                style={styles.inputStyle}
                                onChangeText={(school) => this.setState({ school })}
                                value={this.state.school}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Icon type='AntDesign' name='instagram'
                                style={styles.iconStyle}
                            />
                            <TextInput
                                placeholder='Media Social'
                                style={styles.inputStyle}
                                onChangeText={(account_social_media) => this.setState({ account_social_media })}
                                value={this.state.account_social_media}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button block rounded style={{ backgroundColor: '#E91E63' }}
                                onPress={() => this.addAccount()}
                            >
                                <Text>FINISH SIGN UP</Text>
                            </Button>
                        </View>
                        <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center', paddingBottom: 20 }}>
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
export default connect(mapStateToProps)(ProfileView)

const styles = StyleSheet.create({
    contentView: {
        marginLeft: 20,
        marginTop: 20,
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
