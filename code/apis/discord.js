const discordurl = `https://discordlookup.mesavirep.xyz/v1/user/${discord_user_id}`;

fetch(discordurl)
  .then(response => response.json())
  .then(data => {
    const avatarHash = data.avatar.id;
    const bannerHash = data.banner.id;
    const name = data.global_name;
    const avatar = `https://cdn.discordapp.com/avatars/${discord_user_id}/${avatarHash}.png?size=512`;
    const banner = `https://cdn.discordapp.com/banners/${discord_user_id}/${bannerHash}.png?size=512`;

    document.getElementById("name").innerHTML = name + ", an artist";
    document.getElementById("pfp").src = avatar;
    document.getElementById("banner").src = banner;
    


    const avatarLinkElement = document.getElementById('pfp_link');
    avatarLinkElement.href = `https://discordapp.com/users/${discord_user_id}`;
    avatarLinkElement.target = '_blank';
  });
