let currentOffset = 0;
const fetchCharacters = async function () {
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?offset=${currentOffset}&apikey=c5b21bcd83f9cb497db19d4a57fb1837`
    );
    console.log(response);
    const characters = response.data.data.results;
    console.log(characters);

    for (let i = 0; i < characters.length; i++) {
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
      a.setAttribute("href", `character.html?charIdValue=${characters[i].id}`);
      a.setAttribute("target", "_blank");
      a.innerText = characters[i].name;
      image.setAttribute("id", `character-img${i}`);
      image.setAttribute(
        "src",
        `${characters[i].thumbnail.path}/portrait_xlarge.jpg`
      );
      image.setAttribute("alt", `image of ${characters[i].name}`);
    }
    console.log(response.data.data.count);
    currentOffset = currentOffset + response.data.data.count;
    return currentOffset;
  } catch (error) {
    console.log(`there was an error with the request: ${error}`);
  }
};
fetchCharacters();

const saveSearchName = function () {
  if (document.getElementById("search-input").value) {
    const searchName = document.getElementById("search-input").value;
    searchCharacters(searchName);
  } else {
    currentOffset = 0;
    fetchCharacters();
  }
};

const deleteChild = function () {
  let e = document.querySelector("ul");
  e.innerHTML = "";
};
const searchCharacters = async function (searchName) {
  deleteChild();
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchName}&apikey=c5b21bcd83f9cb497db19d4a57fb1837`
    );
    const data = await response.json();
    console.log(data);
    const characters = data.data.results;
    console.log(characters);

    for (let i = 0; i < characters.length; i++) {
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
      a.setAttribute("href", `character.html?charIdValue=${characters[i].id}`);
      a.setAttribute("target", "_blank");
      a.innerText = characters[i].name;
      image.setAttribute("id", `character-img${i}`);
      image.setAttribute(
        "src",
        `${characters[i].thumbnail.path}/portrait_xlarge.jpg`
      );
      image.setAttribute("alt", `image of ${characters[i].name}`);
    }
  } catch (error) {
    console.log(`there was an error with the request: ${error}`);
  }
};
