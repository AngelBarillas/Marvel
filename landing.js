let currentOffset = 0;
let searchName = "";

const fetchCharacters = async function () {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?offset=${currentOffset}&apikey=c5b21bcd83f9cb497db19d4a57fb1837`
    );
    const data = await response.json();
    console.log(data);
    const characters = data.data.results;
    console.log(characters);

    const charactersNames = new Array();
    const charactersImg = new Array();
    const charactersDesc = new Array();

    for (let i = 0; i < characters.length; i++) {
      charactersNames.push(characters[i].name);
      charactersImg.push(`${characters[i].thumbnail.path}/portrait_xlarge.jpg`);
      charactersDesc.push(characters[i].description);

      console.log(charactersNames[i]);
      const ul = document.querySelector(".character-list");
      const li = document.createElement("li");
      const span = document.createElement("span");
      const image = document.createElement("img");
      const a = document.createElement("a");
      ul.append(li);
      li.setAttribute("id", `list-item${i}`);
      li.setAttribute("class", "list-item");
      li.append(image);
      li.append(span);
      span.setAttribute("id", `char-img-container${i}`);
      span.setAttribute("class", `char-img-container`);
      li.append(a);
      a.setAttribute("id", `char-name-text${i}`);
      a.setAttribute("class", "char-name");
      a.setAttribute(
        "href",
        `character.html?charNameValue=${charactersNames[i]}`
      );
      a.innerText = `${charactersNames[i]}`;
      image.setAttribute("id", `character-img${i}`);
      image.setAttribute("src", `${charactersImg[i]}`);
      image.setAttribute("alt", `image of ${charactersNames[i]}`);
    }
    currentOffset = currentOffset + data.data.count;
  } catch (error) {
    console.log(`there was an error with the request: ${error}`);
  }
};

fetchCharacters();

const saveSearchName = function (a) {
  if (document.getElementById("search-input").value) {
    searchName = document.getElementById("search-input").value;
    localStorage.setItem("charName", `${searchName}`);
  } else {
    searchName = a;
    localStorage.setItem("charName", `${searchName}`);
  }
};
