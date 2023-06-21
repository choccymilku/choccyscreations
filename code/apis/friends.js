const discordUserIds = [
  '669956621618642985',     //vulpy
  '535185683325648904',     //meow
  '906701264887382027',     //danny
  '768656516885774371',     //prax
  '981935028751695943',     //s4m
  '1035262868586766376',    //ben
  '503676030536646716',     //ashy
  '926367286338674688',     //flynn
  '980898628522627083',     //microballs
  '984835890608230430',     //vincent
];

// get the friends-section-container element
const friendsContainers = document.querySelectorAll('#friends_inner, #friends_inner2');

// check if data exists in local storage and is not older than 30 minutes
const data = JSON.parse(localStorage.getItem('discordFriends'));
if (data && Date.now() - data.timestamp < 360 * 60 * 1000) {
  // generate friend elements using the saved data
  friendsContainers.forEach(friendsContainer => {
    discordUserIds.forEach(id => {
      const friendData = data[id];
      const avatarBG = document.createElement('div');
      avatarBG.setAttribute('id', 'friends_avatar_bg');
      /*         avatarBG.style.backgroundColor = friendData.banner.color; */
  
      const avatar = document.createElement('img');
      avatar.setAttribute('src', `https://cdn.discordapp.com/avatars/${id}/${friendData.avatar.id}`);
      avatar.setAttribute('id', 'friends_avatar');
  
      const name = document.createElement('h6');
      name.textContent = friendData.tag.substring(0, friendData.tag.indexOf('#'));
      name.setAttribute('id', 'friends_name');
      name.title = friendData.tag.substring(0, friendData.tag.indexOf('#'));
  
      const container = document.createElement('div');
      container.setAttribute('id', 'friends_container');
      container.setAttribute('class', 'friends_container');
      container.appendChild(avatar);
  
      container.appendChild(avatarBG);
      avatarBG.appendChild(avatar);
      container.appendChild(name);
  
      friendsContainer.appendChild(container);
  
      if (id === '1035262868586766376') {
        const link = document.createElement('a');
        link.href = 'https://benreyland.crd.co';
        link.textContent = friendData.tag.substring(0, friendData.tag.indexOf('#'));
        link.target = '_blank';
        name.textContent = '';
        name.appendChild(link);
      }
      if (id === '981935028751695943') {
        const link = document.createElement('a');
        link.href = 'https://rentry.org/binarystarz';
        link.textContent = friendData.tag.substring(0, friendData.tag.indexOf('#'));
        link.target = '_blank';
        name.textContent = '';
        name.appendChild(link);
      }
  
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
          const container = document.createElement('div');
          container.setAttribute('id', 'friends_container');
  
          const avatarBG = document.createElement('div');
          avatarBG.setAttribute('id', 'friends_avatar_bg');
          /*         avatarBG.style.backgroundColor = friendData.banner.color; */
  
          const avatar = document.createElement('img');
          avatar.setAttribute('src', `https://cdn.discordapp.com/avatars/${id}/${friendData.avatar.id}`);
          avatar.setAttribute('id', 'friends_avatar');
  
          const name = document.createElement('h6');
          name.textContent = friendData.tag.substring(0, friendData.tag.indexOf('#'));
          name.setAttribute('id', 'friends_name');
          name.title = friendData.tag.substring(0, friendData.tag.indexOf('#'));
  
          container.appendChild(avatarBG);
          avatarBG.appendChild(avatar);
          container.appendChild(name);
  
          if (id === '1035262868586766376') {
            const link = document.createElement('a');
            link.href = 'https://benreyland.crd.co';
            link.textContent = friendData.tag.substring(0, friendData.tag.indexOf('#'));
            link.target = '_blank';
            name.textContent = '';
            name.appendChild(link);
          }
          if (id === '981935028751695943') {
            const link = document.createElement('a');
            link.href = 'https://rentry.org/binarystarz';
            link.textContent = friendData.tag.substring(0, friendData.tag.indexOf('#'));
            link.target = '_blank';
            name.textContent = '';
            name.appendChild(link);
          }
  
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
