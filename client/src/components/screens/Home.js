import React, { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        fetch('/allposts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.posts)
            })
    }, [])

    const upVote = (id) => {
        console.log(id);
        fetch("/posts/"+id+"?vote=up", {
            method: "PATCH",
            body: ''
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let obj = data.find((o, i) => {
                    if (o._id === id) {
                        data[i] = res;
                        //setData(data);
                        return true; // stop searching
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="home">
            {
                data.map(item => {
                    return (<div className="homecard">
                        <h5>{item.title}</h5>
                        <div className="card-image">
                            <img class="bg" alt="yoyo" src={item.picture}/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons">favorite_border</i>
                            <h6>Author: {item.postedBy.name}</h6>
                            <p className="body-content">{item.body}</p>
                            <button className="btn waves-effect #212121 grey darken-4"
                                onClick={() => upVote(item._id)}>
                                Upvote!
                            </button>
                            <p>vote: {item.votes}</p>
                        </div>
                    </div>
                    )
                })
            }

        </div>
    )
}

export default Home
