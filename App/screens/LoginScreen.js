import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () => {
    const { email, password } = this.state;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        return (
            <View styles={styles.container}>
                <StatusBar barStyle = "light-content"></StatusBar>
                <Text style={styles.greeting}>{`Hello again. \n Welcome back.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                    <Text style={styles.error}>{this.state.errorMessage}</Text>
                    )}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={styles.passwordStyle}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}> Sign In </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.newSignUpText} onPress = {() => this.props.navigation.navigate("Register")}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                    New to OneML ?
                        <Text style={{ fontWeight: "400", color: "#E9446A" }}>
                            Sign Up
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
    passwordStyle: {
        marginTop: 32
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
