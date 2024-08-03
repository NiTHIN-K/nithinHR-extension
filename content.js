window.addEventListener("message", (event) => {
    if (event.source !== window) return;
  
    if (event.data && event.data.type === "FROM_PAGE") {
      const { action, data } = event.data.payload;
      console.log(`Content script received action: ${action}, data:`, data);
      
      chrome.runtime.sendMessage({ action, data }, (response) => {
        console.log('Response from background script:', response);
        window.postMessage({ type: "FROM_EXTENSION", payload: response }, "*");
      });
    }
  });