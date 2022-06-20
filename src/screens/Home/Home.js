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
            console.log("ESTE ES LA DATA DE UN POST", doc.data());
            posts.push({
              id:doc.id,
              data: doc.data()
            })
          }
        )
        this.setState({
          posts:posts,
          loading:false
        })
        console.log("ESTOS SON LOS POSTS DEL ESTADO", this.state.posts);
      }
    )

  }

  render(){
    return (
      <View style={styles.container}>
       <Text>Estos son los posts:</Text>

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
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:16,
    paddingBottom:32
  },
  btn:{
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'#192A51',
    paddingVertical:16,
    paddingHorizontal:8,
    marginHorizontal:'auto',
    marginBottom:16,
  },
  textBtn:{
    color:'white'
  }
})

export default Home