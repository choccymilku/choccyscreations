let ws;
let connected = false;
let reconnectTimeout;

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
    connected = true;
  });

  ws.addEventListener('error', event => {
    console.error('WebSocket error', event);
  });

  ws.addEventListener('close', event => {
    console.log('📰 lanyard WebSocket disconnected!');
    connected = false;
    // Reconnect after a timeout (e.g., 5 seconds)
    reconnectTimeout = setTimeout(() => connect(), 5000);
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

function updateStatus(data) {
  // Update the status logic here
}

function startWebSocket() {
  if (!connected) {
    connect();
  }
}

function stopWebSocket() {
  if (connected) {
    ws.close();
    clearTimeout(reconnectTimeout);
    connected = false;
  }
}

// Start the WebSocket connection
startWebSocket();


function updateStatus(data) {
  const userStatus = data.discord_status;

const activities = data.activities;
  const customStatus = activities ? activities.find(activity => activity.type === 4) : null;
  const activityState = customStatus ? customStatus.state : null;

  const statusCaseDiv = document.getElementById('status');
/*   const statusCaseText = document.getElementById('status_text'); */

  switch (userStatus) {
    case 'online':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">online</h6>';
      statusCaseDiv.style.backgroundColor = '#2bca6d';
/*       statusCaseText.textContent = 'currently online'; */
      break;
    case 'idle':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">idle</h6>';
      statusCaseDiv.style.backgroundColor = '#f0b232';
/*       statusCaseText.textContent = 'currently idleing'; */
      break;
    case 'dnd':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-1px;">dnd</h6>';
      statusCaseDiv.style.backgroundColor = '#f23f43';
/*       statusCaseText.textContent = 'do not disturb'; */
      break;
    case 'offline':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-2px;">offline</h6>';
      statusCaseDiv.style.backgroundColor = '#7e828c';
/*       statusCaseText.textContent = 'currently offline'; */
      break;
    default:
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">¯\_(ツ)_/¯</h6>';
      statusCaseDiv.style.backgroundColor = '#23a459';
  }

  const activityDiv = document.getElementById('discord-status');
  const activityDiv2 = document.getElementById('discord_status');
  const emojidiv = document.getElementById('status-emoji');
  activityDiv.setAttribute('title', activityState);
  
  if (activityState) {
    const trimmedState = activityState.substring(0, 100); // Limit the status to 100 characters
    activityDiv.innerText = trimmedState;
  } else {
    activityDiv.innerText = '';
  }
  
  const emoji = activities ? activities.find(activity => activity.type === 4) : null;
  const emojiData = emoji ? emoji.emoji : null;
  
  const emojiDiv = document.getElementById('status-emoji');
  
  if (emojiData && emojiData.name && !emojiData.id) {
    // If the response includes only emoji, show the emoji character
    const emojiChar = emojiData.name;
    emojiDiv.innerHTML = twemoji.parse(emojiChar);
  
    activityDiv.style.marginLeft = '36px'; // Set discord-status marginLeft to 36px
  } else if (emojiData && emojiData.id) {
    // If the response includes both the ID and the name, generate the URL for the image
    const emojiId = emojiData.id;
    const emojiName = encodeURIComponent(emojiData.name);
    let emojiUrl;
    if (emojiData.name.match(/[\u{1F300}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}]/gu)) {
      // If the emoji is a Unicode emoji, use twemoji to resolve the URL
      emojiUrl = twemoji.parse(emojiData.name, {
        folder: 'svg',
        ext: '.svg',
      });
    } else {
      // Otherwise, construct the URL using the emoji ID and other properties
      emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.${emojiData.animated ? 'gif' : 'webp'}?size=48&name=${emojiName}&quality=lossless`; // Check for `animated` property
    }
  
    // Create a new image element
    const emojiImg = document.createElement('img');
    emojiImg.className = 'emoji-status';
    emojiImg.src = emojiUrl;
  
    // Replace the content of the emojiDiv with the new image element
    emojiDiv.innerHTML = '';
    emojiDiv.appendChild(emojiImg);
  
    activityDiv.style.marginLeft = '36px'; // Set discord-status marginLeft to 36px
  } else {
    emojiDiv.innerHTML = '';
    activityDiv2.style.display = 'none'; // Set activityDiv2 display to none
  }
  
  if (!emojiData && !activityState) {
    activityDiv2.style.display = 'none'; // Set activityDiv2 display to none
  } else {
    activityDiv2.style.display = 'block'; // Set activityDiv2 display to block
  }
  
  

const listeningToSpotify = activities ? activities.some(activity => activity.type === 2 && activity.name === 'Spotify') : false;

if (listeningToSpotify) {
  const spotifyActivity = activities.find(activity => activity.type === 2 && activity.name === 'Spotify');

  const spotifyActivityDiv = document.getElementById('listening-to-spotify');
  const trackId = spotifyActivity.sync_id;
  const songName = spotifyActivity.details;
  const artist = spotifyActivity.state;
  const album = spotifyActivity.assets.large_text;
  const albumCover = `https://i.scdn.co/image/${spotifyActivity.assets.large_image.slice(8)}`;

  const songNameElement = document.getElementById('listening-to-spotify-song');
  songNameElement.innerText = songName;

  const artistElement = document.getElementById('listening-to-spotify-artist');
  artistElement.innerText = 'by ' + artist;

  const albumCoverElement = document.getElementById('listening-to-spotify-cover');
  albumCoverElement.src = albumCover;
  albumCoverElement.setAttribute('title', songName + '\n' + 'by ' + artist);

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
  artistElement.parentNode.insertBefore(spotifyElapsedTimeWrapperNew, artistElement.nextSibling);

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
spotifyProgressBarWrapperNew.style.backgroundColor = 'var(--item_background)';
spotifyProgressBarWrapperNew.style.borderRadius = '4px';

const spotifyProgressBar = document.createElement('div');
spotifyProgressBar.style.width = '0%';
spotifyProgressBar.style.height = '100%';
spotifyProgressBar.style.backgroundColor = 'var(--icon)';
spotifyProgressBar.style.borderRadius = '4px';

spotifyProgressBarWrapperNew.appendChild(spotifyProgressBar);
artistElement.parentNode.insertBefore(spotifyProgressBarWrapperNew, artistElement.nextSibling);

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



 
} else {
}

  const discordUser = data.discord_user;
  if (discordUser) {
    const avatarHash = discordUser.avatar;
/*     const discordusername = `${discordUser.username}`;
    const discordtag = `${discordUser.discriminator}`; */

const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${avatarHash}.png?size=256`;

const avatarLinkElement = document.getElementById('pfp_link');
avatarLinkElement.href = `https://discordapp.com/users/${discordUser.id}`;
avatarLinkElement.target = '_blank';

const avatarImgElement = document.getElementById('pfp');
avatarImgElement.src = avatarUrl;
/* 
const usernameElement = document.getElementById('username');
usernameElement.innerText = discordusername;
const usernameTagElement = document.createElement('span'); // Create the <span> element
usernameTagElement.id = 'tag'; // Set its ID to 'discord-username-tag'
usernameTagElement.innerText = '#' + discordtag;
usernameTagElement.style.color = 'var(--text)';
usernameElement.appendChild(usernameTagElement); // Append the <span> element to the <h6> element */
}}
