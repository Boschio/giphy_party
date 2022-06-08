// GLOBAL CONSTANTS
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H';

// Variables
let gifForm = document.getElementById("form");
let gifArea = document.querySelector(".gifs-area")
let button = document.getElementById("search");
let moreButton = document.getElementById("loadBtn");
let results;

let pages = 0;
let limit = 15;
let offset = pages * limit;
// pages can be ++ whenever load more button is pressed

gifForm.addEventListener("submit", (event) => {
    event.preventDefault();
    gifArea.innerHTML = ``;
    results = document.querySelector('input').value;

    pages = 0;
    offset = pages*limit;
    getResults(results);
    moreButton.style.display = "flex";
});

moreButton.addEventListener("click", () => {
    pages += 1;
    offset = pages*limit;
    getResults(results);

});

async function getResults(event) {
    let response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${event}&limit=15&offset=${offset}&rating=g&lang=en`);

    let responseData = await response.json();
    console.log(responseData)
    responseData.data.forEach((e) => {
        displayResults(e);
    })
}

function displayResults(e) {
    gifArea.innerHTML += `
        <img id="test" src="${e.images.original.url}">
    `;
}