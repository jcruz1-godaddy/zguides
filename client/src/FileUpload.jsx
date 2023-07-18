import React, { useState } from "react";
import axios from "axios";
import Button from '@ux/button';

function FileUpload() {
    const [fileData, setFileData] = useState("");
    const getFile = (e) => {
        setFileData(e.target.files[0]);
    };

    const uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", fileData);
        axios({
            method: "POST",
            url: "http://localhost:3001/upload",
            data: data,},
            {headers:{"Content-Type": "application/json"}
        }).then((res) => {
            alert(res.data.message);
        });
    };

    return (
        <form onSubmit={uploadFile}>
            <label htmlFor="exampleEmailInput">Channel ID / User ID</label>
            <br></br>
            <input className="u-full-width" type="text" name="channelId" placeholder="Channel ID / User ID" required />
            <br></br>
            <input type="file" name="file" onChange={getFile} required />
            <Button design='primary' type="submit" />
        </form>
    );
}

export default FileUpload;

// import React, { useRef, useState } from 'react';
// import axios from 'axios';
//
// const FileUpload = ({ resetForm }) => {
//     const [files, setFiles] = useState([]);
//     const inputRef = useRef(null);
//     const formRef = useRef(null);
//     const [message, setMessage] = useState('');
//
//     const handleClick = () => inputRef && inputRef.current && inputRef.current.click();
//     const handleFiles = (e) => setFiles(e.target.files ? e.target.files : []);
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if(files.length > 0) {
//             const formData = new FormData();
//             formData.append('file', files[0]);
//             axios.post('http://localhost:3001/upload', formData)
//                 .then(data => setMessage(data.data.message))
//                 .catch((error) => setMessage('Error'));
//             setFiles([]);
//             formRef.current && formRef.current.reset();
//             setTimeout(() => {
//                 setMessage('');
//             }, 4000);
//         }
//     }
//
//     return (
//         <form ref={formRef}>
//             <div className="mui--text-dark-secondary mui--text-button">{message}</div>
//             <div className="upload-box" onClick={handleClick}>
//                 Click to Upload a txt file <hr />
//                 {files[0] && files[0].name}
//             </div>
//             <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} />
//             <button className="mui-btn mui-btn--primary" onClick={handleSubmit}>Submit</button>
//         </form>
//     )
// }
//
// export default FileUpload;