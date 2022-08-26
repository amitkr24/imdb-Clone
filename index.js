// api url

var url_string = window.location.href;
var url = new URL(url_string);
var mid = url.searchParams.get("mid");
if(mid){
    var params = "&i="+mid;
}else{
    params ='&s=all&y=2022';
}
const api_url ="http://www.omdbapi.com/?apikey=66783b37"+params;

  
// Defining async function
async function getapi(url) {
	// Storing response
	const response = await fetch(url);
	// Storing data in form of JSON
	var data = await response.json();
    singlePage(data);
}
// Calling that async function
getapi(api_url);

// Function to define for homepage data
function homePage(data) {
	let tab =``;
	// Loop to access all rows
	for (let r of data.Search) {
		tab += `<div class="item">
                        <div class="card card--big">
                            <div class="card__cover">
                                <img style="width:255px;height:377px;"src="${r.Poster}" alt="">
                                <a href="single-page.html?mid=${r.imdbID}" class="card__play">
                                    <i class="icon ion-ios-play"></i>
                                </a>
                            </div>
                            <div class="card__content">
                                <h3 class="card__title"><a href="single-page.html?mid=${r.imdbID}">${r.Title} </a></h3>
                                <span class="card__category">
                                    <a href="single-page.html?mid=${r.imdbID}">${r.Type}</a>
                                </span>
                                <span class="card__rate"><i class="icon ion-ios-star"></i>${r.Year}</span>
                            </div>
                        </div>
                    </div>
                `;
	}
	// Setting innerHTML as tab variable
	document.getElementById("movie-list").innerHTML = tab;
}
// function for single page
function singlePage(data){
	// Loop to access all rows
		let tab = `<div class="row">
                    <div class="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                        <div class="card__cover">
                            <img style="height:400px;width:270;"src="${data.Poster}" alt="">
                        </div>
                    </div>
                    <div class="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                        <div class="card__content">
                            <div class="card__wrap">
                                <span class="card__rate"><i class="icon ion-ios-star"></i>${data.imdbRating}</span>

                                <ul class="card__list">
                                    <li>HD</li>
                                    <li>16+</li>
                                </ul>
                            </div>

                            <ul class="card__meta">
                                <li><span>Genre:</span> <a href="#">Action</a>
                                <a href="#">Triler</a></li>
                                <li><span>Release year:</span> 2017</li>
                                <li><span>Running time:</span> 120 min</li>
                                <li><span>Country:</span> <a href="#">${data.Country}</a> </li>
                            </ul>

                            <div class="card__description card__description--details">
                            ${data.Plot}
                            </div>
                        </div>
                    </div>
                </div>`;
	// Setting innerHTML as tab variable
	document.getElementById("singleList").innerHTML = tab;
}
