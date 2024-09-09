let charIdValue = "";
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("charIdValue");
console.log(id);

//if (localStorage.getItem("charName")) {
charNameValue = localStorage.getItem("charName");
//} else {
// charNameValue = name;
//}
//console.log(charNameValue);

const fetchOneCharacter = async function (id) {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${id}?apikey=c5b21bcd83f9cb497db19d4a57fb1837`
    );
    const {
      data: { results: character },
    } = await response.json();
    console.log(character);

    const characterName = character[0].name;
    const characterDesc = character[0].description;
    const characterImg = `${character[0].thumbnail.path}/portrait_xlarge.jpg`;
    document.getElementById("search-char-name").innerText = characterName;
    if (characterDesc) {
      document.getElementById("search-char-desc").innerText = characterDesc;
    } else {
      document.getElementById(
        "search-char-desc"
      ).innerText = `Sorry, we dont have a description for ${characterName} `;
    }

    document.getElementById("search-char-img").src = characterImg;
  } catch (error) {
    console.log(`there was an error with the request: ${error}`);
  }
};

fetchOneCharacter(id);
//localStorage.clear();
