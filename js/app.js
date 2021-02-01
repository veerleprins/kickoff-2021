// Globals:
const url = "https://600ff44f6c21e1001704fac2.mockapi.io/minor-web/api/";

// GET REQUEST
const teams = fetch(`${url}/squads/1/teams/1/members`)
  .then((response) => response.json())
  .then((data) => {
    const person = getPerson(data, "Veerle");
    createElements(person[0]);
  });

const getPerson = (data, person) => {
  return data.filter((item) => item.name === person);
};

const createElements = (data) => {
  changeImg(`${data.mugshot}`, "img", 0);
  changeText(`${data.name} ${data.surname}`, "h2", 0);
  changeText(`Frontend developer`, "h3", 0);
  changeText(`Dit is een quote of extra informatie`, "p", 0);
  changeText(`Dit is een quote of extra informatie`, "p", 0);
  changeHref(`${data.githubHandle}`, "a", 0);
};

const changeImg = (link, element, index = 0) => {
  const elements = Array.from(document.getElementsByTagName(element));
  elements[index].src = link;
};

const changeText = (text, element, index = 0) => {
  const elements = Array.from(document.getElementsByTagName(element));
  elements[index].innerHTML = text;
};

const changeHref = (link, element, index) => {
  const elements = Array.from(document.getElementsByTagName(element));
  elements[index].href = link;
};

// PUT REQUEST
const putData = {
  id: 1,
  teamId: 1,
  name: "Veerle",
  prefix: "",
  surname: "Prins",
  mugshot:
    "https://avatars.githubusercontent.com/u/35265583?s=400&u=47b65ecd0d19e635807f65efbaed120170425a9d&v=4",
  githubHandle: "https://github.com/veerleprins",
  other: {
    age: "23",
    movie: "Horror, Thriller, Komedie, Actie",
    sport: "Geen sport",
    pet: "Hond",
    muziek: "House, Lo-Fi beats",
    werkplek: "Op mijn slaapkamer aan mijn bureau",
  },
};

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

postData(`${url}/squads/1/teams/1/members/47`, putData).then((data) => {
  console.log("put", data);
});
