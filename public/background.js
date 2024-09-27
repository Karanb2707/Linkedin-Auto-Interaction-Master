chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'interactWithLinkedIn') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'startInteraction',
          likeCount: message.likeCount,
          commentCount: message.commentCount
        });
      });
      sendResponse({ status: 'Interaction started' });
    }
  });
  