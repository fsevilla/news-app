import { ajax } from './services/ajax.js';
export function setPageTitle() {
    // Set title in HTML
    let source = document.getElementById('heading').innerHTML;
    let mainTemplate = Handlebars.compile(source);
    let context = { title: 'News Application', isNew: true };
    document.getElementById('heading').innerHTML = mainTemplate(context);
}
function getHeadlines() {
    const apiKey = localStorage.getItem('apiKey');
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey='+apiKey;
    ajax.get(url).then(data => {
        let source = document.getElementById('news-container').innerHTML;
        let template = Handlebars.compile(source);
        let context = { headline: data.articles, check: () => {
                return true;
            } };
        document.getElementById('news-container').innerHTML = template(context);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    setPageTitle();
    getHeadlines();
});
