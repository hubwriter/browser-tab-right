let moveInProgress = false;

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (moveInProgress) return;

  // Add a small delay to avoid race conditions
  setTimeout(async () => {
    try {
      moveInProgress = true;

      // Get all tabs in the current window
      const tabs = await chrome.tabs.query({ currentWindow: true });

      // If the active tab is not already the rightmost tab
      if (activeInfo.tabId !== tabs[tabs.length - 1].id) {
        try {
          await chrome.tabs.move(activeInfo.tabId, { index: -1 });
        } catch (moveError) {
          // If the first attempt fails, try again after a longer delay
          setTimeout(async () => {
            try {
              await chrome.tabs.move(activeInfo.tabId, { index: -1 });
            } catch (retryError) {
              console.log('Failed to move tab after retry:', retryError);
            }
          }, 250);
        }
      }
    } catch (error) {
      console.log('Error in tab movement:', error);
    } finally {
      moveInProgress = false;
    }
  }, 50);
});
