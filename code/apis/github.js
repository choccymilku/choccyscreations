/* const apiUrl = 'https://api.github.com/users/choccymilku/repos';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const reposContainer = document.getElementById('bottom_right');

    data.forEach(repo => {
      const { name, html_url, description, created_at, language } = repo;

      const repoDiv = document.createElement('div');
      repoDiv.innerHTML = `
        <div>
          <h3>${name}</h3>
          <p><strong>URL:</strong> <a href="${html_url}" target="_blank">${html_url}</a></p>
          <p><strong>Description:</strong> ${description || 'N/A'}</p>
          <p><strong>Created At:</strong> ${created_at}</p>
          <p><strong>Language:</strong> ${language || 'N/A'}</p>
        </div>
      `;

      reposContainer.appendChild(repoDiv);
    });
  })
  .catch(error => console.error(error));
 */