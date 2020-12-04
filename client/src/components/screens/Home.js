import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <div className="homecard">
                <h5>Sahil</h5>
                <div className="card-image">
                    <img alt="yoyo" src='https://images.unsplash.com/photo-1476240089339-1d4426572a99?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHJuU0tESHd3WVVrfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60' />
                </div>
                <div className="card-content">
                    <i className="material-icons">favorite_border</i>
                    <h6>Title</h6>
                    <p>ajdsflkjasdnfasklfjaskdfm
                    asdjfnasdklfnak
                    </p>
                    <input type="text" placeholder="Add a comment!" />
                </div>
            </div>
        </div>
    )
}

export default Home