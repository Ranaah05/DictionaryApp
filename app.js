document.getElementById("searchBtn").addEventListener("click", function () {
    let word = document.getElementById("wordInput").value; // Get the word from input

    if (word === "") {
        alert("Please enter a word!"); // Prevent empty search
        return;
    }

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; // API URL

    fetch(apiUrl)
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            displayResult(data); // Call function to display the result
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("result").innerHTML = "<p>Word not found. Try another.</p>";
        });
});

function displayResult(data) {
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous result

    if (data && data.length > 0) {
        let word = `<h2>${data[0].word}</h2>`;
        let phonetics = data[0].phonetics.length > 0 ? `<p><i>(${data[0].phonetics[0].text || ""})</i></p>` : "";
        let definition = `<p><strong>Definition:</strong> ${data[0].meanings[0].definitions[0].definition}</p>`;

        resultDiv.innerHTML = word + phonetics + definition;
    } else {
        resultDiv.innerHTML = "<p>Word not found. Try another.</p>";
    }
}
