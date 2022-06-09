import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/config";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <View>
        <Text> Mi Perfil</Text>
        <Text>{auth.currentUser.email}</Text>
        <TouchableOpacity onPress={() => this.props.route.params.logout()}>
          <Text>logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
