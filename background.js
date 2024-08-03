chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background script received message:', message);
  
    if (message.action === 'saveFormData') {
      console.log('Saving form data:', message.data);
      chrome.storage.local.set({ formData: message.data }, () => {
        console.log('Data saved.');
        sendResponse({ status: 'success' });
      });
      return true; // Keep the message channel open for sendResponse
    } else if (message.action === 'getFormData') {
      chrome.storage.local.get('formData', (result) => {
        console.log('Retrieved form data:', result.formData);
        sendResponse({ data: result.formData });
      });
      return true; // Keep the message channel open for sendResponse
    }
  });