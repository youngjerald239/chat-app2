import React from 'react'
import './App.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
   apiKey: "AIzaSyAY_4pfwufNsVtGY8sT4Gkb5-gS4YHk5so",
  authDomain: "supchat-403d9.firebaseapp.com",
  projectId: "supchat-403d9",
  storageBucket: "supchat-403d9.appspot.com",
  messagingSenderId: "1008955208779",
  appId: "1:1008955208779:web:f727c2ef818813867549ce",
  measurementId: "G-5HS2H676YN"
})

const auth = firebase.auth()
const firestore = firebase.firestore()
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {

  const [user] = useAuthState()

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.Google()
    auth.signInWithPopup(provider)
  }

  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})

  return (
    <>
      <div>
       {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>

      <div>

      </div>
    </>
  )
}

function ChatMessage(props) {
  const {text, uid} = props.message

  return <p>{text}</p>
}

export default App;
