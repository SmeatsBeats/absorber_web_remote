import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1_y_5e4EcX8aCZMWotPpT4-qZqWxxZr4",
  authDomain: "customacoustical-5c632.firebaseapp.com",
  databaseURL: "https://customacoustical-5c632-default-rtdb.firebaseio.com",
  projectId: "customacoustical-5c632",
  storageBucket: "customacoustical-5c632.appspot.com",
  messagingSenderId: "765374685437",
  appId: "1:765374685437:web:d66896ef98bd6837c21e94",
  measurementId: "G-HTXXQWNJNH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const userEmail = "customacoustical@gmail.com";
const userPassword = "The$alty$pit00n";

const auth = getAuth(app);
signInWithEmailAndPassword(auth, userEmail, userPassword)
  .then((userCredential) => {
    // Signed in 
    //const user = userCredential.user;
    // You can now attempt to read from the database again here
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error ${errorCode}: ${errorMessage}`);
  });

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Attempt to read from a known path
        const testRef = ref(database, '/');
        onValue(testRef, (snapshot) => {
          if (snapshot.exists()) {
            console.log('Connection Test: Success');
          } else {
            console.log('Connection Test: Data not found, but connection successful');
          }
        },

        // Error callback for permission denied
        (error) => {
          console.error('Connection Test: Failed', error);
        });


        // Create a reference to the data you want to read
        const dataRef = ref(database, '/test/int');
        // Listen for changes in the data
        onValue(dataRef, (snapshot) => {
          const dbData = snapshot.val();
          setData(dbData); // Update state with the received data
        });


      } catch (error) {
        // Handle any errors that occur during the read operation
        console.error('Connection Test: Error', error);
      }
    };
  
    // Call the test function
    testConnection();
  }, []); // Empty dependency array means this effect runs once on mount


  console.log("data:" + JSON.stringify(data, null, 2));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

