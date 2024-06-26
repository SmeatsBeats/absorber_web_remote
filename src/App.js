
// launch react app
// https://www.codecademy.com/article/how-to-create-a-react-app

// github repo
// https://gist.github.com/mindplace/b4b094157d7a3be6afd2c96370d39fad

// gh pages
// https://blog.logrocket.com/deploying-react-apps-github-pages/

// install firebase
// https://firebase.google.com/docs/web/setup#add-sdk-and-initialize


import './App.css';
import { GetPreset, SetPreset } from './PresetVal';
import React from 'react';


function App() {
  return (
    <div className="App">
      <GetPreset /> 
      <SetPreset /> 
    </div>
  );
}

export default App;

