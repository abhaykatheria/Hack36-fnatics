import React from 'react'
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'
import '@firebase/firestore';
import Fire from '../Fire'
import '@firebase/storage'

class ChatScreen extends React.Component<Props> {

    // get user() {
    //     return {
    //         name: this.props.navigation.state.params.name,
    //         _id: Fire.shared.uid,
    //     };
    // }

    state = {
        messages: [],
        sender: '',
        reciever: ''
    };


    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.sendHandler}
                user={{
                    name: this.state.sender,
                    _id: this.state.sender,
                    sender: this.state.sender,
                    reciever: 'a'
                }}
            />
        )
    }


    componentDidMount() {
        // Fire.shared.on(message => {
        //     this.setState(previousState => ({
        //         messages: GiftedChat.append(previousState.messages, message),
        //     }))
        //     console.log(this.messages)
        // });
        let location = this.props.navigation.getParam('sender') + 'a'
        // console.log(location);

        let location1 = ''
        for (let i = 0; i < location.length; i++) {
            if (location[i] === '.')
                continue;
            location1 += location[i];
        }
        console.log(location1);

        firebase.database().ref(location1).on('value', function (snapshot) {
            console.log(snapshot.val());
            if (snapshot.val()) {
                // this.setState(previousState => ({
                //     messages: GiftedChat.append(previousState.messages, message),
                // }))
                console.log('aa');
            }
        })

        // const temp = firebase.database().ref(location1)

        // temp.get().then(snapshot => {
        //     snapshot.forEach(doc => {
        //         // console.log('#')
        //         // console.log(doc.data())
        //         // console.log('#')
        //         console.log(doc.data())
        //     })
        //     //console.log(posts)
        //     // this.setState({ posts: posts })
        //     //console.log(this.state.posts)
        // })

        this.setState({
            sender: this.props.navigation.getParam('sender'),
            reciever: this.props.navigation.getParam('reciever')
        })
    }


    componentWillUnmount() {
        console.log(this.state)
    }

}

export default ChatScreen