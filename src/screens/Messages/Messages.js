import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../../firebase/config";
import { View, Text } from "react-native";

export default function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  });

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    db.collection("messages").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.email,
        name: auth.currentUser.email,
      }}
    />
  );
}

// A PARTIR DE ACA PRUEBA

// import { Text, View } from "react-native";
// import React, {
//   Component,
//   useState,
//   useCallback,
//   useEffect,
//   useLayoutEffect,
// } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import { auth, db } from "../../firebase/config";

// export default class Messages extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [],
//       setMessages: [],
//     };
//   }

//   componentDidMount() {
//     db.collection("messages")
//       .orderBy("createdAt", "desc")
//       .onSnapshot((snapshot) =>
//         this.setState({
//           setMessages: snapshot.docs.map((doc) => ({
//             _id: doc.data()._id,
//             createdAt: doc.data().createdAt.toDate(),
//             text: doc.data().text,
//             user: doc.data().user,
//           })),
//         })
//       );
//   }

//   onSend(messages) {
//     this.setState({
//       messages: this.state.setMessages,
//     });
//     // const { _id, createdAt, text, user } = this.state.messages[0];
//     const _id = this.state.messages[0]._id.toString();
//     const createdAt = this.state.messages[0].createdAt;
//     const text = this.state.messages[0].text;
//     const user = this.state.messages[0].user;
//     db.collection("messages").add({
//       _id,
//       createdAt,
//       text,
//       user,
//     });
//   }

//   render() {
//     return (
//       <GiftedChat
//         messages={this.state.setMessages}
//         showAvatarForEveryMessage={true}
//         renderUsernameOnMessage={true}
//         onSend={(messages) => this.onSend(messages)}
//         user={{
//           _id: auth.currentUser.email,
//           name: auth.currentUser.email,
//         }}
//       />
//     );
//   }
// }
