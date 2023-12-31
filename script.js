document.addEventListener("DOMContentLoaded", function () {

    let APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
    
    const main = document.querySelector("main");
    const form = document.querySelector("form");
    const search = document.getElementById("search");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    console.log(next);
    getMovies(APIURL);
    let pageno = 1;
    function pagenumbers(pageno){
        next.addEventListener("click",(e)=>{
            e.preventDefault();
            
            if(pageno < 100){
                pageno += 1;
                APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
                APIURL = APIURL + pageno;
                getMovies(APIURL);
                
            }
            
        })

        prev.addEventListener("click",(e)=>{
            e.preventDefault();
            if(pageno>1){
                pageno -= 1;
                let APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
                APIURL = APIURL + pageno;
                getMovies(APIURL);
            }
            
        })
    
    }
    pagenumbers(pageno);
    
    const home = document.getElementById("home");
    home.addEventListener("click",(e)=>{
        e.preventDefault();
        let APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
        APIURL = APIURL + 1;
        getMovies(APIURL);
    })
  
    
    
    async function getMovies(url){

        

        const resp = await fetch(url);
        const respData = await resp.json(url);
        
        showMovies(respData.results);
        
    }

    function showMovies(movies){
        main.innerHTML = '';
        movies.forEach((movie) => {
            const {poster_path, title, vote_average, overview} = movie;
            const movieel = document.createElement("div");
            movieel.classList.add("movie");

            movieel.innerHTML = `
                <img src="${IMGPATH + poster_path}" alt=""/>
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h4>Overview:</h4>
                    ${overview}
                </div>
                `;


            main.appendChild(movieel);
            
        });
    }

    function getClassByRate(vote){
        if(vote >= 8){
            return "green";
        }
        else if(vote >= 5){
            return "orange";
        }
        else{
            return "red";
        }
    }

    form.addEventListener("submit",(e)=>{
        e.preventDefault();

        const SearchTerm = search.value;

        if(SearchTerm){
            getMovies(SEARCHAPI + SearchTerm);
        }
    })
});