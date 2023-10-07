// HTML Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');

// Event Listener for Form Submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    searchUsers(searchTerm);
  }
});

// Search Users Function
function searchUsers(query) {
  const url = `https://api.github.com/search/users?q=${query}`;
  fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayUsers(data.items);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
}

// Display Users Function
function displayUsers(users) {
  resultsDiv.innerHTML = ''; // Clear previous results
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    userCard.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}" />
      <h3>${user.login}</h3>
      <a href="${user.html_url}" target="_blank">Profile</a>
    `;
    userCard.addEventListener('click', () => {
      getUserRepos(user.login);
    });
    resultsDiv.appendChild(userCard);
  });
}

// Fetch User Repos Function
function getUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayRepos(data);
    })
    .catch(error => {
      console.error('Error fetching repositories:', error);
    });
}

// Display Repositories Function
function displayRepos(repos) {
  resultsDiv.innerHTML = ''; // Clear previous results
  const reposList = document.createElement('ul');
  reposList.classList.add('repos-list');
  repos.forEach(repo => {
    const repoItem = document.createElement('li');
    repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
    reposList.appendChild(repoItem);
  });
  resultsDiv.appendChild(reposList);
}
