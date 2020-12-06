import React, { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState([])
    //const [refresh, setRefresh] = useState(false)
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
        // console.log(id);
        fetch("/posts/"+id+"?vote=up", {
            method: "PATCH",
            body: ''
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                var cloneData = JSON.parse(JSON.stringify(data));
                cloneData.find((o, i) => {
                    if (o._id === id) {
                        cloneData[i] = res.post;
                        setData(cloneData);
                        return true; // stop searching
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    const downVote = (id) => {
        // console.log(id);
        fetch("/posts/"+id+"?vote=down", {
            method: "PATCH",
            body: ''
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                var cloneData = JSON.parse(JSON.stringify(data));
                cloneData.find((o, i) => {
                    if (o._id === id) {
                        cloneData[i] = res.post;
                        setData(cloneData);
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
                    // console.log(item)
                    return (<div className="homecard">
                        <h5>{item.title}</h5>
                        <div className="card-image">
                            <img class="bg" alt="yoyo" src={item.picture}/>
                        </div>
                        <div className="card-content">
                            <h6>Author: {item.postedBy.name}</h6>
                            <p className="body-content">{item.body}</p>
                            <button className="btn-vote"
                                onClick={() => upVote(item._id)}>
                                +
                            </button>
                            {item.votes}
                            <button className="btn-vote"
                                onClick={() => downVote(item._id)}>
                                -
                            </button>
                        </div>
                    </div>
                    )
                })
            }

        </div>
    )
}

export default Home
