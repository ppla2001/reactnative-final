import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import TabNavigation from "./TabNavigation";
import { auth, db } from "../firebase/config";
import Comments from "../screens/Comments/Comments";

const Stack = createNativeStackNavigator();

export default class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logged: false,
      errorMessageRegister: "",
      errorMessageLogin: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((data) => {
      console.log("ESTA ES LA METADATA DEL USER", auth.currentUser.metadata);
      if (data) {
        db.collection('users').doc(data.uid).onSnapshot(doc => {
          console.log("ESTE ES EL USER QUE LLEGA EN SNAPSHOT", doc.data());
          this.setState({
            user: doc.data()
          })
      })
        this.setState({ Logged: true,});
      }
    });
  }

  login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({ Logged: true })
      })
      .catch((e) => this.setState({ errorMessageLogin: e.message }));
    // Falta avisar al usuario si hay error
  }

  register(email, password, username) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        db.collection("users").doc(data.user.uid).set({
            owner: email,
            username: username,
            uid: data.user.uid,
            createdAt: Date.now(),
          })
          .catch((e) => console.error(e))
        })
      .then((response) => this.setState({ Logged: true }))
      .catch((e) => this.setState({ errorMessageRegister: e.message }));
    // Falta avisar al usuario si hay error
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
            <Stack.Group>
               <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{ headerShown: false }}
              initialParams={{
                logout: (email, password) => this.logout(email, password),
              }}
            ></Stack.Screen>
          <Stack.Screen name="Comments" component={Comments}>

          </Stack.Screen>
            </Stack.Group>
           
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="Login"
                children={(props) => (
                  <Login
                    login={(email, password) => this.login(email, password)}
                    errorMessageLogin={this.state.errorMessageLogin}
                    {...props}
                  ></Login>
                )}
              ></Stack.Screen>

              <Stack.Screen
                name="Register"
                children={(props) => (
                  <Register
                    register={(email, password, username) =>
                      this.register(email, password, username)
                    }
                    errorMessageRegister={this.state.errorMessageRegister}
                    {...props}
                  ></Register>
                )}
                // options={{ headerShown: false }}
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
