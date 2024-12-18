import React from 'react'
import axios from 'axios';
import { useState } from 'react';

function Home() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!prompt) return alert("Please enter a prompt");
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/generate-image', { prompt });
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            console.error("Error fetching image:", error);
            alert("Failed to generate image");
        }
        setLoading(false);
    };

    return (
        <>
            <div class="d-flex justify-content-center align-items-center vh-100 px-3">
                <form class="d-flex text-center w-100" style={{ maxWidth: "600px" }}>
                    <input
                        class="form-control me-2"
                        type="text"
                        placeholder="Enter a detailed description..."
                        aria-label="Search"
                        style={{ flex: "1px" }}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)} />
                    <button class="btn btn-primary btn-generate" type="button"  onClick={generateImage} disabled={loading}>{loading ? 'Generating...' : 'Generate Image'}</button>
                </form>
            </div>
            {imageUrl && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Generated Image:</h2>
                    <img src={imageUrl} alt="Generated" style={{ width: '512px', height: '512px' }} />
                </div>
            )}


        </>
    )
}

export default Home
