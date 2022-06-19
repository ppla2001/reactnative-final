import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Search from "../screens/Search/Search";
import CreatePost from "../screens/CreatePost/CreatePost";

const Tab = createBottomTabNavigator();

export default function TabNavigation(props) {
  console.log("ESTAS SON LAS PROPS DEL TABNAVIGATOR",props);
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Create Post"
        component={CreatePost}
        options={{
          tabBarIcon: () => (
            <Ionicons name="plus" size={30} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => (
            <Ionicons name="search-circle" size={30} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
        }}
        initialParams={{
          logout: (email, password) =>
            props.route.params.logout(email, password),
        }}
      />
    </Tab.Navigator>
  );
}
