//discord lanyard api
let ws;
let connected = false;

function connect() {
  ws = new WebSocket('wss://api.lanyard.rest/socket');

  ws.addEventListener('open', () => {
    console.log('📰 lanyard WebSocket connected! receiving API data');
    ws.send(JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: discord_user_id
      }
    }));
  });

  ws.addEventListener('error', event => {
    console.error('WebSocket error', event);
  });

  ws.addEventListener('close', event => {
    setTimeout(() => connect(), 0); // Reconnect after 5 seconds
  });

  ws.addEventListener('message', event => {
    const data = JSON.parse(event.data);
	console.log('📰 lanyard API call successful! fetching API data', data); // Add this line to log the data
    if (data.op === 1) {
      updateStatus(data.d);
    } else if (data.op === 0) {
      updateStatus(data.d);
    }
  });
}

if (!connected) {
  connect();
  connected = true;
}

function updateStatus(data) {
  const userStatus = data.discord_status;

const activities = data.activities;
  const customStatus = activities ? activities.find(activity => activity.type === 4) : null;
  const activityState = customStatus ? customStatus.state : null;

  const statusCaseDiv = document.getElementById('status');

  switch (userStatus) {
    case 'online':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">online</h6>';
      statusCaseDiv.style.backgroundColor = '#2bca6d';
      break;
    case 'idle':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">idle</h6>';
      statusCaseDiv.style.backgroundColor = '#f0b232';
      break;
    case 'dnd':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-1px;">dnd</h6>';
      statusCaseDiv.style.backgroundColor = '#f23f43';
      break;
    case 'offline':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-2px;">offline</h6>';
      statusCaseDiv.style.backgroundColor = '#c4cbda';
      break;
    default:
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">¯\_(ツ)_/¯</h6>';
      statusCaseDiv.style.backgroundColor = '#23a459';
  }

/* const listeningToSpotify = activities ? activities.some(activity => activity.type === 2 && activity.name === 'Spotify') : false;

if (listeningToSpotify) {
  const spotifyActivity = activities.find(activity => activity.type === 2 && activity.name === 'Spotify');

  setTimeout(() => {
    document.getElementById('listening-to-spotify').style.opacity = '1';
  document.getElementById('discord-activity-section').style.opacity = '1';
  }, 300);
  const spotifyActivityDiv = document.getElementById('listening-to-spotify');
  const trackId = spotifyActivity.sync_id;
  const songName = spotifyActivity.details;
  const artist = spotifyActivity.state;
  const album = spotifyActivity.assets.large_text;
  const albumCover = `https://i.scdn.co/image/${spotifyActivity.assets.large_image.slice(8)}`;

  const spotifyActivityTitle = document.getElementById('listening-to-spotify-text');
  spotifyActivityTitle.innerHTML = 
  'LISTENING TO SPOTIFY' + 
  '<div style="width: 34px;height: 32px;background-color:var(--tooltip-background);z-index:1;position: relative;border-bottom-left-radius: 50%;border-top-right-radius:8px;margin-top:-10px;float:right;"><i style="margin-right:8px;margin-top:6px;font-size:20px;float:right;color:#1ed760;" class="fa-brands fa-spotify"></i></div>';
  const songNameElement = document.getElementById('listening-to-spotify-song');
  songNameElement.innerText = songName;

  const artistElement = document.getElementById('listening-to-spotify-artist');
  artistElement.innerText = 'by ' + artist;

  const albumElement = document.getElementById('listening-to-spotify-album');
  albumElement.innerText = 'on ' + album;

  const albumCoverElement = document.getElementById('listening-to-spotify-cover');
  albumCoverElement.src = albumCover;
  albumCoverElement.setAttribute('title', songName + '\n' + artist);

  const spotifyLinkElement = document.getElementById('play-on-spotify-link');
  spotifyLinkElement.href = `https://open.spotify.com/track/${trackId}`;

  // Get the initial timestamps and calculate the total time
  const spotifyTimestamps = spotifyActivity.timestamps;
  const spotifyStartTime = spotifyTimestamps.start;
  const spotifyEndTime = spotifyTimestamps.end;
  const spotifyTotalTime = new Date(spotifyEndTime - spotifyStartTime);

  // Check if an elapsed time element already exists and remove it
  const spotifyElapsedTimeWrapper = document.getElementById('listening-to-spotify-elapsed-time-wrapper');
  if (spotifyElapsedTimeWrapper) {
    spotifyElapsedTimeWrapper.remove();
  }

  // Create a new element for the elapsed time
  const spotifyElapsedTimeWrapperNew = document.createElement('div');
  spotifyElapsedTimeWrapperNew.id = 'listening-to-spotify-elapsed-time-wrapper';
  spotifyElapsedTimeWrapperNew.style.marginLeft = '0px';
  spotifyElapsedTimeWrapperNew.style.marginTop = '8px';

  const spotifyElapsedTimeDisplayLeft = document.createElement('h6');
  spotifyElapsedTimeDisplayLeft.id = 'listening-to-spotify-elapsed-time-left';
  spotifyElapsedTimeDisplayLeft.style.whiteSpace = 'nowrap';
  spotifyElapsedTimeDisplayLeft.style.overflow = 'hidden';
  spotifyElapsedTimeDisplayLeft.style.textOverflow = 'ellipsis';
  spotifyElapsedTimeDisplayLeft.style.fontSize = '1rem';


  const spotifyElapsedTimeDisplayRight = document.createElement('h6');
  spotifyElapsedTimeDisplayRight.id = 'listening-to-spotify-elapsed-time-right';
  spotifyElapsedTimeDisplayRight.style.whiteSpace = 'nowrap';
  spotifyElapsedTimeDisplayRight.style.overflow = 'hidden';
  spotifyElapsedTimeDisplayRight.style.textOverflow = 'ellipsis';
  spotifyElapsedTimeDisplayRight.style.fontSize = '1rem';
  spotifyElapsedTimeDisplayRight.style.marginLeft = 'auto';


  spotifyElapsedTimeWrapperNew.appendChild(spotifyElapsedTimeDisplayLeft);
  spotifyElapsedTimeWrapperNew.appendChild(spotifyElapsedTimeDisplayRight);
  artistElement.parentNode.insertBefore(spotifyElapsedTimeWrapperNew, albumElement.nextSibling);

  const updateElapsedTime = () => {
    // Get the latest timestamps and calculate the elapsed time
    const spotifyTimestamps = spotifyActivity.timestamps;
    const spotifyStartTime = spotifyTimestamps.start;
    const spotifyEndTime = spotifyTimestamps.end;
    const elapsed = Date.now() - spotifyStartTime;
  
    const elapsedDisplay = new Date(elapsed);
    let leftTimeDisplay = `${elapsedDisplay.getUTCMinutes().toString().padStart(2, '0')}:${elapsedDisplay.getUTCSeconds().toString().padStart(2, '0')}`;
    let rightTimeDisplay = `${spotifyTotalTime.getUTCMinutes().toString().padStart(2, '0')}:${spotifyTotalTime.getUTCSeconds().toString().padStart(2, '0')}`;
  
    if ((spotifyEndTime - spotifyStartTime) >= 3600000) { // 3600000 is the number of milliseconds in an hour
      const hours = elapsedDisplay.getUTCHours();
      leftTimeDisplay = `${(hours < 10 ? hours.toString() : hours.toString().padStart(2, '0'))}:${leftTimeDisplay}`;
      const totalHours = spotifyTotalTime.getUTCHours();
      rightTimeDisplay = `${(totalHours < 10 ? totalHours.toString() : totalHours.toString().padStart(2, '0'))}:${rightTimeDisplay}`;
    } else if (elapsedDisplay.getUTCMinutes() < 10) {
      leftTimeDisplay = `${elapsedDisplay.getUTCMinutes()}:${elapsedDisplay.getUTCSeconds().toString().padStart(2, '0')}`;
      rightTimeDisplay = `${spotifyTotalTime.getUTCMinutes()}:${spotifyTotalTime.getUTCSeconds().toString().padStart(2, '0')}`;
    }
  
    spotifyElapsedTimeDisplayLeft.innerText = leftTimeDisplay;
    spotifyElapsedTimeDisplayRight.innerText = rightTimeDisplay;
  };

// Check if a progress bar element already exists and remove it
const spotifyProgressBarWrapper = document.getElementById('listening-to-spotify-progress-bar-wrapper');

if (spotifyProgressBarWrapper) {
  spotifyProgressBarWrapper.remove();
}

// Create a new element for the progress bar
const spotifyProgressBarWrapperNew = document.createElement('div');
spotifyProgressBarWrapperNew.id = 'listening-to-spotify-progress-bar-wrapper';
spotifyProgressBarWrapperNew.style.width = '100%';
spotifyProgressBarWrapperNew.style.height = '4px';
spotifyProgressBarWrapperNew.style.backgroundColor = 'var(--spotify-progress-background)';
spotifyProgressBarWrapperNew.style.borderRadius = '4px';
spotifyProgressBarWrapperNew.style.marginTop = '4px';

const spotifyProgressBar = document.createElement('div');
spotifyProgressBar.style.width = '0%';
spotifyProgressBar.style.height = '100%';
spotifyProgressBar.style.backgroundColor = 'var(--spotify-progress)';
spotifyProgressBar.style.borderRadius = '4px';

spotifyProgressBarWrapperNew.appendChild(spotifyProgressBar);
artistElement.parentNode.insertBefore(spotifyProgressBarWrapperNew, albumElement.nextSibling);

const updateProgressBar = () => {
  // Get the latest timestamps and calculate the elapsed time
  const spotifyTimestamps = spotifyActivity.timestamps;
  const spotifyStartTime = spotifyTimestamps.start;
  const spotifyEndTime = spotifyTimestamps.end;
  const elapsed = Date.now() - spotifyStartTime;
  const elapsedPercentage = (elapsed / spotifyTotalTime) * 100;

  // Set the width of the progress bar to the calculated percentage
  spotifyProgressBar.style.width = `${elapsedPercentage}%`;
};

updateProgressBar();
setInterval(updateProgressBar, 1000);

updateElapsedTime();
setInterval(updateElapsedTime, 1000);
 
document.getElementById('discord-about-connections-container').style.marginTop = '-4px';
document.getElementById('discord-activity-section').style.height = '190px';
document.getElementById('bottom-spotify-divider').style.height = '1px';
} else {
  setTimeout(() => {
    document.getElementById('listening-to-spotify').style.opacity = '0';
  document.getElementById('discord-activity-section').style.opacity = '0';
  }, 300);
  document.getElementById('discord-activity-section').style.height = '0px';
  document.getElementById('bottom-spotify-divider').style.height = '0px';
  document.getElementById('discord-activity-section').style.opacity = '0';
  document.getElementById('discord-about-connections-container').style.marginTop = '-16px';
} */

  const discordUser = data.discord_user;
  if (discordUser) {
    const avatarHash = discordUser.avatar;
    const discordusername = `${discordUser.username}`;
    const discordtag = `${discordUser.discriminator}`;

const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${avatarHash}.png?size=256`;

const avatarLinkElement = document.getElementById('pfp_link');
avatarLinkElement.href = `https://discordapp.com/users/${discordUser.id}`;
avatarLinkElement.target = '_blank';

const avatarImgElement = document.getElementById('pfp');
avatarImgElement.src = avatarUrl;

const usernameElement = document.getElementById('username');
usernameElement.innerText = discordusername;
const usernameTagElement = document.createElement('span'); // Create the <span> element
usernameTagElement.id = 'tag'; // Set its ID to 'discord-username-tag'
usernameTagElement.innerText = '#' + discordtag;
usernameTagElement.style.color = 'var(--wing1';
usernameElement.appendChild(usernameTagElement); // Append the <span> element to the <h6> element


// Get the <h6> element
const h6Element = document.getElementById("username");

// Get the copy button element
const copyButton = document.getElementById("username");

// Define the copyTextToClipboard function
function copyTextToClipboard() {
  // Get the dynamic text from the <h6> element
  const dynamicText = h6Element.innerText;

  // Create a temporary <textarea> element
  const textarea = document.createElement("textarea");
  textarea.value = dynamicText;

  // Append the <textarea> element to the document
  document.body.appendChild(textarea);

  // Select the text in the <textarea> element
  textarea.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the <textarea> element from the document
  document.body.removeChild(textarea);

  // Change the text within the button to "Copied to clipboard"
  copyButton.innerText = "copied!";

  // Remove the event listener from the copy button for 1 second
  copyButton.removeEventListener("click", copyTextToClipboard);
  setTimeout(function() {
    copyButton.addEventListener("click", copyTextToClipboard);
    copyButton.innerText = discordusername;
    const usernameTagElement = document.createElement('span'); // Create the <span> element
    usernameTagElement.id = 'discord-username-tag'; // Set its ID to 'discord-username-tag'
    usernameTagElement.innerText = '#' + discordtag;
    usernameTagElement.style.color = '#b5bac1';
    copyButton.appendChild(usernameTagElement); // Append the <span> element to the <h6> element
  }, 1000);

  // Add a class to the copy button for 2 seconds, then remove it
  copyButton.classList.add("discord-user-copied-anim");
  setTimeout(function() {
    copyButton.classList.remove("discord-user-copied-anim");
  }, 1000);
}

// Add an event listener to the copy button
copyButton.addEventListener("click", copyTextToClipboard);}}
