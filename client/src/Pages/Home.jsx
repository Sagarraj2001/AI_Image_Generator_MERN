import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('image'); // 'image' or 'text'

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a valid prompt");
            return;
        }

        setLoading(true);
        setError('');
        setImageUrl('');
        setGeneratedText('');

        try {
            if (activeTab === 'image') {
                const response = await axios.post('http://localhost:5000/api/generate-image', { prompt });
                setImageUrl(response.data.imageUrl);
            } else if (activeTab === 'text') {
                const response = await axios.post('http://localhost:5000/api/generate-text', { prompt });
                setGeneratedText(response.data.text);
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setError("Failed to generate content. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="mb-4">
                <button
                    className={`btn ${activeTab === 'image' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                    onClick={() => setActiveTab('image')}
                >
                    Generate Image
                </button>
                <button
                    className={`btn ${activeTab === 'text' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('text')}
                >
                    Generate Text
                </button>
            </div>

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
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : `Generate ${activeTab === 'image' ? 'Image' : 'Text'}`}
                </button>
            </form>

            {error && (
                <div className="mt-3 text-danger">
                    <strong>{error}</strong>
                </div>
            )}

            {activeTab === 'image' && imageUrl && (
                <div className="mt-4 text-center">
                    <h2>Generated Image:</h2>
                    <img
                        src={imageUrl}
                        alt="Generated"
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                </div>
            )}

            {activeTab === 'text' && generatedText && (
                <div className="mt-4 text-center">
                    <h2>Generated Text:</h2>
                    <p style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>
                        {generatedText}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Home;

