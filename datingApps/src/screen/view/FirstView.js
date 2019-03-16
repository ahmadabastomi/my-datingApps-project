import React, { Component } from 'react'
import { StyleSheet, Image, StatusBar } from 'react-native'
import {
    Text, View,
    Container, Content,
    Button,
} from 'native-base'
import Swiper from 'react-native-swiper'
export default class FirstView extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null
    }
    moveLoginPage() {
        this.props.navigation.navigate('LoginView')
    }
    moveRegisterPage() {
        this.props.navigation.navigate('RegisterView')
    }


    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
                <Content>
                    <View style={{ marginLeft: 30, marginRight: 30 }}>
                        <Swiper style={styles.slide} showsButtons={false} autoplay={true}>
                            <View style={styles.headerTitle}>
                                <Text style={styles.textTitle}>Discover new and interesting people nearby</Text>
                                <View style={styles.viewImage}>
                                    <Image source={{ uri: 'https://res.cloudinary.com/he2ebbhcc/image/upload/c_fill,f_auto,g_center,h_500,w_500/v1502100517/4534.jpg' }}
                                        style={styles.image} />
                                </View>
                            </View>
                            <View style={styles.headerTitle}>
                                <Text style={styles.textTitle}>Swipe Right to like someone or Swipe Left to pass</Text>
                                <View style={styles.viewImage}>
                                    <Image source={{ uri: 'http://images6.fanpop.com/image/photos/37300000/Miss-A-Suzy-Marie-Claire-Magazine-August-Issue-baek-suzy-37348000-1625-2048.jpg' }}
                                        style={styles.image} />
                                </View>
                            </View>
                            <View style={styles.headerTitle}>
                                <Text style={styles.textTitle}>If they also Swipe Right, It's a Match!</Text>
                                <View style={styles.viewImage}>
                                    <Image source={{ uri: 'https://i.pinimg.com/originals/52/9c/a8/529ca8a34e2228880916fb77494884e3.jpg' }}
                                        style={styles.image} />
                                </View>
                            </View>
                            <View style={styles.headerTitle}>
                                <Text style={styles.textTitle}>Only people you've matched with can mesaage you</Text>
                                <View style={styles.viewImage}>
                                    <Image source={{ uri: 'https://pbs.twimg.com/media/DEU5uOzUwAEOcVr.jpg' }}
                                        style={styles.image} />
                                </View>
                            </View>
                        </Swiper>
                        <View>
                            <Text style={styles.textSub}>By tapping Log In, you agree with our</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.textSub2}>Terms of Service </Text>
                            <Text style={styles.textSub}>and </Text>
                            <Text style={styles.textSub2}>Privacy Policy</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Button block rounded style={{ backgroundColor: '#E91E63' }}
                                onPress={() => this.moveLoginPage()}
                            >
                                <Text>LOG IN</Text>
                            </Button>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Button block bordered rounded style={{ borderColor: '#E91E63' }}
                                onPress={() => this.moveRegisterPage()}
                            >
                                <Text style={{ color: '#E91E63' }}>SIGN UP</Text>
                            </Button>
                        </View>
                        <View>
                            <Text style={styles.textSub3}>Trouble Logging in?</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 23,
        textAlign: 'center',
        fontFamily: 'sans-serif-thin',
    },
    slide: {
        marginTop: 15,
        width: 300,
        height: 410,
        flex: 0,
        alignSelf: 'center',
    },
    viewImage: {
        width: 200,
        height: 310,
        alignSelf: 'center',
        marginTop: 20
    },
    image: {
        width: 200,
        height: 285,
        alignSelf: 'center',
        borderRadius: 20,
    },
    textSub: {
        fontSize: 13,
        color: '#BDBDBD',
        textAlign: 'center'
    },
    textSub2: {
        fontSize: 13,
        color: '#BDBDBD',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    textSub3: {
        fontSize: 13,
        color: '#00796B',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 10
    }

})
