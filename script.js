const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;

const cachedQuotes = [
    {
        quote: "Success is the sum of small efforts repeated day in and day out.",
        author: "Robert Collier"
    },
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        quote: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },
    {
        quote: "Dream big and dare to fail.",
        author: "Norman Vaughan"
    },
    {
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        quote: "Your only limit is your mind.",
        author: "Unknown"
    },
    {
        quote: "Opportunities don't happen. You create them.",
        author: "Chris Grosser"
    },
    {
        quote: "Great things never come from comfort zones.",
        author: "Unknown"
    },
    {
        quote: "Push yourself because no one else is going to do it for you.",
        author: "Unknown"
    },
    {
        quote: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    }
];

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    fetch("https://zenquotes.io/api/random")
        .then(response => response.json())
        .then(result => {
            quoteText.innerText = result[0].q;
            authorName.innerText = result[0].a;

            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        })
        .catch(error => {
            console.error(error);

            const random =
                cachedQuotes[Math.floor(Math.random() * cachedQuotes.length)];

            quoteText.innerText = random.quote;
            authorName.innerText = random.author;

            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}

speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(
            `${quoteText.innerText} by ${authorName.innerText}`
        );

        synth.speak(utterance);

        let interval = setInterval(() => {
            if (!synth.speaking) {
                speechBtn.classList.remove("active");
                clearInterval(interval);
            } else {
                speechBtn.classList.add("active");
            }
        }, 100);
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(
        `"${quoteText.innerText}" — ${authorName.innerText}`
    );
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl =
        `https://twitter.com/intent/tweet?text="${quoteText.innerText}" — ${authorName.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

// Load first quote automatically
randomQuote();
