import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from '@ux/file-upload';
import '@ux/file-upload/styles';


function setFiles(summary){
    // send the text here and send it to the API
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <FileUpload
                    accept='txt/*'
                    maxSize={ 1073741824 }
                    onChange={ (res) => setFiles(res) }
                    label='Here are your files'
                    buttonLabel='browse here'
                    showFiles={ false } />
            </header>
        </div>
    );
}

export default App;

