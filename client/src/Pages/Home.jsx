// import React from 'react'
// import axios from 'axios';
// import { useState } from 'react';

// function Home() {
//     const [prompt, setPrompt] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [loading, setLoading] = useState(false);

//     const generateImage = async () => {
//         if (!prompt) return alert("Please enter a prompt");
//         setLoading(true);
//         try {
//             const response = await axios.post('http://localhost:5000/api/generate-image', { prompt });
//             setImageUrl(response.data.imageUrl);
//         } catch (error) {
//             console.error("Error fetching image:", error);
//             alert("Failed to generate image");
//         }
//         setLoading(false);
//     };

import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateImage = async () => {
        if (!prompt.trim()) {
            setError("Please enter a valid prompt");
            return;
        }

        setLoading(true);
        setError('');
        setImageUrl('');

        try {
            const response = await axios.post('http://localhost:5000/api/generate-image', { prompt });
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            console.error("Error fetching image:", error.response?.data || error.message);
            setError("Failed to generate image. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <form className="d-flex w-100 justify-content-center" style={{ maxWidth: "600px" }}>
                <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Enter a detailed description..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={generateImage}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Image'}
                </button>
            </form>

            {error && (
                <div className="mt-3 text-danger">
                    <strong>{error}</strong>
                </div>
            )}

            {imageUrl && (
                <div className="mt-4 text-center">
                    <h2>Generated Image:</h2>
                    <img
                        src={imageUrl}
                        alt="Generated"
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                </div>
            )}
        </div>
    );
}

export default Home;
