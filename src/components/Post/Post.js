import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions,  } from 'react-native'
import DoubleClick from 'react-native-double-tap'
import React, { Component } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import { auth, db } from '../../firebase/config'
import swal from 'sweetalert';



class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            likes: [],
            likeByUser: false,
            coments: [],
            showHeart: false,
            showBrokenHeart: false,
        }
    }

    componentDidMount() {
        console.log("ISHOMEFOCUS", this.props.isHomeFocus());
        let post = this.props.info.data
        const likeByUser = post.likes.includes(auth.currentUser.email)

        if (post.likes) {
            this.setState({
                cantLikes: post.likes.length
            })
        }

        if (likeByUser) {
            this.setState({
                likeByUser: true
            })
        }

        this.getUser()

    }

    getUser() {
        db.collection('users').where('owner', '==', this.props.info.data.owner).onSnapshot(users => {
            let user
            users.forEach(us => {
                user = us.data()
            })
            this.setState({
                user: user
            })
        })
    }

    like() {
        if (this.state.likeByUser) {
            this.unlike()
        } else {
            this.setState({showHeart: true})
            setTimeout(() => {this.setState({showHeart: false})}, 1000)
            const post = this.props.info
            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
                .then(response => {
                    this.setState({
                        likeByUser: true,
                        cantLikes: this.props.info.data.likes.length
                    })
                })
                .catch(error => console.log(error))

        }
    }

    unlike() {
        this.setState({showBrokenHeart: true})
        setTimeout(() => {this.setState({showBrokenHeart: false})}, 1000)
        const post = this.props.info
        db.collection('posts').doc(post.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        }).then(response =>
            this.setState({
                likeByUser: false,
                cantLikes: this.props.info.data.likes.length
            })
        ).catch(error => console.log(error))
    }


    render() {
        const post = this.props.info.data
        return (
            <>
                <View style={styles.post}>
                    <View style={styles.user}>
                        <Text style={styles.username}>{this.state.user ? this.state.user.username : post.owner}</Text>

                        {
                            post.owner == auth.currentUser.email && this.props.isProfileFocus()
                            ?
                            <TouchableOpacity onPress={() => this.props.deletePost(this.props.info.id)}>
                                <FontAwesome style={styles.iconHeart} name='trash-o' size={24} color='red' />
                            </TouchableOpacity>
                            :
                            <View></View>
                        }
                    </View>

                    <DoubleClick doubleTap={() => {this.like()}} delay={200}>
                        <View>
                            <Image style={styles.postImage} source={{ uri: post.url }} resaizeMode='cover' />
                            {this.state.showHeart ? <Image style={styles.overlay} source={require('../../../assets/heart.png')} resaizeMode='cover' /> : null}
                            {this.state.showBrokenHeart ? <Image style={styles.overlay} source={require('../../../assets/brokenheart.png')} resaizeMode='cover' /> : null}
                        </View>
                    </DoubleClick>
                    <View style={styles.postContent}>

                        <View style={styles.reactionWrapper}>
                            {
                                this.state.likeByUser
                                    ?
                                    <TouchableOpacity onPress={() => this.unlike()}>
                                        <FontAwesome style={styles.iconHeart} name='heart' size={24} color='red' />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => this.like()}>
                                        <FontAwesome style={styles.iconHeart} name='heart-o' size={24} color='black' />
                                    </TouchableOpacity>
                            }

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { id: this.props.info.id })}>
                                <FontAwesome style={styles.iconHeart} name='comment-o' size={24} color='black' />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.likes}>{this.state.cantLikes} Me gusta</Text>
                        <Text><Text style={styles.username}>{this.state.user ? this.state.user.username : post.owner}</Text> {post.description}</Text>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { id: this.props.info.id })}>
                            <Text style={styles.comments}>{post.comments.length >= 2 ? 'Ver los ' + post.comments.length + ' comentarios' : post.comments.length == 1 ? 'Ver un comentario' : 'Dejar el primer comentario'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.postTime}>{post.createdAt} </Text>
                    </View>
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

const styles = StyleSheet.create({
    post: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        border: '1px solid #dfdfdf',
        marginBottom: '40px',
    },
    user: {
        height: '40px',
        width: '100%',
        // flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '16px',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    username: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: '14px',
    },
    postImage: {
        width: '100%',
        height: '500px',
    },
    postContent: {
        width: '100%',
        paddingHorizontal: '16px',
    },
    reactionWrapper: {
        width: '100%',
        height: '50px',
        flex: 1,
        flexDirection: 'row',
        marginTop: '10px',
        marginBottom: '8px',
        alignItems: 'center',
    },
    iconHeart: {
        height: '25px',
        margin: '0px',
        marginRight: '20px',
    },
    overlay: {
        height: '100px',
        width: '100px',
        position: 'absolute',
        top: '200px',
        left: Dimensions.get('window').width / 2 - 50,
        tintColor: '#fff',
    },
    likes: {
        fontWeight: 'bold',
        marginBottom: '4px',
    },
    postTime: {
        marginTop: '10px',
        marginBottom: '16px',
        width: '100%',
        height: 'auto',
        fontSize: '12px',
        color: 'gray',
    },
    comments: {
        color: 'gray',
    },
    commentWrapper: {
        width: '100%',
        height: '50px',
        borderRadius: '1px solid #dfdfdf',
        flex: 1,
        flexDirection: 'row',
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