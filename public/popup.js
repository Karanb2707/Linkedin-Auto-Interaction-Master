document.getElementById('startBtn').addEventListener('click', () => {
    const likeCount = parseInt(document.getElementById('likeCount').value, 10);
    const commentCount = parseInt(document.getElementById('commentCount').value, 10);
  
    chrome.runtime.sendMessage({
      action: 'interactWithLinkedIn',
      likeCount,
      commentCount
    }, (response) => {
      console.log(response.status); // Log interaction start status
    });
  });
  