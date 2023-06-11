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
  const statusCaseText = document.getElementById('status_text');

  switch (userStatus) {
    case 'online':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">online</h6>';
      statusCaseDiv.style.backgroundColor = '#2bca6d';
      statusCaseText.textContent = 'currently online';
      break;
    case 'idle':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">idle</h6>';
      statusCaseDiv.style.backgroundColor = '#f0b232';
      statusCaseText.textContent = 'currently idleing';
      break;
    case 'dnd':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-1px;">dnd</h6>';
      statusCaseDiv.style.backgroundColor = '#f23f43';
      statusCaseText.textContent = 'do not disturb';
      break;
    case 'offline':
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;margin-left:-2px;">offline</h6>';
      statusCaseDiv.style.backgroundColor = '#c4cbda';
      statusCaseText.textContent = 'currently offline';
      break;
    default:
      //statusCaseDiv.innerHTML = '<h6 style="font-size:0.8rem;">¯\_(ツ)_/¯</h6>';
      statusCaseDiv.style.backgroundColor = '#23a459';
  }

const listeningToSpotify = activities ? activities.some(activity => activity.type === 2 && activity.name === 'Spotify') : false;

if (listeningToSpotify) {
  const spotifyActivity = activities.find(activity => activity.type === 2 && activity.name === 'Spotify');

  setTimeout(() => {
    document.getElementById('discord-activity-section').style.opacity = '1';
    document.getElementById('discord-activity-section').style.height = '100px';
    document.getElementById('username').style.marginTop = '0px';
  }, 1250);
  const spotifyActivityDiv = document.getElementById('listening-to-spotify');
  const trackId = spotifyActivity.sync_id;
  const songName = spotifyActivity.details;
  const artist = spotifyActivity.state;
  const album = spotifyActivity.assets.large_text;
  const albumCover = `https://i.scdn.co/image/${spotifyActivity.assets.large_image.slice(8)}`;

  const songNameElement = document.getElementById('listening-to-spotify-song');
  songNameElement.innerText = songName;
  const songNameElement2 = document.getElementById('listening-to-spotify-song2');
  songNameElement2.innerText = songName;

  const artistElement = document.getElementById('listening-to-spotify-artist');
  artistElement.innerText = 'by ' + artist;
  const artistElement2 = document.getElementById('listening-to-spotify-artist2');
  artistElement2.innerText = 'by ' + artist;

  const albumCoverElement = document.getElementById('listening-to-spotify-cover');
  albumCoverElement.src = albumCover;
  albumCoverElement.setAttribute('title', songName + '\n' + artist);

  const albumCoverElement2 = document.getElementById('listening-to-spotify-cover2');
  albumCoverElement2.src = albumCover;
  albumCoverElement2.setAttribute('title', songName + '\n' + artist);

  const spotifyLinkElement = document.getElementById('play-on-spotify-link');
  spotifyLinkElement.href = `https://open.spotify.com/track/${trackId}`;
  const spotifyLinkElement2 = document.getElementById('play-on-spotify-link2');
  spotifyLinkElement2.href = `https://open.spotify.com/track/${trackId}`;

  // Get the initial timestamps and calculate the total time
  const spotifyTimestamps = spotifyActivity.timestamps;
  const spotifyStartTime = spotifyTimestamps.start;
  const spotifyEndTime = spotifyTimestamps.end;
  const spotifyTotalTime = new Date(spotifyEndTime - spotifyStartTime);

  // Check if an elapsed time element already exists and remove it
  const spotifyElapsedTimeWrapper = document.getElementById('listening-to-spotify-elapsed-time-wrapper');
  const spotifyElapsedTimeWrapper2 = document.getElementById('listening-to-spotify-elapsed-time-wrapper2');
  if (spotifyElapsedTimeWrapper) {
    spotifyElapsedTimeWrapper.remove();
  }
  if (spotifyElapsedTimeWrapper2) {
    spotifyElapsedTimeWrapper2.remove();
  }

  // Create a new element for the elapsed time
  const spotifyElapsedTimeWrapperNew = document.createElement('div');
  spotifyElapsedTimeWrapperNew.id = 'listening-to-spotify-elapsed-time-wrapper';
  const spotifyElapsedTimeWrapperNew2 = document.createElement('div');
  spotifyElapsedTimeWrapperNew2.id = 'listening-to-spotify-elapsed-time-wrapper2';

  const spotifyElapsedTimeDisplayLeft = document.createElement('h6');
  spotifyElapsedTimeDisplayLeft.id = 'listening-to-spotify-elapsed-time-left';
  spotifyElapsedTimeDisplayLeft.style.whiteSpace = 'nowrap';
  spotifyElapsedTimeDisplayLeft.style.overflow = 'hidden';
  spotifyElapsedTimeDisplayLeft.style.textOverflow = 'ellipsis';
  spotifyElapsedTimeDisplayLeft.style.fontSize = '1rem';
  const spotifyElapsedTimeDisplayLeft2 = document.createElement('h6');
  spotifyElapsedTimeDisplayLeft2.id = 'listening-to-spotify-elapsed-time-left2';
  spotifyElapsedTimeDisplayLeft2.style.whiteSpace = 'nowrap';
  spotifyElapsedTimeDisplayLeft2.style.overflow = 'hidden';
  spotifyElapsedTimeDisplayLeft2.style.textOverflow = 'ellipsis';
  spotifyElapsedTimeDisplayLeft2.style.fontSize = '1rem';

  const spotifyElapsedTimeDisplayRight = document.createElement('h6');
  spotifyElapsedTimeDisplayRight.id = 'listening-to-spotify-elapsed-time-right';
  spotifyElapsedTimeDisplayRight.style.whiteSpace = 'nowrap';
  spotifyElapsedTimeDisplayRight.style.overflow = 'hidden';
  spotifyElapsedTimeDisplayRight.style.textOverflow = 'ellipsis';
  spotifyElapsedTimeDisplayRight.style.fontSize = '1rem';
  spotifyElapsedTimeDisplayRight.style.marginLeft = 'auto';
  const spotifyElapsedTimeDisplayRight2 = document.createElement('h6');
  spotifyElapsedTimeDisplayRight2.id = 'listening-to-spotify-elapsed-time-right2';
  spotifyElapsedTimeDisplayRight2.style.whiteSpace = 'nowrap';
  spotifyElapsedTimeDisplayRight2.style.overflow = 'hidden';
  spotifyElapsedTimeDisplayRight2.style.textOverflow = 'ellipsis';
  spotifyElapsedTimeDisplayRight2.style.fontSize = '1rem';
  spotifyElapsedTimeDisplayRight2.style.marginLeft = 'auto';

  spotifyElapsedTimeWrapperNew.appendChild(spotifyElapsedTimeDisplayLeft);
  spotifyElapsedTimeWrapperNew.appendChild(spotifyElapsedTimeDisplayRight);
  artistElement.parentNode.insertBefore(spotifyElapsedTimeWrapperNew, artistElement.nextSibling);
  spotifyElapsedTimeWrapperNew2.appendChild(spotifyElapsedTimeDisplayLeft2);
  spotifyElapsedTimeWrapperNew2.appendChild(spotifyElapsedTimeDisplayRight2);
  artistElement2.parentNode.insertBefore(spotifyElapsedTimeWrapperNew2, artistElement2.nextSibling);

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
    spotifyElapsedTimeDisplayLeft2.innerText = leftTimeDisplay;
    spotifyElapsedTimeDisplayRight2.innerText = rightTimeDisplay;
  };

