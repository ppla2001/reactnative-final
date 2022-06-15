import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
    };
  }

  render() {
    console.log(this.props.errorMessageRegister);
    return (
      <View style={styles.constainer}>
        <Text style={styles.mainTxt}> Register </Text>

        <TextInput
          style={styles.textField}
          keyboardType="default"
          placeholder="username"
          onChangeText={(text) => this.setState({ username: text })}
        ></TextInput>
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
          style={styles.btn}
          onPress={() =>
            this.props.register(
              this.state.email,
              this.state.password,
              this.state.username
            )
          }
        >
          <Text style={styles.btnTxt}> Register </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.ultTxt}> Ya tengo cuenta, Iniciar sesion</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    // flex: 1,
    // flexDirection: "column",
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  mainTxt: {
    flex: 1,
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
    flex: 1,
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
    flex: 1,
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
});
