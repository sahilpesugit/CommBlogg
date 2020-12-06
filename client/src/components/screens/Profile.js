// import React from 'react';

// const Profile = () => {
//     return (
//         <div style={{ maxWidth: '550px', margin: '0px auto' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px' }}>
//                 <div>
//                     <img style={{ width: '160px', height: '160px', borderRadius: '80px' }} src="https://images.unsplash.com/photo-1581297828647-4314e318d177?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8Ym84alFLVGFFMFl8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="no img" />
//                 </div>
//                 <div>
//                     <h4>Sahil Lobo</h4>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
//                         <h6>40 posts</h6>
//                         <h6>128931230 followers</h6>
//                         <h6>40 following</h6>
//                     </div>
//                 </div>
//             </div>
//             <div className></div>
//         </div>
//     )
// }

// export default Profile

import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../App'

const Profile = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(userContext)
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        // console.log(state._id)
        fetch('/allposts?id='+state._id, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.posts)
            })
    }, [])

    const upVote = (id) => {
        //console.log(id);
        fetch("/posts/" + id + "?vote=up", {
            method: "PATCH",
            body: ''
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                var cloneData = JSON.parse(JSON.stringify(data));
                let obj = cloneData.find((o, i) => {
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
        fetch("/posts/" + id + "?vote=down", {
            method: "PATCH",
            body: ''
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                var cloneData = JSON.parse(JSON.stringify(data));
                let obj = cloneData.find((o, i) => {
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
            <div style={{ maxWidth: '550px', margin: '0px auto' }}>
                <h3><i>My Profile.</i></h3>
                <h4>{state ? state.name : "loading"}</h4>
            </div>
            {
                data.map(item => {
                    // console.log(item)
                    return (<div className="homecard">
                        <h5>{item.title}</h5>
                        <div className="card-image">
                            <img class="bg" alt="yoyo" src={item.picture} />
                        </div>
                        <div className="card-content">
                            <i className="material-icons">favorite_border</i>
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

export default Profile