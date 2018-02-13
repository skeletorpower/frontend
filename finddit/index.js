import reddit from './redditapi';


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
    // console.log(123);

    // Get search term
    const searchTerm = searchInput.value;
    // console.log(searchTerm);

    // Get sort
    const sortBy = document.querySelector('input[name = "sortBy"]:checked').value;
    // console.log(sortBy);

    // Get limit
    const searchLimit = document.getElementById('limit').value;
    // console.log(searchLimit);
    
    // Check input if empty
    if(searchTerm === ''){
        // Message
        showMessage('Please enter a search term', 'alert-danger');
    }

    // clear input
    searchInput.value = '';

    // search reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        // console.log(results);
        let output = '<div class="card-columns">';
        // loop through posts
        results.forEach(post => {
            // check for image
            const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

            output += `
            <div class="card">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
              <a href="${post.url}" target = "_blank" class="btn btn-primary">Read more</a>
              <hr>
              <span class = "badge badge-secondary">Subreddit: ${post.subreddit}</span>
              <span class = "badge badge-secondary">Score: ${post.score}</span>
            </div>
          </div>
            `;
        });
        output += '</div>';

        document.getElementById('results').innerHTML = output;

    });





    e.preventDefault();
});

function showMessage(message, className){
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text 
    div.appendChild(document.createTextNode(message));
    // get parent
    const searchContainer = document.getElementById('search-container');
    const search = document.getElementById('search');
    // insert message
    searchContainer.insertBefore(div, search);
    // remove alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// truncate text

function truncateText(myString, limit){
    const shortened = myString.indexOf(' ', limit);
    if(shortened == -1) 
        return myString;
    return myString.substring(0, shortened);
    }







