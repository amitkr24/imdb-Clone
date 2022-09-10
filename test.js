const movieName         = document.querySelector("#movieName");
const movieTitle        = document.querySelector("#movieTitle");
const movieSearch       = document.querySelector("#movieSearch");
const whistList         = document.getElementsByClassName("wishlist-btn");

// addto favourite
function addWhislist(movieId){
    savewhistlist(movieId);
}
function removeWhislist(movieId){
    delelewhistlist(movieId);
}
// Is whistlist saved in Local Storage?
function checkWhislist() {
    let whistlist               = [];
    const isPresent             = localStorage.getItem("whistlist");
    if (isPresent) whistlist    = JSON.parse(isPresent);
    return whistlist;
}

// save whistlist to local storage
function savewhistlist(movieId) {
    const whistlist = checkWhislist();
    whistlist.push(movieId);
   let storage = localStorage.setItem("whistlist", JSON.stringify(whistlist));
   location.reload();
   console.log(storage);
}

// remove whistlist to local storage
function delelewhistlist(movieId) {
    const whistlist = checkWhislist();
    whistlist.pop(movieId);
   let storage = localStorage.setItem("whistlist", JSON.stringify(whistlist));
   location.reload();
   console.log(storage);
}
//submit search form 
function submitForm() {
    movieTitle.value  = movieName.value;
    return movieSearch.submit();
}
function fetchResultOnkeyup(name){
    fetch('https://www.omdbapi.com/?apikey=66783b37&s='+name)
    .then(data => {
        return data.json();
    })
    .then(post => {
        html = ``;
        console.log(post);
        post.Search.forEach(data => {
            html +=`<div class="search-result">
                    <img src="${data.Poster}" alt="Not Available" style="width: 138px;height: 130px;">
                    <div class="movie-info">
                        <h2><b>${data.Title}</b></h2>
                        <p>Type: <span style="color:#ff5860"> ${data.Type}  </span>
                        Year: <span style="color:#ff5860"> ${data.Year}</span></p>
                        <div class="">
                        <a href="single-page.html?mid=${data.imdbID}">
                            <button type="button" class="btn btn-success btn-sm" style="background: #1f7000;padding: 0px 10px;color: #fff;border-radius: 3px;">View Detail</button>
                        </a>
                        </div>
                        
                    </div>
            </div>`;
        });
        document.getElementById("search-results").style.display = "block";
        document.getElementById('search-results').innerHTML = html;
    })
}
// get current url
var url_string  = window.location.href;
var url         = new URL(url_string);
var title       = url.searchParams.get("title");
var mid         = url.searchParams.get("mid");

if(title){
    params = "&s="+title;
}else if(mid){
    params = "&i="+mid;
}else{
    params = "&s=all&y=2022";
}
//fetch data using api
fetch('https://www.omdbapi.com/?apikey=66783b37'+params)
.then(data => {
    return data.json();
})
.then(post => {
    var listing     = checkWhislist();
    let html = ``;

        if(mid){
            console.log(post);
            // html content for single page
            let isInArray = listing.includes(post.imdbID);
            if(isInArray){
                var likebtn = `<button type="button" class="btn btn-danger btn-sm" style="background: #df1a24;padding: 0px 10px;color: #fff;border-radius: 3px;" onClick="alert('Already Added ! Please check on Favourite '); return false;">Added</button>`;
            }else{
                var likebtn = `<button type="button" class="btn btn-success btn-sm" style="background: #1f7000;padding: 0px 10px;color: #fff;border-radius: 3px;" onClick="addWhislist('${post.imdbID}'); return false;">Add to favourite</button>`;
            }
            html =`<div class="col-12">
                    <h1 class="details__title">${post.Title}</h1>
                    </div>
                    <div class="col-12 col-xl-12">
                        <div class="card card--details" >
                            <div class="row">
                                <div class="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                                    <div class="card__cover">
                                        <img style="height:400px;width:270;"src="${post.Poster}" alt="Not Available">
                                    </div>
                                </div>
                                <div class="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                                    <div class="card__content" style="min-height:365px;">
                                        <div class="card__wrap">
                                            <span class="card__rate"><i class="icon ion-ios-star"></i>${post.imdbRating}</span>

                                            <ul class="card__list">
                                                <li>HD</li>
                                                <li>${post.Rated}</li>
                                            </ul>
                                        </div>

                                        <ul class="card__meta">
                                            <li><span>Genre:</span> <a href="#">Action</a>
                                            <a href="#">Triler</a></li>
                                            <li><span>Release year:</span> 2017</li>
                                            <li><span>Running time:</span> 120 min</li>
                                            <li><span>Country:</span> <a href="#">${post.Country}</a> </li>
                                            <li><span>Released Date:</span> <a href="#">${post.Released}</a> </li>
                                            <li><span>Type:</span> <a href="#">${post.Type}</a></li>

                                        </ul>

                                        <div class="card__description card__description--details">
                                        ${post.Plot}
                                        </div>
                                    </div>
                                    <div class>${likebtn}</div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    document.getElementById("singleList").innerHTML = html;
        }else{
            // html content for home page
            for (let data of post.Search) {
                let isInArray = listing.includes(data.imdbID);
                if(isInArray){
                    var likebtn = `<button type="button" class="btn btn-danger btn-sm" style="background: #df1a24;padding: 0px 10px;color: #fff;border-radius: 3px;" onClick="alert('Already Added ! Please check on Favourite'); return false;">Added</button>`;
                }else{
                    var likebtn = `<button type="button" class="btn btn-success btn-sm" style="background: #1f7000;padding: 0px 10px;color: #fff;border-radius: 3px;" onClick="addWhislist('${data.imdbID}'); return false;">Add to Favourite</button>`;
                }
                html +=`<div class="item">
                    <div class="card card--big">
                        <div class="card__cover">
                            <img style="width:255px;height:377px;"src="${data.Poster}" alt="Not Available">
                            <a href="single-page.html?mid=${data.imdbID}" class="card__play">
                                <i class="icon ion-ios-play"></i>
                            </a>
                        </div>
                        <div class="card__content">
                            <h3 class="card__title"><a href="single-page.html?mid=${data.imdbID}">${data.Title} </a></h3>
                            <span class="card__category">
                                <span style="width:40%;"><a href="single-page.html?mid=${data.imdbID}">${data.Type}</a></span>
                                <span style="width:60%;color:white;text-align:right;">${likebtn}</span>
                            </span>
                            <span class="card__rate"><i class="icon ion-ios-star"></i>${data.Year}</span>
                        </div>
                    </div>
                </div>`;
            }
        }
    document.getElementById("loader").style.display = "none";
    document.getElementById("movie-list").innerHTML = html;
});