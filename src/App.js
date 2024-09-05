import { useState } from 'react';

const fetchGeneratedImage = async (text) => {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: text,
      n: 1,
      size: "256x256"
    })
  });
  const result = await response.json();

  return result.data;
};

function App() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerateImage =　async () => {
    const generatedImages = await fetchGeneratedImage(inputText);
    setImageUrl(generatedImages[0].url);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Generation with OpenAI</h1>
        <div className="input-group">
          <input
            className="input-text"
            type="text"
            placeholder="Enter text for image generation"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button 
            className="button"
            onClick={handleGenerateImage}
          >
            Generate Image
          </button>
          <p>
            <img src={imageUrl} className="generated-image"></img>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
