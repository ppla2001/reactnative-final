import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    console.log(this.props.errorMessageLogin);
    return (
      <View style={styles.container}>
        <Text style={styles.mainTxt}> Log in </Text>
        <TextInput
          style={styles.textField}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
        ></TextInput>
        <TextInput
          style={styles.textField}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        ></TextInput>
        <TouchableOpacity
          disabled={
            this.state.email.length === 0 || this.state.password.length === 0
              ? true
              : false
          }
          style={styles.btn}
          onPress={() =>
            this.props.login(this.state.email, this.state.password)
          }
        >
          <Text style={styles.btnTxt}> Log In</Text>
        </TouchableOpacity>
        <Text style={styles.txtError}>{this.props.errorMessageLogin}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.ultTxt}>No tengo cuenta, registrarme. </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: "center",
  },
  mainTxt: {
    flex: 3,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  textField: {
    height: 20,
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,
    flex: 5,
  },
  btn: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
    flex: 5,
    width: "90%",
    height: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,
  },
  btnTxt: {
    color: "#ffff",
    fontSize: 17,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  ultTxt: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 15,
    color: "#00008b",
  },
  txtError: {
    flex: 1,
    color: "red",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
