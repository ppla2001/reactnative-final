import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { Component } from "react";
import { auth, db } from "../../firebase/config";
import Post from "../../components/Post/Post";
import Header from "../../components/Header/Header";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      lastLogin: "",
      posts: [],
      loading: true,
      profileLoaded: false,
      postsLoaded: false,
    };
  }

  componentDidMount() {
    this.getUser();
    this.getUserPosts();
  }

  getUser() {
    this.setState({ profileLoaded: false });
    let userLastLogin = new Date(auth.currentUser.metadata.lastSignInTime)
      .toString()
      .split("GMT")[0];
    db.collection("users")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((users) => {
        let user;
        users.forEach((us) => {
          user = us.data();
          console.log("ESTE ES EL USER", user);
        });
        this.setState({
          user: user,
          lastLogin: userLastLogin,
          profileLoaded: true,
        });
        if (this.state.profileLoaded && this.state.postsLoaded) {
          this.setState({ loading: false });
        }
      });
  }

  getUserPosts() {
    this.setState({ postsLoaded: false });
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          let data = doc.data();
          data.createdAt = new Date(data.createdAt).toString().split("GMT")[0];
          posts.push({
            id: doc.id,
            data: data,
          });
        });
        this.setState({
          posts: posts,
          postsLoaded: true,
        });
        if (this.state.profileLoaded && this.state.postsLoaded) {
          this.setState({ loading: false });
        }
      });
  }

  deletePost(id) {
    swal({
      title: "??Est??s seguro?",
      text: "Una vez eliminado el post no se puede recuperar",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((deleted) => {
      if (deleted) {
        db.collection("posts")
          .doc(id)
          .delete()
          .then(
            (data) => {
              swal("Se elimino correctamente", {
                icon: "success",
              });
            },
            (error) => {
              console.log("error", error);
            }
          );
      }
    });
  }

  render() {
    return (
      <>
        <Header navigation={this.props.navigation}></Header>

        {this.state.loading ? (
          <ActivityIndicator size={32} color="red" />
        ) : (
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.profileInfo}>
                <Text style={styles.username}>{this.state.user.username}</Text>
                <Text>{auth.currentUser.email}</Text>
                <Text>Ultimo inicio de sesi??n: {this.state.lastLogin}</Text>
                <Text>
                  Mis posteos:{" "}
                  <Text style={styles.postsNum}>{this.state.posts.length}</Text>
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.props.route.params.logout()}
              >
                <Text style={styles.logout}>Cerrar Sesi??n</Text>
              </TouchableOpacity>

              <FlatList
                data={this.state.posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Post
                    info={item}
                    isProfileFocus={this.props.navigation.isFocused}
                    deletePost={(id) => this.deletePost(id)}
                  />
                )}
              />
            </ScrollView>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfo: {
    backgroundColor: "white",
    padding: "10px",
    margin: "10px",
    borderRadius: "20px",
  },
  username: {
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "white",
    padding: "10px",
    margin: "10px",
    borderRadius: "20px",
    color: "red",
    textAlign: "center",
  },
  postsNum: {
    fontWeight: "bold",
    marginHorizontal: "5px",
  },
});

export default Profile;
