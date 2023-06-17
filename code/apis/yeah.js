const discordUserIds = [
    '669956621618642985',     //vulpy
    '535185683325648904',     //meow
    '981935028751695943',     //s4m
    '663160807114145809',     //dalo
    '926367286338674688',     //flynn
    '503676030536646716',     //ashy
    '768656516885774371',     //prax
    '1035262868586766376',    //ben
    '762082356252770304',     //alice
    '906701264887382027',     //danny
    '980898628522627083',     //microballs
    '984835890608230430',     //vincent
  ];
  
  const friendsContainer = document.querySelector('#friends_inner');
  
  function fetchDataAndSave() {
    Promise.all(discordUserIds.map(id => fetch(`https://discordlookup.mesavirep.xyz/v1/user/${id}`)))
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        data.forEach(friendData => {
          const id = friendData.id;
          const container = document.createElement('div');
          container.setAttribute('id', 'friends_container');
  
          const avatarBG = document.createElement('div');
          avatarBG.setAttribute('id', 'friends_avatar_bg');
          avatarBG.style.backgroundColor = friendData.banner.color;
  
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
  
          friendsContainer.appendChild(container);
  
          const savedData = JSON.parse(localStorage.getItem('discordFriends')) || {};
          savedData[id] = friendData;
          savedData.timestamp = Date.now();
          localStorage.setItem('discordFriends', JSON.stringify(savedData));
        });
      })
      .catch(error => console.error(error));
  }
  
  function fetchDataAndRepeat() {
    fetchDataAndSave();
    setTimeout(fetchDataAndRepeat, 30 * 60 * 1000); // Fetch data every 30 minutes
  }
  
  const data = JSON.parse(localStorage.getItem('discordFriends'));
  if (data && Date.now() - data.timestamp < 360 * 60 * 1000) {
    discordUserIds.forEach(id => {
      const friendData = data[id];
      const avatarBG = document.createElement('div');
      avatarBG.setAttribute('id', 'friends_avatar_bg');
      avatarBG.style.backgroundColor = friendData.banner.color;

      const avatar = document.createElement('img');
      avatar.setAttribute('src', `https://cdn.discordapp.com/avatars/${id}/${friendData.avatar.id}`);
      avatar.setAttribute('id', 'friends_avatar');

      const name = document.createElement('h6');
      friendData.tag = friendData.tag.substring(0, friendData.tag.indexOf('#'));
      name.textContent = friendData.tag;
      name.setAttribute('id', 'friends_name');
      
      const container = document.createElement('div');
      container.setAttribute('id', 'friends_container');
      container.setAttribute('class', 'friends_container');
      container.appendChild(avatar);
  
      container.appendChild(avatarBG);
      avatarBG.appendChild(avatar);
      container.appendChild(name);

      friendsContainer.appendChild(container);
  
      if (id === '762082356252770304') {
        name.textContent = 'Alice';
      }
      if (id === '1035262868586766376') {
        const link = document.createElement('a');
        link.href = 'https://benreyland.crd.co';
        link.target = '_blank';
        link.textContent = 'benrey';
        name.textContent = '';
        name.appendChild(link);
      }
  
      container.appendChild(name);
      friendsContainer.appendChild(container);
    });
  }
  
  fetchDataAndRepeat();
  