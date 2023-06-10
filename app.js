const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const twitter = document.getElementById("twitter");
const NewQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Quotes array
let apiQuotes = [];

// Show loading
function isLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function isNotLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    isLoading()
    const randomQuote = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[randomQuote]
    // Check if author field is blank and replace it with "Unknown"
    if(!quote.author) {
        author.textContent = "Unknown"
    }
    author.textContent = quote.author
    // Check quote length to determine styling
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    }
    quoteText.textContent = quote.text;
    isNotLoading();
}

// Get Quotes From API
async function getQuotes() {
    isLoading()
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    // proxyUrl + 
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Run tweetQuote on twitter button click
twitter.addEventListener("click", tweetQuote)
NewQuote.addEventListener("click", newQuote)

// On Load 
getQuotes();