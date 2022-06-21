import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Profile extends Component {

  constructor(props) {
      super(props)
      this.state = {
        username: '',
        email: '',
        lastLogin: '',
        posts: [],
        loading: true,
      }
  }

  componentDidMount() {
    this.getUser()
    this.getUserPosts()
  }

  getUser() {
    this.setState({loading: true})
    let userLastLogin = new Date(auth.currentUser.metadata.lastSignInTime).toString().split('GMT')[0]
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(users => {
      let user
      users.forEach(us => {
          user = us.data()
          console.log("ESTE ES EL USER", user);
      })
      this.setState({
          user: user,
          lastLogin: userLastLogin,
          loading: false
      })
    });
  }
    
  getUserPosts(){
    this.setState({loading: true})
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
      (docs)=>{
        let posts = []
        docs.forEach(
          doc => {
            let data = doc.data()
            data.createdAt = new Date(data.createdAt).toString().split('GMT')[0]
            posts.push({
              id:doc.id,
              data: data,
            })
          }
        )
        this.setState({
          posts: posts,
          loading: false
        })
      }
    )
  }

  deletePost(id) {
    console.log("BORRAMOS EL POST", id);
    // db.collection('posts').doc(id).delete().then((data) => {
    //   resolve(data);
    // }, error => {
    //   console.log("error", error);
    //   reject(error);
    // })
  }

  render() {
      return (
          <>
              {
              this.state.loading ?
              <ActivityIndicator size={32} color='red'/>
              : 
              <View style={styles.container}>
                
                <View>
                  <Text>{this.state.user.username}</Text>
                  <Text>{auth.currentUser.email}</Text>
                  <Text>Ultimo inicio de sesión: {this.state.lastLogin}</Text>
                  <Text>Posts: {this.state.posts.length}</Text>
                  <TouchableOpacity onPress={() => this.props.route.params.logout()}>
                    <Text>Logout</Text>
                  </TouchableOpacity>
                </View>
                
                <FlatList data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <Post info={item} navigation={this.props.navigation} deletePost={(id) => this.deletePost(id)}/>} />
              
              </View>
              }
          </>
      )
  }
}

const styles = StyleSheet.create({
  


})

export default Profile