const author = document.querySelector(".author-name");
const quote = document.querySelector(".quotes");
const tagContainer = document.querySelector(".tags-container");

fetch(
  "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
)
  .then((response) => response.json())
  .then((data) => {
    const quotes = data;

    function displayRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuoteObj = quotes[randomIndex];
      
      quote.textContent = `"${randomQuoteObj.quote}"`;
      author.textContent = randomQuoteObj.author;
      
      tagContainer.innerHTML = "";
      
      if (randomQuoteObj.tags && Array.isArray(randomQuoteObj.tags)) {
        randomQuoteObj.tags.forEach((singleTag) => {
          const tagSpan = document.createElement("span");
          tagSpan.textContent = singleTag;
          tagSpan.classList.add("tag-box");
          tagContainer.appendChild(tagSpan);
        });
      }
    }

    displayRandomQuote();

    document
      .getElementById("randomButton")
      .addEventListener("click", displayRandomQuote);

    document.getElementById("copyButton").addEventListener("click", () => {
      const textToCopy = `${quote.textContent} — ${author.textContent}`;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert("Quote copied to clipboard!");
        })
        .catch((err) => {
          console.log("Error")
          console.error("Failed to copy text: ", err);
        });
    });
  })
  .catch((error) => {
    console.error("Error fetching quotes:", error);
  });