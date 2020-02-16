import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Fire from '../Fire';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'
import UserPermissions from '../utilities/UserPermission';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null 
    };

    state = {
        user: {
            name: "",
            email: "",
            password: "",
            avatar: null
        },
        errorMessage: null
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if ( !result.cancelled ) {
            this.setState({ user: { ...this.state.user, avatar: result.uri }});
        }
    }

    handleSignUp = () => {
        Fire.shared.createUser(this.state.user)
    }

    render() {
        return (
            <View styles={styles.container}>
            <StatusBar barStyle = "light-content"></StatusBar>


                <View style = {{ position: "absolute", top: 32, alignItems: "center", width: "100%"}}>
                    <Text style={styles.greeting}>{`Hello \n Sign Up Here`}</Text>

                    <TouchableOpacity style = {styles.avatarPlaceHolder} onPress = {this.handlePickAvatar}>
                        <Image source = {{uri: this.state.user.avatar}} style = {styles.avatar} />
                        <Ionicons
                            name = "ios-add"
                            size = {40}
                            color = "#FFF"
                            style = {{marginTop: 6, marginLeft: 2}}>
                        </Ionicons>
                    </TouchableOpacity>

                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                    <Text style={styles.error}>{this.state.errorMessage}</Text>
                    )}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({ user: { ...this.state.user , name} })}
                            value={this.state.user.name}
                        ></TextInput>
                    </View>

                    <View style = {styles.fieldStyle}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({  user: { ...this.state.user , email} })}
                            value={this.state.user.email}
                        ></TextInput>
                    </View>

                    <View style={styles.fieldStyle}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({  user: { ...this.state.user , password} })}
                            value={this.state.user.password}
                        ></TextInput>
                    </View>

                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}> Sign Up </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.newSignUpText} onPress = {() => this.props.navigation.navigate("Login")}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                    Already on OneML ?  
                        <Text style={{ fontWeight: "400", color: "#E9446A"}}>
                        Login 
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "800",
        textAlign: "center"
    },
    form: {
        marginTop: 250,
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 12,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    fieldStyle: {
        marginTop: 32
    },
    avatarPlaceHolder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50

    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "500"
    },
    newSignUpText: {
        alignSelf: "center",
        marginTop: 32
    }
});
