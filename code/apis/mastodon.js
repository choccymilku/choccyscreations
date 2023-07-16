let fetchCompleted = false; // Flag variable to track if fetch request has been completed

// Function to handle the DOM mutation
function handleMutation(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Check if the target element exists and fetch request hasn't been completed yet
      const targetElement = document.getElementById('mastodon-title');
      if (targetElement && !fetchCompleted) {
        // Set the flag to indicate that fetch request is in progress
        fetchCompleted = true;

        // Make the fetch request
        fetch(`https://mastodon.social/api/v1/accounts/lookup?acct=${mastodon_username}`)
          .then(response => response.json())
          .then(data => {
            const username = data.display_name;
            targetElement.textContent = username;
          })
          .catch(error => console.error('Error:', error))
          .finally(() => {
            // Disconnect the observer after the fetch request, regardless of success or error
            observer.disconnect();
          });
      }
    }
  }
}

// Create an observer instance
const mastodonobserver = new MutationObserver((mutationsList, observer) => handleMutation(mutationsList, observer));

// Start observing the target node for mutations after a delay of 100ms
setTimeout(() => {
  mastodonobserver.observe(document.documentElement, { childList: true, subtree: true });
}, 100);
