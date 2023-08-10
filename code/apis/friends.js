const discordUserIds = [
  // example user IDs
  '669956621618642985', // vulpy
  '535185683325648904', // meow
  '906701264887382027', // Danny
  '768656516885774371', // prax
  '984835890608230430', // vin
  '503676030536646716', // ashy
  '1035262868586766376', // Ben
  '981935028751695943', // choi
  '926367286338674688', // Flynn
  '663160807114145809' // dalo
];

// get the friends-section-container element
const friendsContainers = document.querySelectorAll('#friends_inner, #friends_inner2');

// check if data exists in local storage and is not older than 30 minutes
const data = JSON.parse(localStorage.getItem('discordFriends'));
if (data && Date.now() - data.timestamp < 30 * 60 * 1000) {
  // generate friend elements using the saved data
  friendsContainers.forEach(friendsContainer => {
    discordUserIds.forEach(id => {
      const friendData = data[id];
      const formattedData = {
        id: id,
        username: username,
        avatar: avatar,
      };

      const container = document.createElement('div');
      container.setAttribute('id', 'friends_container');

      const avatar = document.createElement('img');
      avatar.setAttribute('src', avatar);
      avatar.setAttribute('id', 'friends_avatar');

      const name = document.createElement('h6');
      name.textContent = username;
      name.setAttribute('id', 'friends_name');
      name.title = username;

      container.appendChild(avatarBG);
      avatarBG.appendChild(avatar);
      container.appendChild(name);

      friendsContainer.appendChild(container);
    });
  });
} else {
  friendsContainers.forEach(friendsContainer => {
    Promise.all(discordUserIds.map(id => fetch(`https://discordlookup.mesavirep.xyz/v1/user/${id}`)))
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        // generate friend elements
        data.forEach(friendData => {
          const id = friendData.id;
          const formattedData = {
            id: id,
            username: username,
            avatar: avatar,
          };

          const container = document.createElement('div');
          container.setAttribute('id', 'friends_container');

          const avatar = document.createElement('img');
          avatar.setAttribute('src', avatar);
          avatar.setAttribute('id', 'friends_avatar');

          const name = document.createElement('h6');
          name.textContent = username;
          name.setAttribute('id', 'friends_name');
          name.title = username;

          container.appendChild(avatarBG);
          avatarBG.appendChild(avatar);
          container.appendChild(name);

          friendsContainer.appendChild(container);

          const savedData = JSON.parse(localStorage.getItem('discordFriends')) || {};
          savedData[id] = friendData;
          savedData.timestamp = Date.now();
          localStorage.setItem('discordFriends', JSON.stringify(savedData));
        });
      })
      .catch(error => console.error(error));

    // Add console log for the next fetch
    const timeUntilNextFetch = (Date.now() - data.timestamp) / 1000;
    console.log(`Next fetch in ${timeUntilNextFetch} seconds.`);
  });
}
