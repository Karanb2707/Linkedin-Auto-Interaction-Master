chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startInteraction') {
      const { likeCount, commentCount } = message;
      const posts = document.querySelectorAll('.scaffold-finite-scroll__content .feed-shared-update-v2');

      // Like posts
      for (let i = 0; i < Math.min(likeCount, posts.length); i++) {
        const likeButton = posts[i].querySelector('[aria-label*="Like"]');
        if (likeButton) {
          likeButton.click();
        }
      }

      // Comment on posts
      for (let i = 0; i < Math.min(commentCount, posts.length); i++) {
        const commentButton = posts[i].querySelector('[aria-label*="Comment"]');
        if (commentButton) {
          commentButton.click();

          setTimeout(() => {
            const commentBox = posts[i].querySelector('textarea.comments-comment-box__textarea');
            if (commentBox) {
              // Set the value programmatically
              commentBox.value = 'CFBR';
              
              // Simulate a real user input event
              const inputEvent = new InputEvent('input', { bubbles: true, cancelable: true });
              commentBox.dispatchEvent(inputEvent);

              // Submit the comment
              const submitButton = posts[i].querySelector('.comments-comment-box__submit-button');
              if (submitButton) {
                submitButton.removeAttribute('disabled');
                submitButton.click();
              }
            }
          }, 10000); // Wait for comment box to load
        }
      }

      sendResponse({ status: 'Interaction complete' });
    }
});
