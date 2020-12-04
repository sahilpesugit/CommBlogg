import React from 'react';

const Profile = () => {
    return (
        <div style={{ maxWidth: '550px', margin: '0px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px' }}>
                <div>
                    <img style={{ width: '160px', height: '160px', borderRadius: '80px' }} src="https://images.unsplash.com/photo-1581297828647-4314e318d177?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8Ym84alFLVGFFMFl8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="no img" />
                </div>
                <div>
                    <h4>Sahil Lobo</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                        <h6>40 posts</h6>
                        <h6>128931230 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
            <div className></div>
        </div>
    )
}

export default Profile