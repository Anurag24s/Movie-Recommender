// Global variables to hold data
let movies = [];
let similarity = [];
let movieTitles = [];
let playlist = [];
let likes = [];
let comments = {};

// Event listener when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Fetch movies and similarity data
    const fetchMovies = fetch('https://filesneeded.s3.eu-north-1.amazonaws.com/movies.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            movies = data;
            populateMovieTitles();
        })
        .catch(error => {
            console.error('Error fetching movies.json:', error);
        });

    const fetchSimilarity = fetch('https://filesneeded.s3.eu-north-1.amazonaws.com/similarity.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            similarity = data;
        })
        .catch(error => {
            console.error('Error fetching similarity.json:', error);
        });

    // Wait for both fetch operations to complete
    Promise.all([fetchMovies, fetchSimilarity])
        .then(() => {
            // Now both movies and similarity data are available
            showContent();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Event listener for input changes in movieInput
    document.getElementById("movieInput").addEventListener("input", showSuggestions);
});

// Function to populate movie titles in lowercase
function populateMovieTitles() {
    movieTitles = movies.map(movie => movie.title.toLowerCase());
}

// Function to recommend movies based on selected movie
function recommend() {
    if (movies.length === 0 || similarity.length === 0) {
        alert('Sorry movies data not yet loaded, please wait');
        return;
    }

    const selectedMovie = document.getElementById("movieInput").value.trim().toLowerCase();
    const recommendationList = document.getElementById("recommendationList");
    recommendationList.innerHTML = "";

    const movieIndex = movies.findIndex(movie => movie.title.toLowerCase() === selectedMovie);

    if (movieIndex !== -1) {
        const distances = similarity[movieIndex];

        if (distances && Array.isArray(distances)) {
            const recommendedMovies = distances
                .map((distance, index) => ({ index, distance }))
                .sort((a, b) => b.distance - a.distance)
                .slice(0, 5);

            displayRecommendedMovies(recommendedMovies);
        } else {
            console.error('Distances array is empty or not an array.');
        }
    } else {
        console.error('Selected movie not found in the list.');
    }
}

// Function to display recommended movies asynchronously
function displayRecommendedMovies(recommendedMovies) {
    const recommendationList = document.getElementById("recommendationList");
    const fragment = document.createDocumentFragment();

    recommendedMovies.forEach(rec => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.textContent = movies[rec.index].title;
        fragment.appendChild(movieCard);
    });

    recommendationList.appendChild(fragment);
}

// Function to show suggestions based on input in movieInput
function showSuggestions() {
    const input = this.value.trim().toLowerCase();
    const movieList = document.getElementById("movieSuggestions");
    movieList.innerHTML = "";

    if (input) {
        const suggestions = movieTitles.filter(title => title.includes(input)).slice(0, 3);
        suggestions.forEach(title => {
            const li = document.createElement("li");
            li.textContent = title;
            li.addEventListener("click", function() {
                document.getElementById("movieInput").value = title;
                movieList.innerHTML = "";
            });
            movieList.appendChild(li);
        });
    }
}

// Function to add selected movie to playlist
function addToPlaylist() {
    const selectedMovie = document.getElementById("movieInput").value.trim();
    if (selectedMovie && !playlist.includes(selectedMovie)) {
        playlist.push(selectedMovie);
        updatePlaylist();
    }
}

// Function to update playlist in the UI
function updatePlaylist() {
    const playlistEl = document.getElementById("playlist");
    playlistEl.innerHTML = "";
    playlist.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = movie;
        playlistEl.appendChild(li);
    });
}

// Function to like the selected movie
function likeMovie() {
    const selectedMovie = document.getElementById("movieInput").value.trim();
    if (selectedMovie && !likes.includes(selectedMovie)) {
        likes.push(selectedMovie);
        updateLikes();
    }
}

// Function to update liked movies in the UI
function updateLikes() {
    const likedMoviesEl = document.getElementById("likedMovies");
    likedMoviesEl.innerHTML = "";
    likes.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = movie;
        likedMoviesEl.appendChild(li);
    });
}

// Function to submit a comment for the selected movie
function submitComment() {
    const selectedMovie = document.getElementById("movieInput").value.trim();
    const commentText = document.getElementById("comment").value.trim();
    if (selectedMovie && commentText) {
        if (!comments[selectedMovie]) {
            comments[selectedMovie] = [];
        }
        comments[selectedMovie].push(commentText);
        updateComments(selectedMovie);
        document.getElementById("comment").value = "";
    }
}

// Function to update comments for the selected movie in the UI
function updateComments(movie) {
    const commentsEl = document.getElementById("comments");
    commentsEl.innerHTML = `<h3>Comments for '${movie}'</h3>`;
    if (comments[movie]) {
        comments[movie].forEach(comment => {
            const p = document.createElement("p");
            p.textContent = comment;
            commentsEl.appendChild(p);
        });
    }
}

// Function to show main content after data is loaded
function showContent() {
    document.getElementById('content').classList.remove('hidden');
}
