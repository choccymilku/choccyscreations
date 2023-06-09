const username = 'chocolateychoccy';
const url = `https://en.pronouns.page/api/profile/get/${username}?version=2`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Get the "flags" value from the response
    const flags = data.profiles.en.flags;
    const customFlags = data.profiles.en.customFlags;
    const pronouns = data.profiles.en.pronouns;

// Get the container for the pronouns
const pronounspagePronounsContainer = document.getElementById("pronouns");

// Generate an array of pronoun values
const pronounValues = pronouns.map(pronoun => pronoun.value);

// Create a <span> element to hold the pronoun values
const pronounSpan = document.createElement("span");
pronounSpan.textContent = pronounValues.join("/") + " pronouns";
pronounSpan.className = "pronoun-values";

// Create a text node for the comma
const commaTextNode = document.createTextNode(", ");

// Append the <span> element and comma to the container
pronounspagePronounsContainer.appendChild(pronounSpan);
pronounspagePronounsContainer.appendChild(commaTextNode);






    const generateFlagElement = (flag) => {
      const flagUrl = `https://en.pronouns.page/flags/${flag}.png`;
      const terminologyUrl = `https://aromantic.fandom.com/wiki/${flag}`;
      const flagLink = document.createElement('a');
      flagLink.href = terminologyUrl;
      flagLink.target = '_blank';
      flagLink.textContent = flag.toLowerCase() + ' '; // Add an extra space after the flag name
      flagLink.className = 'flag-name';

      const flagImg = document.createElement('img');
      flagImg.src = flagUrl;
      flagImg.alt = flag;
      flagImg.className = 'flag-emojis';

      flagLink.appendChild(flagImg);
      return flagLink;
    };

    const generateCustomFlagElement = (customFlag) => {
      const customFlagUrl = `https://dclu0bpcdglik.cloudfront.net/images/${customFlag.value}-flag.png`;
      const customFlagName = customFlag.name;
      const customFlagLink = document.createElement('a');
      customFlagLink.href = customFlag.link;
      customFlagLink.target = '_blank';
      customFlagLink.textContent = customFlagName.toLowerCase() + ' '; // Add an extra space after the flag name
      customFlagLink.className = 'flag-name';

      const customFlagImg = document.createElement('img');
      customFlagImg.src = customFlagUrl;
      customFlagImg.alt = customFlag.name;
      customFlagImg.className = 'flag-emojis';

      customFlagLink.appendChild(customFlagImg);
      return customFlagLink;
    };

    // Combine flags and customFlags into one array
    const allFlags = Array.isArray(flags) ? flags : [flags];
    const allCustomFlags = Array.isArray(customFlags) ? customFlags : [customFlags];
    const combinedFlags = [...allFlags, ...allCustomFlags];

    // Generate flag elements
    const flagElements = combinedFlags.map((flag, index) => {
      if (typeof flag === 'string') {
        return generateFlagElement(flag, index === combinedFlags.length - 1);
      } else {
        return generateCustomFlagElement(flag);
      }
    });

    // Replace the "flags" element with flag elements
    const flagsContainer = document.getElementById('flags');
    while (flagsContainer.firstChild) {
      flagsContainer.removeChild(flagsContainer.firstChild);
    }
    flagElements.forEach(flag => {
      flagsContainer.appendChild(flag);
    });

    // Additional code for separating flags with commas and ampersands if there are multiple flags
    if (flagElements.length > 1) {
      const ampersand = document.createElement('span');
      ampersand.textContent = ' & ';

      flagElements.forEach((flag, index) => {
        if (index > 0) {
          if (index === flagElements.length - 1) {
            flag.parentNode.insertBefore(ampersand.cloneNode(true), flag);
          } else {
            const comma = document.createElement('span');
            comma.textContent = ', ';
            flag.parentNode.insertBefore(comma, flag);
          }
        }
      });
    }
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });
