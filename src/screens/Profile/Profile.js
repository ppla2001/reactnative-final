import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'

class Post extends Component {

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
      db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(users => {
        let user
        users.forEach(us => {
            user = us.data()
            console.log("ESTE ES EL USER", user, auth.currentUser.metadata);
        })
        this.setState({
            user: user,
            username: user.username,
            lastLogin: new Date(auth.currentUser.metadata.lastSignInTime).toString()
        })
        this.getUserPosts()
      });
    }
    
  getUserPosts(){
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

    render() {
        return (
            <>
              <View>
                <Text>{this.state.username}</Text>
                <Text>{auth.currentUser.email}</Text>
                <Text>Posts: {this.state.posts.length}</Text>
              </View>
              
              <View style={styles.container}>
                {
                this.state.loading ?
                <ActivityIndicator size={32} color='red'/>
                : 
                <FlatList
                data={this.state.posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Post info={item} navigation={this.props.navigation} />}
                />
                }
              </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
  


})

export default Post