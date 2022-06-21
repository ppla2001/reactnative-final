import React, { Component } from "react";
import { db, auth } from "../../firebase/config";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import Post from "../../components/Post/Post";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      email: "",
      whoIs: "",
    };
  }

  // Obtener información a partir de una búsqueda.
  search() {
    db.collection("posts")
      .where("owner", "==", this.state.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((oneDoc) => {
          posts.push({
            id: oneDoc.id,
            data: oneDoc.data(),
          });
        });

        this.setState({
          posts: posts,
          email: "",
          whoIs: this.state.email,
        });
      });
  }

  isProfileFocus() {
    return false
  }

  render() {
    // console.log(this.state);
    return (
      <View>
        {/* Si no hay resultados deben mostrar un mensaje al usuario. Puede ser un mensaje único o segmenteado: en caso de que el usuario no exista o si el usuario existe indicar que aún no tiene posteos. */}
        <Text>Posts del usuario: {this.state.whoIs}</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.field}
            keyboardType="default"
            placeholder="email a buscar..."
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.search()}
            disabled={this.state.email == "" ? true : false}
          >
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        {this.state.posts ? (
          this.state.posts.length === 0 ? (
            <Text>No se encontraron resultados</Text>
          ) : (
            <FlatList
              data={this.state.posts}
              keyExtractor={(post) => post.id}
              renderItem={({ item }) => <Post info={item} {...this.props} isProfileFocus={() => this.isProfileFocus()}/>}
            />
          )
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  form: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  field: {
    borderColor: "#dcdcdc",
    borderWidth: 1,
    borderRadius: 2,
    padding: 3,
    marginBottom: 8,
    width: "70%",
    marginBottom: 0,
    lineHeight: 40,
  },
  button: {
    borderRadius: 2,
    padding: 3,
    backgroundColor: "green",
    width: "29%",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
  },
});

export default Search;
