// app/loading.tsx
import React from 'react';

const Loading = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img
                src="/public/loader.gif" 
                alt="Loading..."
                style={{ width: '100px', height: '100px' }} 
            />
            <h2>Loading...</h2>
        </div>
    );
};

export default Loading;
