import React, { Component } from 'react'
import { Image, Dimensions, Animated, StyleSheet, PanResponder, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import {
    View, Text, Icon,
} from 'native-base'
import { StatusBar } from 'react-native'

import { postLike } from '../../publics/redux/actions/images'

const SCREEN_HEIGHT = (Dimensions.get('window').height) - 50
const SCREEN_WIDTH = Dimensions.get('window').width

class DatingView extends Component {
    constructor() {
        super()

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0,
            like: 0,
            countDislikes: 0
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })
    }
    componentWillMount() {
        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: async (evt, gestureState) => {

                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                    //Post Like
                    const { data } = this.props.images
                    await this._likeHandler(data[this.state.currentIndex].id, data[this.state.currentIndex].user_id)
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                    //dislike
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
    }

    renderUsers = () => {
        const { data } = this.props.images
        return data.map((item, i) => {

            if (i < this.state.currentIndex) {
                return null
            }
            else if (i == this.state.currentIndex) {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

                        </Animated.View>
                        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={{ uri: this.props.images.allImagesUpload[i] }} />
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                        key={item.id} style={[{
                            opacity: this.nextCardOpacity,
                            transform: [{ scale: this.nextCardScale }],
                            height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
                        }]}>

                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
                        </Animated.View>

                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={{ uri: this.props.images.allImagesUpload[i] }} />
                    </Animated.View>
                )
            }
        }).reverse()
    }

    async _likeHandler(image_id, image_user) {
        const val_token = await AsyncStorage.getItem('token')
        const val_id = await AsyncStorage.getItem('id')
        let id = Number(val_id)
        await this.props.dispatch(postLike(id, val_token, {
            user_id: id,
            image_id: image_id,
            image_user: image_user,
            is_like: 'true',
        }))
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fafafa', backgroundColor: '#e0e0e0' }}>
                <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
                <View style={{ height: 0 }}>
                </View>
                <View style={{ flex: 1 }}>
                    {this.renderUsers()}

                </View>
                <View style={{ height: 60, backgroundColor: 'transparent' }}>
                    <View style={{ marginTop: -25, flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={{ backgroundColor: 'white', width: 50, height: 50, borderRadius: 150, borderWidth: 0.25, alignSelf: 'center', borderColor: '#e0e0e0', marginRight: 15 }}>
                            <Icon type='FontAwesome' name='rotate-left' style={{ alignSelf: 'center', marginTop: 10, color: '#ffca28' }} />
                        </View>
                        <View style={{ backgroundColor: 'white', width: 60, height: 60, borderRadius: 150, borderWidth: 0.25, alignSelf: 'center', borderColor: '#e0e0e0', marginRight: 5 }}>
                            <Icon type='Entypo' name='cross' style={{ alignSelf: 'center', marginTop: 10, color: '#e57373', fontSize: 40 }} />
                        </View>
                        <View style={{ backgroundColor: 'white', width: 50, height: 50, borderRadius: 150, borderWidth: 0.25, alignSelf: 'center', borderColor: '#e0e0e0', marginRight: 10, marginLeft: 10 }}>
                            <Icon type='FontAwesome' name='star' style={{ alignSelf: 'center', marginTop: 10, color: '#4fc3f7' }} />
                        </View>
                        <TouchableOpacity
                        >
                            <View style={{ backgroundColor: 'white', width: 60, height: 60, borderRadius: 150, borderWidth: 0.25, alignSelf: 'center', borderColor: '#e0e0e0', marginLeft: 5 }}>
                                <Icon type='AntDesign' name='heart' style={{ alignSelf: 'center', marginTop: 17, color: '#e57373' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'white', width: 50, height: 50, borderRadius: 150, borderWidth: 0.25, alignSelf: 'center', borderColor: '#e0e0e0', marginLeft: 15 }}>
                            <Icon name='ios-flash' style={{ alignSelf: 'center', marginTop: 10, color: '#4fc3f7' }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        images: state.images,
    }
}
export default connect(mapStateToProps)(DatingView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})