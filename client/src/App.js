import React, { useState } from 'react';
import FileUpload from "./FileUpload";
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { loadPrompt } from './load';

const Button = styled.button``;

function App() {

    const [filePath, setFilePath] = useState('');
    const [promptContent, setPromptContent] = useState('');
    
    async function handlePromptPost(filePath) {
        setFilePath(filePath);
        const res = await loadPrompt(filePath);
        if (!res.ok) {
            throw new Error(`Received unexpected status ${res.status} when . ${await res.text()}`);
        } else {
            return await res.json();
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <FileUpload />
            </header>
        </div>
    );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// import FileUpload from "./FileUpload";
// import axios from "axios";
// import {Component} from "react";
//
// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedFile: null
//         }
//     }
//
//     onChangeHandler = event => {
//         this.setState({
//             selectedFile: event.target.files[0],
//             loaded: 0,
//         })
//     }
//     onClickHandler = () => {
//         const data = new FormData()
//         data.append('file', this.state.selectedFile)
//         axios.post("http://localhost:3001/upload", data,  {headers:{"Content-Type" : "application/json"}})
//             .then(res => { // then print response status
//                 console.log(res.statusText)
//             })
//     }
//
//     render() {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-6">
//                         <div className="form-group files">
//                             <label>Upload Your File </label>
//                             <input type="file" name="file" onChange={this.onChangeHandler}/>
//                         </div>
//                         <button type="button" class="btn-success btn-block" onClick={this.onClickHandler}>Upload
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default App;
