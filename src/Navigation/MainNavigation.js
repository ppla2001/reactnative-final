import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import TabNavigation from "./TabNavigation";
import { auth } from "../firebase/config";

const Stack = createNativeStackNavigator();

export default class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logged: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ Logged: true });
      }
    });
  }

  login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => this.setState({ Logged: true }))
      .catch((e) => console.log(e));
  }

  register(email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => this.setState({ Logged: true }))
      .catch((e) => console.log(e));
  }

  logout() {
    auth
      .signOut()
      .then((response) => this.setState({ Logged: false }))
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.Logged ? (
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{ headerShown: false }}
              initialParams={{
                logout: (email, password) => this.logout(email, password),
              }}
            ></Stack.Screen>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
                initialParams={{
                  login: (email, password) => this.login(email, password),
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
                initialParams={{
                  register: (email, password) => this.register(email, password),
                }}
              ></Stack.Screen>
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
