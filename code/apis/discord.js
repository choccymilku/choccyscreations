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

        // Hide the preloader_tester div
        setTimeout(() => {
        const preloaderDiv = document.getElementById('preloader_tester');
        preloaderDiv.style.display = 'none';
        }, 150);
  });

  ws.addEventListener('error', event => {
    console.error('WebSocket error', event);
  });

  ws.addEventListener('close', event => {
    console.log('📰 lanyard WebSocket disconnected!');
    connected = false;
    // Reconnect after a timeout (e.g., 5 seconds)
    reconnectTimeout = setTimeout(() => connect(), 0);
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

  /* const activityDiv = document.getElementById('discord-status');
const activityDiv2 = document.getElementById('discord_status');
const emojidiv = document.getElementById('status-emoji');
activityDiv.setAttribute('title', activityState);

if (activityState) {
  activityDiv.innerText = activityState;
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

  activityDiv.style.marginLeft = '32px'; // Set discord-status marginLeft to 32px
} else {
  emojiDiv.innerHTML = '';
  activityDiv2.style.display = 'none'; // Set activityDiv2 display to none
}

// Add this code block
setTimeout(() => {
  if (emojiData || activityState) {
    activityDiv2.style.display = 'block'; // Set activityDiv2 display to block
  } else {
    activityDiv2.style.display = 'none'; // Set activityDiv2 display to none
  }
}, 900); // Timeout of 1000ms for hiding and showing discord-status */

  
  
/* let startTime;

const type0Activities = activities ? activities.filter(activity => activity.type === 0) : [];

if (type0Activities.length > 0) {
  const activitySection = document.getElementById('discord-activity-section');
  activitySection.style.display = 'block';

  type0Activities.forEach(activity => {
    const existingActivityContainer = activitySection.querySelector(`[data-activity-type="${activity.type}"]`);
    if (existingActivityContainer) {
      return; // container already exists, skip creating a new one
    }

    const fallbackImageURL = 'https://example.com/fallback-image.jpg';

    const activityContainer = document.createElement('div');
    activityContainer.className = 'activity-container';
    activityContainer.setAttribute('data-activity-type', activity.type);

    const activityInfo = document.createElement('div');
    activityInfo.className = 'activity-info';
    activityInfo.setAttribute('data-activity-type', activity.type);

    const stateContainer = document.createElement('h6');
    stateContainer.className = 'state-container';
    stateContainer.innerText = activity.state;

    const activityInfoDiv = document.createElement('div');
    activityInfoDiv.id = 'activity-info';

    const nameDiv = document.createElement('h6');
    nameDiv.className = 'activity-name';
    nameDiv.innerText = activity.name;
    nameDiv.setAttribute('title', activity.name);

    const nameDiv2 = document.createElement('h6');
    nameDiv2.className = 'activity-name2';
    nameDiv2.innerText = activity.name;
    nameDiv2.setAttribute('title', activity.name);

    const detailsDiv = document.createElement('h6');
    detailsDiv.className = 'activity-details';
    detailsDiv.innerText = activity.details;
    detailsDiv.setAttribute('title', activity.details);

    const imageDiv = document.createElement('div');
    imageDiv.className = 'activity-image-container';

    let largeImage = activity.assets.large_image;

    // check if "Premid" is present in the URL, and construct the image URLs accordingly
    if (largeImage.includes('mp:external')) {
      largeImage = `https://media.discordapp.net/external/${largeImage.split('/').slice(1).join('/')}?size=512`;
    } else {
      largeImage = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${largeImage}?size=512`;
    }

    const image = document.createElement('img');
    image.className = 'activity-image';
    image.src = largeImage;
    image.onerror = function() {
      // If the image fails to load, set the fallback image
      this.src = fallbackImageURL;
    };
    
    imageDiv.appendChild(image);
    

    const timeDiv = document.createElement('div');
    timeDiv.className = 'activity-time';
    if (activity.name === 'Quaver') {
      timeDiv.style.display = 'block';
      const startTime = new Date(activity.created_at).getTime();
      
      const quaverTimeDiv = document.createElement('h6');
      quaverTimeDiv.className = 'activity-quaver-time';

      timeDiv.style.marginTop = '-96px';
      timeDiv.style.fontSize = '32px';
      
      function updateRemainingTime() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        
        const hours = Math.max(Math.floor(elapsedTime / (1000 * 60 * 60)), 0).toString().padStart(2, '0');
        const minutes = Math.max(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)), 0).toString().padStart(2, '0');
        const seconds = Math.max(Math.floor((elapsedTime % (1000 * 60)) / 1000), 0).toString().padStart(2, '0');
        
        quaverTimeDiv.innerText = `${hours}:${minutes}:${seconds} elapsed`;
      }
      
      updateRemainingTime();
      const intervalId = setInterval(updateRemainingTime, 1000);
      
      timeDiv.appendChild(quaverTimeDiv);
    }
    
     else {
      function updateElapsedTime() {
        const startTime = activity.timestamps.start;
        const endTime = Date.now();
        const elapsedTime = new Date(endTime - startTime);

        const hours = elapsedTime.getUTCHours();
        const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
        const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');

        const elapsed = hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;

        timeDiv.innerText = `${elapsed} elapsed`;
      }

      updateElapsedTime();
      setInterval(updateElapsedTime, 1000);
    }

    imageDiv.appendChild(nameDiv);
    activityInfoDiv.appendChild(nameDiv2);
    activityInfoDiv.appendChild(detailsDiv);
    activityInfoDiv.appendChild(stateContainer);
    activityInfoDiv.appendChild(timeDiv);

    activityInfo.appendChild(activityInfoDiv);

    activityContainer.appendChild(imageDiv);
    activityContainer.appendChild(activityInfo);

    activitySection.appendChild(activityContainer);
  });
} else {
  const activitySection = document.getElementById('discord-activity-section');
  activitySection.style.display = 'none';
}  */

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
spotifyProgressBarWrapperNew.style.backgroundColor = 'var(--modal_background)';
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


const spotify = document.getElementById('listening-to-spotify');
spotify.style.display = 'block';
 
} else {
  // remove cover image
  const spotify = document.getElementById('listening-to-spotify');
  spotify.style.display = 'none';
}

  const discordUser = data.discord_user;
  if (discordUser) {
    const avatarHash = discordUser.avatar;
/*     const discordusername = `${discordUser.username}`;
    const discordtag = `${discordUser.discriminator}`; */

const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${avatarHash}.png?size=512`;

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
