/* global chrome */
import React, { useState } from 'react';

function App() {
  const [likeCount, setLikeCount] = useState('');
  const [commentCount, setCommentCount] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleLikeChange = (e) => {
    setLikeCount(e.target.value);
    validateInput(e.target.value, commentCount);
  };

  const handleCommentChange = (e) => {
    setCommentCount(e.target.value);
    validateInput(likeCount, e.target.value);
  };

  const validateInput = (likeVal, commentVal) => {
    if (likeVal > 0 && commentVal > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleButtonClick = () => {
    const message = {
      action: 'interactWithLinkedIn',
      likeCount: parseInt(likeCount),
      commentCount: parseInt(commentCount)
    };

    // Send message to background script
    chrome.runtime.sendMessage(message, function(response) {
      console.log('Interaction started', response);
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>LinkedIn Auto Interaction</h1>
      <div>
        <input
          type="number"
          placeholder="Like Count"
          value={likeCount}
          onChange={handleLikeChange}
          style={{ margin: '10px', padding: '5px' }}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Comment Count"
          value={commentCount}
          onChange={handleCommentChange}
          style={{ margin: '10px', padding: '5px' }}
        />
      </div>
      <div>
        <button
          onClick={handleButtonClick}
          disabled={!isButtonEnabled}
          style={{
            padding: '10px 20px',
            backgroundColor: isButtonEnabled ? '#4CAF50' : '#aaa',
            color: 'white',
            border: 'none',
            cursor: isButtonEnabled ? 'pointer' : 'not-allowed'
          }}
        >
          Start Interaction
        </button>
      </div>
    </div>
  );
}

export default App;
