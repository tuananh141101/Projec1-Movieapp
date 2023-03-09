const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function getMoviesAPI(API_URL) {
    const response = await axios.get(`${API_URL}`);
    const data = await response.data.results;
    
    showMovie(data);
}
getMoviesAPI(API_URL);


function showMovie(data) {
    let htmlCode = ``;
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    
    data.map((item,index) => {
        if (item.id == id) {
            htmlCode += `
            <div class="wrap-item">
            <div class="wrap-item__img">
                <img src="${IMG_PATH + item.poster_path}" alt="images">
            </div>
            <div class="wrap-item__info">
                <ul>
                    <li><a href="#">${item.title}</a></li>
                    <li><a href="#">${item.overview}</a></li>
                    <li><a href="#">${item.popularity}</a></li>
                    <li><a href="#">${item.release_date}</a></li>
                    <li><a href="#">${item.vote_average}</a></li>
                    <li><a href="#">${item.vote_count}</a></li>
                </ul>
            </div>
            </div> 
            `;

            const contentMain = document.querySelector("main");
            contentMain.innerHTML = htmlCode;
        }
    })
}

