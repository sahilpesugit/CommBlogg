import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import M from 'materialize-css'

const UpdatePost = (id) => {
    const history = useHistory()
    const location = useLocation();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) {
            console.log("id: " + location.id);
            fetch("/updatepost/"+location.id, {
                method: "patch",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {

                    if (data.error) {
                        M.toast({ html: data.error })
                    }
                    else {
                        M.toast({ html: "Updated post Successfully" })
                        history.push('/')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "CommBlogg")
        data.append("cloud_name", "commblogg")
        fetch("https://api.cloudinary.com/v1_1/commblogg/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="mycard" style={{ margin: "30px auto", maxWidth: "500px", padding: "20px", textAlign: "center" }}>
            <h3>New Post</h3>
            <input
                type="text"
                size="50"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <textarea
                type="text"
                placeholder="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}>
            </textarea> 
            <div className="file-field input-field">
                <div className="btn waves-effect #212121 grey darken-4" >
                    <span>Upload Image</span>
                    <input type="file"
                        onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect #212121 grey darken-4"
                onClick={() => postDetails()}>
                Post!
            </button>
        </div>
    )
}

export default UpdatePost