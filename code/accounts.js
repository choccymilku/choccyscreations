fetch(`https://dcdn.dstn.to/profile/945717456163442708`)
  .then(response => response.json())
  .then(data => {
/*     if (data.premium_since !== null) {
      const premiumImage = document.getElementById('discord-nitro');
      premiumImage.src = './discord/badges/nitro.png';
      //const premiumSince = document.getElementById('discord-nitro-since');
      //const premiumDate = new Date(data.premium_since);
      //const options = { month: 'short', day: 'numeric', year: 'numeric' };
      //premiumSince.innerText = premiumDate.toLocaleDateString('en-US', options);
    } else {
      // hide discord-premium-container if user is not nitro
      const premiumImage = document.getElementById('discord-nitro');
      premiumImage.style.display = 'none';
    }
    
    // Check if banner exists or not
    if (data.user.banner) {
      // Banner exists, set the banner as the image source
      let bannerUrl = `https://cdn.discordapp.com/banners/${discord_user_id}/${data.user.banner}?size=1024`;
      document.getElementById('discord-banner').src = bannerUrl;
    } else {
      // Banner does not exist, set the banner color as the background color
      let bannerColor = data.user.banner_color;
      document.getElementById('discord-banner').style.backgroundColor = bannerColor;
    } */


  const accountUrls = {
    twitter: "https://twitter.com/",
    twitch: "https://www.twitch.tv/",
    youtube: "https://www.youtube.com/channel/",
    instagram: "https://www.instagram.com/",
    xbox: "https://soundcloud.com/",
    spotify: "https://open.spotify.com/user/",
    github: "https://github.com/",
    reddit: "https://www.reddit.com/user/",
    steam: "https://steamcommunity.com/profiles/",
    tiktok: "https://www.tiktok.com/@",
    facebook: "https://www.facebook.com/",
    leagueoflegends: "https://www.leagueoflegends.com/en-us/",
  };
  
  const connections = data.connected_accounts;
  const connectionsContainer = document.getElementById("accounts");
  
  const userPreference = getUserPreference();
  const mode = getAppliedMode(userPreference);

  for (const conn of connections) {
  const connDiv = document.createElement("div");
  connDiv.classList.add("connection-div");
  connDiv.classList.add("connection-" + `${conn.type}`);

  const icon = document.createElement("img");
  icon.classList.add("connection-icons");
  icon.src = getIconPath(conn, mode);

  connDiv.appendChild(icon);

  connectionsContainer.appendChild(connDiv);

  function getIconPath(conn, mode) {
    let path = `./connections/${mode}/${conn.type}.svg`;
    // Check if the image exists, fallback to default if not
    const img = new Image();
    img.src = path;
    if (!img.complete) {
      path = `./connections/${mode}/${conn.type}.svg`;
    }
    return path;
  }

  let url;
  if (conn.type === "youtube") {
    url = accountUrls[conn.type] + conn.id;
  } else if (conn.type === "steam") {
    url = accountUrls[conn.type] + conn.id;
  } else if (conn.type === "spotify") {
    url = accountUrls[conn.type] + conn.id;
  } else if (conn.type === "tiktok") {
    url = accountUrls[conn.type] + conn.name;
  } else if (conn.type === "twitter") {
    url = accountUrls[conn.type] + conn.name;
  } else if (conn.type === "reddit") {
    url = accountUrls[conn.type] + conn.name;
  } else if (conn.type === "twitch") {
    url = accountUrls[conn.type] + conn.id;
  } else if (conn.type === "github") {
    url = accountUrls[conn.type] + conn.name;
  } else if (conn.type === "instagram") {
    url = accountUrls[conn.type] + conn.id;
  } else {
    url = accountUrls[conn.type] + conn.name;
  }
  
  let connectionType = conn.type;
  switch (connectionType) {
    case "battlenet":
      connectionType = "battle.net";
      break;
    case "crunchyroll":
      connectionType = "crunchyroll";
      break;
    case "ebay":
      connectionType = "ebay";
      break;
    case "epicgames":
      connectionType = "epic games";
      break;
    case "facebook":
      connectionType = "facebook";
      break;
    case "leagueoflegends":
      connectionType = "league of legends";
      break;
    case "paypal":
      connectionType = "paypal";
      break;
    case "playstation":
      connectionType = "playStation";
      break;
    case "xbox":
      connectionType = "xbox";
      break;
    case "riotgames":
      connectionType = "riot games";
      break;
    case "youtube":
      connectionType = "youtube";
      break;
    case "steam":
      connectionType = "steam";
      break;
    case "spotify":
      connectionType = "spotify";
      break;
    case "tiktok":
      connectionType = "tiktok";
      break;
    case "reddit":
      connectionType = "reddit";
      break;
    case "twitch":
      connectionType = "twitch";
      break;
    case "twitter":
      connectionType = "twitter";
      break;
    case "github":
      connectionType = "github";
      break;
    case "instagram":
      connectionType = "instagram";
      break;
  }
  
  const container = document.createElement("div");
  container.classList.add("connection-container");
  
  const statusIcon = document.createElement("i");
  statusIcon.addEventListener("click", () => {
    window.open(url, "_blank");
  });

  
  const link = document.createElement("a");
  link.appendChild(icon);
  link.href = url;
  link.target = "_blank";
  container.appendChild(link);
  
  connDiv.appendChild(container);
  connDiv.classList.add("noselect");
  
  connectionsContainer.appendChild(connDiv);
  }
});  
