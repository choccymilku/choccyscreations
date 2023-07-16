const targetNodeRoblox = document.querySelector('body');
const robloxobserver = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const robloxTitleElement = document.getElementById('roblox-title');
      if (robloxTitleElement && roblox_id) { // Check if roblox_id has a value
        fetch(`https://api.allorigins.win/get?url=` + encodeURIComponent(`https://users.roblox.com/v1/users/${roblox_id}`))
          .then(response => response.json())
          .then(data => {
            const responseData = JSON.parse(data.contents);
            const name = responseData.displayName;
            robloxTitleElement.textContent = name;
          })
          .catch(error => {
            console.log('Error:', error);
          });
        robloxobserver.disconnect();
      }
    }
  }
});

robloxobserver.observe(targetNodeRoblox, { childList: true, subtree: true });
