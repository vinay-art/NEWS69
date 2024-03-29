// const API_KEY = "c8ab22ba6bc64a5da88fe6df00862ea2";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage)
            return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener(
        "click", () => {
            window.open(article.url, "_blank");
        });
}

const ipl = document.getElementById('ipl');
const finance = document.getElementById('finance');
const politics = document.getElementById('politics');

ipl.addEventListener("click", () => getNews("ipl", ipl));
finance.addEventListener("click", () => getNews("finance", finance));
politics.addEventListener("click", () => getNews("politics", politics));

let curSelectedNav = null;
function getNews(query, navItem){
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const input_text = document.getElementById('input-text');
const search_button = document.getElementById('search-button');

search_button.addEventListener("click", () => {
    const query = input_text.value;
    if(!query)
        return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});

const logo = document.getElementById('anchor');
logo.addEventListener("click", () => {
    window.location.reload();
});
