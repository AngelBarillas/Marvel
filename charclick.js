let charIdValue = "";
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("charIdValue");
console.log(id);

const fetchOneCharacter = async function (id) {
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters/${id}?apikey=c5b21bcd83f9cb497db19d4a57fb1837`
    );
    console.log(response);
    const character = response.data.data.results[0];
    console.log(character);

    document.getElementById("search-char-name").innerText = character.name;
    if (character.description) {
      document.getElementById("search-char-desc").innerText =
        character.description;
    } else {
      document.getElementById(
        "search-char-desc"
      ).innerText = `Sorry, we dont have a description for ${character.name} `;
    }

    document.getElementById(
      "search-char-img"
    ).src = `${character.thumbnail.path}/portrait_xlarge.jpg`;
  } catch (error) {
    console.log(`there was an error with the request: ${error}`);
  }
};

fetchOneCharacter(id);
