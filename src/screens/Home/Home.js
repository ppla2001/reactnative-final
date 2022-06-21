import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'
import Post from '../../components/Post/Post'


class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      posts:[],
      loading:true,
    }
  }

  componentDidMount(){
    db.collection('posts').onSnapshot(
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
        console.log("ESTOS SON LOS POSTS", posts);
        this.setState({
          posts:posts,
          loading:false
        })
      }
    )
  }
  
  deletePost(id) {
    console.log("BORRAMOS EL POST", id);
    db.collection('posts').doc(id).delete().then((data) => {
      resolve(data);
    }, error => {
      console.log("error", error);
      reject(error);
    })
  }

  render(){
    return (
      <View style={styles.container}>
        {
         this.state.loading ?
         <ActivityIndicator size={32} color='red'/>
         : 
         <FlatList data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <Post info={item} navigation={this.props.navigation} deletePost={(id) => this.deletePost(id)} /> } />
         }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
})

export default Home