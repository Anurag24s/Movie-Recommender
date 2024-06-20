let movies = [];
let similarity = [];
let movieTitles = [];
let playlist = [];
let likes = [];
let comments = {};

document.addEventListener("DOMContentLoaded", () => {
    fetch('movies.json')
        .then(response => {
            console.log('movies.json response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            console.log('movies.json content:', text);
            try {
                movies = JSON.parse(text);
                populateMovieTitles();
                loadLikesAndComments();
            } catch (error) {
                console.error('Error parsing movies.json:', error);
                throw new Error('Invalid JSON in movies.json');
            }
        })
        .catch(error => {
            console.error('Error fetching movies.json:', error);
        });

    fetch('similarity.json')
        .then(response => {
            console.log('similarity.json response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            console.log('similarity.json content:', text);
            try {
                similarity = JSON.parse(text);
            } catch (error) {
                console.error('Error parsing similarity.json:', error);
                throw new Error('Invalid JSON in similarity.json');
            }
        })
        .catch(error => {
            console.error('Error fetching similarity.json:', error);
        });

    document.getElementById("movieInput").addEventListener("input", showSuggestions);
});

function populateMovieTitles() {
    movies.forEach(movie => {
        movieTitles.push(movie.title.toLowerCase());
    });
}

function recommend() {
    const selectedMovie = document.getElementById("movieInput").value.trim().toLowerCase();
    const recommendationList = document.getElementById("recommendationList");
    recommendationList.innerHTML = "";

    const movieIndex = movies.findIndex(movie => movie.title.toLowerCase() === selectedMovie);
    if (movieIndex !== -1) {
        const distances = similarity[movieIndex];
        const recommendedMovies = distances
            .map((distance, index) => ({ index, distance }))
            .sort((a, b) => b.distance - a.distance)
            .slice(0, 5);

        recommendedMovies.forEach(rec => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            movieCard.innerHTML = `<span class="recommendation">${movies[rec.index].title}</span>`;
            recommendationList.appendChild(movieCard);
        });
    }
}

function addToPlaylist() {
    const selectedMovie = document.getElementById("movieInput").value.trim();
    if (selectedMovie && !playlist.includes(selectedMovie)) {
        playlist.push(selectedMovie);
        updatePlaylist();
    }
}

function likeMovie() {
    const selectedMovie = document.getElementById("movieInput").value.trim();
    if (selectedMovie && !likes.includes(selectedMovie)) {
        likes.push(selectedMovie);
        saveLikesAndComments();
        updateLikes();
    }
}

function submitComment() {
    const selectedMovie = document.getElementById("movieInput").value.trim();
    const commentText = document.getElementById("comment").value.trim();
    if (selectedMovie && commentText) {
        if (!comments[selectedMovie]) {
            comments[selectedMovie] = [];
        }
        comments[selectedMovie].push(commentText);
        saveLikesAndComments();
        updateComments(selectedMovie);
        document.getElementById("comment").value = "";
    }
}

function updatePlaylist() {
    const playlistEl = document.getElementById("playlist");
    playlistEl.innerHTML = "";
    playlist.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = movie;
        playlistEl.appendChild(li);
    });
}

function updateLikes() {
    const likedMoviesEl = document.getElementById("likedMovies");
    likedMoviesEl.innerHTML = "";
    likes.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = movie;
        likedMoviesEl.appendChild(li);
    });
}

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

function loadLikesAndComments() {
    if (localStorage.getItem('likes')) {
        likes = JSON.parse(localStorage.getItem('likes'));
        updateLikes();
    }
    if (localStorage.getItem('comments')) {
        comments = JSON.parse(localStorage.getItem('comments'));
        const selectedMovie = document.getElementById("movieInput").value.trim();
        if (selectedMovie) {
            updateComments(selectedMovie);
        }
    }
}

function saveLikesAndComments() {
    localStorage.setItem('likes', JSON.stringify(likes));
    localStorage.setItem('comments', JSON.stringify(comments));
}

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
