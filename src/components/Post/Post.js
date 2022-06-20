import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import {auth, db} from '../../firebase/config'



class Post extends Component {
    
    constructor(props){
        super(props)
        this.state={
            likes:[],
            likeByUser:false,
            coments:[]
        }
    }

    componentDidMount(){
        const post = this.props.info.data
        const likeByUser = post.likes.includes(auth.currentUser.email)
        
        if(post.likes){
            this.setState({
                cantLikes: post.likes.length
            })
        }

        if(likeByUser){
            this.setState({
                likeByUser:true
            })
        }

        this.getUser()

    }

    getUser() {
        console.log("ESTE ES EL USER OWNER DEL POST",this.props.info.data.owner);
        db.collection('users').where('owner' , '==' , this.props.info.data.owner).onSnapshot(users => {
            let user
            users.forEach(us => {
                console.log("ESTE ES EL USER OWNER DEL POST",us.data());
                user = us.data()
            })
            this.setState({
                user: user
            })
        })
    }

    like(){
        const post = this.props.info
        db.collection('posts').doc(post.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(response => {
            this.setState({
                likeByUser:true,
                cantLikes: this.props.info.data.likes.length
            })
        })
        .catch(error=> console.log(error))
    }

    unlike(){
        const post = this.props.info
        db.collection('posts').doc(post.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( response =>
            this.setState({
                likeByUser:false,
                cantLikes: this.props.info.data.likes.length
            })
        )
        .catch(error=> console.log(error))
    }
    


    render(){
        const post = this.props.info.data
        return (
            <>
                <View style={styles.post}>
                    <View style={styles.user}>
                        <Text style={styles.username}>{post.owner}</Text>
                    </View>
                    <Image style={styles.postImage} source={{uri:post.url}} resaizeMode='cover'/>
                    <Text style={styles.username}>{post.description}</Text>
                    <View style={styles.postContent}>
                        <View style={styles.reactionWrapper}>
                        {
                            this.state.likeByUser
                            ?
                            <TouchableOpacity onPress={()=> this.unlike()}>
                                <FontAwesome style={styles.iconHeart} name='heart' size={24} color='red'/> 
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=> this.like()}>
                                <FontAwesome style={styles.iconHeart} name='heart-o' size={24} color='black' /> 
                            </TouchableOpacity>

                        }
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comments', {id:this.props.info.id})}>
                            <FontAwesome style={styles.iconHeart} name='comment-o' size={24} color='black' /> 
                        </TouchableOpacity>
                        </View>
                        <Text style={styles.likes}>{this.state.cantLikes} likes</Text>
                        <Text style={styles.postTime}>{post.createdAt} </Text>
                    </View>
                   
                    {/* <View style={styles.containerLike}>
                        {
                            this.state.likeByUser
                            ?
                            
                            <TouchableOpacity onPress={()=> this.unlike()}>
                                <FontAwesome name='heart' size={24} color='red'/> 
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=> this.like()}>
                                <FontAwesome name='heart-o' size={24} color='black' /> 
                            </TouchableOpacity>

                        }
                    </View> */}
                </View>
                {/* <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id})}
                >
                    <Text>Comentar este mensaje</Text>
                </TouchableOpacity> */}
            </>
        )
    }
}

const styles= StyleSheet.create({
    post: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        border: '1px solid #dfdfdf',
        marginTop: '40px',
    },
    user: {
        width: '100%',
        height: '60px',
        flex: 1,
        flexDirection:'row',
        padding: '0px 20px',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignItems: 'center',
    },
    username: {
        width: 'auto',
        fontWeight: 'bold',
        color: '#000',
        fontSize: '14px',
        marginLeft: '10px',
    },
    postImage: {
        width: '100%',
        height: '500px',
    },
    postContent: {
        width: '100%',
        padding: '20px',
    },
    reactionWrapper: {
        width: '100%',
        height: '50px',
        flex: 1,
        flexDirection:'row',
        marginTop: '-20px',
        alignItems: 'center',
    },
    iconHeart: {
        height: '25px',
        margin: '0px',
        marginRight: '20px',
    },
    likes: {
        fontWeight: 'bold',
    },
    postTime: {
        width: '100%',
        height: 'auto',
    },
    commentWrapper: {
        width: '100%',
        height: '50px',
        borderRadius: '1px solid #dfdfdf',
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentBox: {
        width: '80%',
        height: '100%',
        border: 'none',
        fontSize: '14px',
    },
    commentBtn: {
        color: 'blue'
    }
    
    
})

export default Post