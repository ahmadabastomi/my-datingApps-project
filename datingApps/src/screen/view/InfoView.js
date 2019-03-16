import React, { Component } from 'react'
import { Image, FlatList, StyleSheet, TouchableOpacity, TextInput, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
    Container, Content,
    View, Text, Icon, Textarea, Button,
    ListItem, Left, Right, Radio, Toast
} from 'native-base'
import { StatusBar } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import { patchProfile } from '../../publics/redux/actions/users'
import { postImage, deleteImage, getTmpImage, uploadImage } from '../../publics/redux/actions/images'

class InfoView extends Component {
    constructor(props) {
        super(props)
        const { profile } = props.users
        this.state = {
            about_me: profile.about_me,
            job_title: profile.job_title,
            job_company: profile.job_company,
            school: profile.school,
            gender: profile.gender,
        }

    }
    static navigationOptions = {
        title: 'Edit Profile'
    }
    _keyExtractor = (item, index) => item.id.toString()

    async patchProfile() {
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        await this.props.dispatch(patchProfile(Number(val_id), val_token,
            {
                about_me: this.state.about_me,
                job_title: this.state.job_title,
                job_company: this.state.job_company,
                school: this.state.school,
                gender: this.state.gender,
            }))
        Toast.show({
            text: "Success Update Profile",
            position: "top",
            type: 'success',
            textStyle: { textAlign: 'center' }
        })
    }

    handleChoosePhoto = async () => {
        const options = {
            noData: true,
        }
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                var formData = new FormData()
                formData.append('path', {
                    name: response.fileName,
                    type: response.type,
                    uri: response.uri
                })
                formData.append('fileName', response.fileName)
                formData.append('user_id', Number(val_id))
                this.props.dispatch(uploadImage(Number(val_id), val_token, formData))
                Toast.show({
                    text: "Success Add Photo",
                    position: "top",
                    type: 'success',
                    textStyle: { textAlign: 'center' }
                })
            }
        })
    }

    async deleteImage(id_image) {
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        Alert.alert(
            '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tConfirm',
            `Are you sure you want to delete this photo`,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        try {
                            await this.props.dispatch(deleteImage(Number(val_id), val_token, id_image))
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

    async getUploadImage() {
        await this.props.dispatch(getTmpImage(this.props.images.myImage))
    }

    async componentWillMount() {
        await this.getUploadImage()
        // console.warn(this.props.images.myImageUpload)
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
                <Content style={{ backgroundColor: '#eff1f4' }}>
                    <FlatList
                        style={{ backgroundColor: '#e0e0e0' }}
                        data={this.props.images.myImage}
                        keyExtractor={this._keyExtractor}
                        refreshing={this.props.images.isLoading}
                        //onRefresh={this.getData}
                        numColumns={3}
                        horizontal={false}
                        renderItem={({ item, index }) => (
                            <View style={styles.viewParent}>
                                <View style={{ justifyContent: 'center', paddingTop: 0, paddingLeft: 0 }}>
                                    <Image source={{ uri: this.props.images.myImageUpload[index] }}
                                        style={{ width: 115, height: 140, alignSelf: 'center' }} />
                                    <View style={{ marginLeft: 85, marginTop: -28, backgroundColor: 'red', borderRadius: 100 }}>
                                        <TouchableOpacity
                                            onPress={() => this.deleteImage(item.id)}
                                        >
                                            <Icon type='Entypo' name='circle-with-cross' style={{ color: 'white', alignSelf: 'center' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    <View style={{ backgroundColor: 'white' }}>
                        <Button block bordered style={{ borderColor: '#E91E63' }}
                            onPress={() => this.handleChoosePhoto()}
                        >
                            <Text style={{ color: '#E91E63' }}>ADD PHOTO</Text>
                        </Button>
                    </View>
                    <View style={{ backgroundColor: '#eff1f4' }}>
                        <View style={{ marginTop: 10, marginLeft: 15, marginRight: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>About</Text>
                            <Textarea placeholder='About You' placeholderTextColor='#9e9e9e'
                                style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}
                                onChangeText={(about_me) => this.setState({ about_me })}
                                value={this.state.about_me}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 15, marginRight: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Job Title</Text>
                            <TextInput
                                placeholder=' Add Job Title'
                                style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}
                                onChangeText={(job_title) => this.setState({ job_title })}
                                value={this.state.job_title}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 15, marginRight: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Job Company</Text>
                            <TextInput
                                placeholder=' Add Job Company'
                                style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}
                                onChangeText={(job_company) => this.setState({ job_company })}
                                value={this.state.job_company}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 15, marginRight: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>School</Text>
                            <TextInput
                                placeholder=' Add School'
                                style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}
                                onChangeText={(school) => this.setState({ school })}
                                value={this.state.school}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 15, marginRight: 20, }}>
                            <Text style={{ fontWeight: 'bold' }}>Gender</Text>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 10 }}>
                                <ListItem style={{ borderBottomWidth: 0 }}>
                                    <Left>
                                        <Text>Man</Text>
                                    </Left>
                                    <Right>
                                        <Radio
                                            onPress={() => this.setState({ gender: 'man' })}
                                            selected={this.state.gender == 'man'}
                                            color={"#E91E63"}
                                            selectedColor={"#E91E63"}
                                        />
                                    </Right>
                                </ListItem>
                                <ListItem style={{ borderBottomWidth: 0 }}>
                                    <Left>
                                        <Text>Woman</Text>
                                    </Left>
                                    <Right>
                                        <Radio
                                            onPress={() => this.setState({ gender: 'woman' })}
                                            selected={this.state.gender == 'woman'}
                                            color={"#E91E63"}
                                            selectedColor={"#E91E63"}
                                        />
                                    </Right>
                                </ListItem>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 15, marginRight: 20, marginBottom: 10 }}>
                        <Button block bordered style={{ borderColor: '#E91E63', borderRadius: 10, backgroundColor: 'white' }}
                            onPress={() => this.patchProfile()}
                        >
                            <Text style={{ color: '#E91E63' }}>SAVE</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        images: state.images,
    }
}
export default connect(mapStateToProps)(InfoView)

const styles = StyleSheet.create({
    viewParent: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 10,
        borderBottomWidth: 2.25,
        borderRightWidth: 2.25,
        borderLeftWidth: 2.25,
        borderTopWidth: 2.25,
        borderBottomColor: '#CFD8DC',
        borderTopColor: '#CFD8DC',
        borderRightColor: '#CFD8DC',
        borderLeftColor: '#CFD8DC',
        flexBasis: '33.3335333%',
    }
})
