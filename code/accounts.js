const accountUrls = {
    twitter: "https://twitter.com/",
    twitch: "https://www.twitch.tv/",
    youtube: "https://www.youtube.com/channel/",
    instagram: "https://www.instagram.com/",
    spotify: "https://open.spotify.com/user/",
    github: "https://github.com/",
    reddit: "https://www.reddit.com/user/",
    steam: "https://steamcommunity.com/profiles/",
    tiktok: "https://www.tiktok.com/@",
    facebook: "https://www.facebook.com/",
  };
  
  function fetchAndUpdateIcons() {
    fetch(`https://dcdn.dstn.to/profile/${discord_user_id}`)
      .then(response => response.json())
      .then(data => {
    

/*         // Check if banner exists or not
        if (data.user.banner) {
          // Banner exists, set the banner as the image source
          let bannerUrl = `https://cdn.discordapp.com/banners/${discord_user_id}/${data.user.banner}?size=1024`;
          document.getElementById('discord-banner').src = bannerUrl;
        } else {
          // Banner does not exist, set the banner color as the background color
          let bannerColor = data.user.banner_color;
          document.getElementById('discord-banner').style.backgroundColor = bannerColor;
        }   */

  

        const connections = data.connected_accounts;
        const connectionsContainer = document.getElementById("accounts");
  
        // Clear the existing icons
        connectionsContainer.innerHTML = "";
  
        const userPreference = getUserPreference();
        const mode = getAppliedMode(userPreference);
  
        for (const conn of connections) {
          if (conn.type === "epicgames" || conn.type === "leagueoflegends" || conn.type === "riotgames"  || conn.type === "crunchyroll" || conn.type === "battlenet") {
            // Skip Epic Games, League of Legends, Riot Games, and Xbox connections
            continue;
          }
  
          const connDiv = document.createElement("div");
          connDiv.classList.add("connection-div");
          connDiv.classList.add("connection-" + `${conn.type}`);
  
          const icon = document.createElement("i");
          icon.classList.add("fa-brands", "fa-" + `${conn.type}`, "icon-style", "connection-icons");
          connDiv.appendChild(icon);
  
          connectionsContainer.appendChild(connDiv);
  
          let url = accountUrls[conn.type] + conn.id;
  
          if (conn.type === "tiktok" || conn.type === "twitter" || conn.type === "reddit" || conn.type === "instagram" || conn.type === "twitch" || conn.type === "github") {
            url = accountUrls[conn.type] + conn.name;
          }
          let connectionType = conn.name;
  
          const container = document.createElement("div");
          container.classList.add("connection-container");
  
          const link = document.createElement("a");
  
          if (conn.type !== "xbox" || conn.type !== "battle-net" || conn.type !== "crunchyroll") {
            link.appendChild(icon);
            link.href = url;
            link.target = "_blank";
          }
          
          container.appendChild(link);
  
          const title = document.createElement("div");
          title.innerText = connectionType;
          title.classList.add("connection-title");
  
          connDiv.appendChild(container);
          connDiv.appendChild(title);
          connDiv.classList.add("noselect");
  
          connectionsContainer.appendChild(connDiv);
        }
      });
  }
  
  
  // Call the fetchAndUpdateIcons function initially
  fetchAndUpdateIcons();
  