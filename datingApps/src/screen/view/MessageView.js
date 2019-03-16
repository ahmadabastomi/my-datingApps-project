import React, { Component } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import {
    Container, Content,
    View, Text, List, ListItem, Left, Body, Right, Thumbnail
} from 'native-base'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'

class MessageView extends Component {
    constructor(props) {
        super(props)
    }

    _keyExtractor = (item, index) => item.id.toString()


    render() {
        const { myMatch } = this.props.images
        //console.warn(myMatch)
        return (
            <Container>
                <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
                <Content>
                    <View style={{ marginTop: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, fontFamily: 'monospace', color: "#E91E63" }}>New Match</Text>
                        </View>
                        <View>
                            <List>
                                <FlatList
                                    data={myMatch}
                                    keyExtractor={this._keyExtractor}
                                    refreshing={this.props.images.isLoading}
                                    //onRefresh={this.getData}
                                    renderItem={({ item, index }) => (
                                        <ListItem avatar
                                            onPress={() => this.props.navigation.navigate('ProfileMatchView', { item, index })}
                                        >
                                            <Left>
                                                <Thumbnail source={{ uri: `http://192.168.43.229:3335/api/v1/get_image/${item.avatar}` }} />
                                            </Left>
                                            <Body>
                                                <Text>{item.name}</Text>
                                                <Text note>{item.name} match with you, lets see her profile..</Text>
                                            </Body>
                                            <Right>
                                                <Text note>3:43 pm</Text>
                                            </Right>
                                        </ListItem>
                                    )} />
                            </List>
                        </View>
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
export default connect(mapStateToProps)(MessageView)
