import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
          animated={true}
        />
        <View style={styles.containerTwo}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Search")}
          >
            <Ionicons name="search-circle" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.txt}>Grupo 6</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Chat Room")}
          >
            <Ionicons name="chatbox" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "15%",
    justifyContent: "center",
    paddingBottom: 0,
  },
  containerTwo: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  txt: {
    fontFamily: "Times New Roman",
    fontSize: 25,
    fontWeight: "bold",
  },
});
