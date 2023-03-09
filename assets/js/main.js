const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;
async function getMoviesAPI(API_URL) {
    const response = await axios.get(`${API_URL}`);
    const data = await response.data.results;
    showMovie(data); //Loi goi the thuc thi showmovie
};
getMoviesAPI(API_URL)

// Hien thi du lieu ra ngoai fe
function showMovie(data) {
    let html = ``;
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    data.map((item) => {
        html += `
        <div class="movie">
            <img src="${IMG_PATH + item.poster_path}" alt="">
            <div class="movie-info">
                <h3>${item.title}</h3>
                <span class="rating ${changeColorRating(item.vote_average)}">${item.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${item.overview}
            </div>
        </div>
        `;

        // Truy cap phan 
        const content = document.querySelector("#main");
        // console.log(content);
        content.innerHTML = html;
    });
}

// Change color vote rating
function changeColorRating(rate) {
    if (rate > 7.0) {
        return 'Great';
    } else if (rate > 5.5) {
        return 'Normal';
    } else {
        return 'Boring';
    };
}

// Search ten phim
const form = document.querySelector("#form");
const input = document.querySelector("#search");

form.addEventListener('submit', function(e) {
    e.preventDefault(); //Enter vao form se ko reload => mat value

    const valueInput = input.value; //Lay value o input
    if(valueInput && valueInput !== '') {
        getMoviesAPI(SEARCH_API + valueInput);
        input.value = '';
    } else {
        window.location.reload();
    }
});


// Pagination - Load More
const btnNext = document.querySelector("#next-page");
const btnBack = document.querySelector("#back-page");
const numberPages = document.querySelector(".number-pages");
const body = document.querySelector("body");

let currentPages = 1;
let maxPages = 10;

body.addEventListener('load', () => {
    btnBack.disabled = true;
});

btnBack.addEventListener('click', () => {
    currentPages--;
    if (currentPages == 1) {
        // Nếu currentpages == 1 thì sẽ vô hiệu hóa bút button
        btnBack.disabled = true;                                
    }
    btnNext.disabled = false;
    const API_URL_BACK = `${API_URL}&page=${currentPages}`;
    getMoviesAPI(API_URL_BACK); 
    numberPages.innerHTML = currentPages;
})

btnNext.addEventListener('click', () => {
    currentPages++;
    if (currentPages === maxPages) {
        // Nếu curentpages == 10 thì sẽ ko next được 
        btnNext.disabled = true;
    } 
    btnBack.disabled = false;
    const API_URL_NEXT = `${API_URL}&page=${currentPages}`;
    getMoviesAPI(API_URL_NEXT);
    numberPages.innerHTML = currentPages;
});


// Pagedown
const btnScrollDown = document.querySelector(".btnScrollDown");

btnScrollDown.addEventListener('click', () => {
    window.scrollBy(0,2800)
})


const btnOpen = document.querySelector(".btn-mobile-open");
const ctnMobile = document.querySelector("#menu-mobile")
const btnClose = document.querySelector(".menu-mobile .close");


btnOpen.addEventListener('click', () => {
    ctnMobile.style.height = "100%";
});


btnClose.addEventListener("click", () => {
    ctnMobile.style.height = "0%";
})





