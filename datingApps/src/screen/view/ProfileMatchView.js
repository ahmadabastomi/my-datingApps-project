import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, Image, FlatList, StyleSheet } from 'react-native'
import {
    Container,
    Content,
    Form,
    Item,
    Label,
    Input,
    Textarea,
    Text,
    Button,
    View,
    Icon
} from 'native-base'

class ProfileMatchView extends Component {
    constructor(props) {
        super(props)
        const { item, index } = props.navigation.state.params
        this.state = {
            profile: item,
            index: index
        }
    }
    static navigationOptions = {
        title: 'Profile Friend Match'
    }
    _keyExtractor = (item, index) => item.id.toString()
    render() {
        const { profile } = this.state
        return (
            <Container>
                <Content>
                    <View style={{ marginLeft: 0 }}>
                        <View style={{ alignSelf: 'center', marginTop: 30 }}>
                            <Image source={{ uri: `http://192.168.43.229:3335/api/v1/get_image/${profile.avatar}` }}
                                style={{ width: 150, height: 150, borderRadius: 75 }}
                            />
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 15 }}>
                            <Text style={{ fontSize: 25 }}>{profile.name}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 15, flexDirection: 'row' }}>
                            <Icon type='FontAwesome5' name='map-marker-alt'
                                style={{ fontSize: 16, color: '#BDBDBD' }}
                            />
                            <Text style={{ marginLeft: 10 }}>{this.props.images.locmatch[this.state.index].location}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 5, flexDirection: 'row' }}>
                            <Icon type='AntDesign' name='instagram'
                                style={{ fontSize: 18, color: '#BDBDBD' }}
                            />
                            <Text style={{ marginLeft: 10 }}>{profile.account_social_media}</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ marginLeft: 15 }}>{profile.about_me}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            style={{ backgroundColor: '#e0e0e0' }}
                            data={this.props.images.imagematch[this.state.index]}
                            keyExtractor={this._keyExtractor}
                            refreshing={this.props.images.isLoading}
                            //onRefresh={this.getData}
                            numColumns={3}
                            horizontal={false}
                            renderItem={({ item, index }) => (
                                <View style={styles.viewParent}>
                                    <View style={{ justifyContent: 'center', paddingTop: 0, paddingLeft: 0 }}>
                                        <Image source={{ uri: `http://192.168.43.229:3335/api/v1/get_image/${item.image}` }}
                                            style={{ width: 112, height: 150, alignSelf: 'center' }} />
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        images: state.images
    }
}
export default connect(mapStateToProps)(ProfileMatchView)

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