// Check if a progress bar element already exists and remove it
const spotifyProgressBarWrapper = document.getElementById('listening-to-spotify-progress-bar-wrapper');
const spotifyProgressBarWrapper2 = document.getElementById('listening-to-spotify-progress-bar-wrapper2');

if (spotifyProgressBarWrapper) {
  spotifyProgressBarWrapper.remove();
}
if (spotifyProgressBarWrapper2) {
  spotifyProgressBarWrapper2.remove();
}

// Create a new element for the progress bar
const spotifyProgressBarWrapperNew = document.createElement('div');
spotifyProgressBarWrapperNew.id = 'listening-to-spotify-progress-bar-wrapper';
spotifyProgressBarWrapperNew.style.width = '100%';
spotifyProgressBarWrapperNew.style.height = '4px';
spotifyProgressBarWrapperNew.style.backgroundColor = 'var(--background)';
spotifyProgressBarWrapperNew.style.borderRadius = '4px';
const spotifyProgressBarWrapperNew2 = document.createElement('div');
spotifyProgressBarWrapperNew2.id = 'listening-to-spotify-progress-bar-wrapper2';
spotifyProgressBarWrapperNew2.style.width = '100%';
spotifyProgressBarWrapperNew2.style.height = '4px';
spotifyProgressBarWrapperNew2.style.backgroundColor = 'var(--background)';
spotifyProgressBarWrapperNew2.style.borderRadius = '4px';

const spotifyProgressBar = document.createElement('div');
spotifyProgressBar.style.width = '0%';
spotifyProgressBar.style.height = '100%';
spotifyProgressBar.style.backgroundColor = 'var(--iconcolor)';
spotifyProgressBar.style.borderRadius = '4px';
const spotifyProgressBar2 = document.createElement('div');
spotifyProgressBar2.style.width = '0%';
spotifyProgressBar2.style.height = '100%';
spotifyProgressBar2.style.backgroundColor = 'var(--iconcolor)';
spotifyProgressBar2.style.borderRadius = '4px';

spotifyProgressBarWrapperNew.appendChild(spotifyProgressBar);
artistElement.parentNode.insertBefore(spotifyProgressBarWrapperNew, artistElement.nextSibling);
spotifyProgressBarWrapperNew2.appendChild(spotifyProgressBar2);
artistElement2.parentNode.insertBefore(spotifyProgressBarWrapperNew2, artistElement2.nextSibling);

const updateProgressBar = () => {
  // Get the latest timestamps and calculate the elapsed time
  const spotifyTimestamps = spotifyActivity.timestamps;
  const spotifyStartTime = spotifyTimestamps.start;
  const spotifyEndTime = spotifyTimestamps.end;
  const elapsed = Date.now() - spotifyStartTime;
  const elapsedPercentage = (elapsed / spotifyTotalTime) * 100;

  // Set the width of the progress bar to the calculated percentage
  spotifyProgressBar.style.width = `${elapsedPercentage}%`;
  spotifyProgressBar2.style.width = `${elapsedPercentage}%`;
};

updateProgressBar();
setInterval(updateProgressBar, 1000);

updateElapsedTime();
setInterval(updateElapsedTime, 1000);
 
} else {
  setTimeout(() => {
  document.getElementById('discord-activity-section').style.opacity = '0';
  document.getElementById('discord-activity-section').style.height = '0px';
  document.getElementById('username').style.marginTop = '60px';
  }, 1250);
}

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
usernameTagElement.style.color = 'var(--text)';
usernameElement.appendChild(usernameTagElement); // Append the <span> element to the <h6> element

}}
