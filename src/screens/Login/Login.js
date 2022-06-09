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
    return (
      <View style={styles.container}>
        <Text> LogIn </Text>
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
            this.props.route.params.login(this.state.email, this.state.password)
          }
        >
          <Text style={styles.btnTxt}> LogIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text>No tengo cuenta, registrarme. </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  textField: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 10,
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
  },
  btnTxt: {
    color: "#ffff",
  },
});
