import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fire from '../Fire'
import firebase from 'firebase'
import '@firebase/firestore';


export default class ProfileScreen extends Component {
    state = {
        user: {}
    }

    unsubscribe = null;

    componentDidMount() {
        // const user = this.props.uid || Fire.shared.uid;
        // this.unsubscribe = Fire.shared.firestore
        //     .collection("users")
        //     .doc(user)
        //     // .onSnapshot(doc => {
        //     //     console.log(doc.data())
        //     //     this.setState({ user: doc.data() })
        //     // })
        //     .then(doc => {
        //         console.log(doc.data())
        //         this.setState({ user: doc.data() })
        //     })
        const email = firebase.auth().currentUser.email
        const ref = firebase.firestore().collection('users').doc(email)
        ref.get().then((doc) => {
            //console.log(doc.data())
            this.setState({ user: doc.data() })
            console.log(this.state.user);
        })
    }

    // componentWillUnmount() {
    //     this.unsubscribe();
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 64, alignItems: "center" }}>
                    <View style={styles.avatarContainer}>
                        <ImageBackground source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.state} >
                        <Text style={styles.statAmount}>21</Text>
                        <Text style={styles.statTite}>Posts</Text>
                    </View>
                    <View style={styles.state} >
                        <Text style={styles.statAmount}>211</Text>
                        <Text style={styles.statTite}>Followers</Text>
                    </View>
                    <View style={styles.state} >
                        <Text style={styles.statAmount}>63</Text>
                        <Text style={styles.statTite}>Following</Text>
                    </View>
                </View>
                <Button onPress={() => {
                    console.log('djfgjg')
                    console.log(this.props.navigation.navigate("Chat",
                        {
                            sender: firebase.auth().currentUser.email
                            , reciever: this.state.user.email
                        }))
                }} title="Log Out" />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: 'bold'
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "bold"
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 4
    }
})