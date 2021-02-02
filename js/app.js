// Globals:
const url = "https://600ff44f6c21e1001704fac2.mockapi.io/minor-web/api/";

// GET REQUEST
const teams = fetch(`${url}/squads/1/teams/1/members`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const person = getPerson(data, "Veerle");
    createElements(person[0]);
  });

const getPerson = (data, person) => {
  return data.filter((item) => item.name === person);
};

const createElements = (data) => {
  changeImg(`${data.mugshot}`, "img");
  changeText(`${data.name} ${data.surname}`, "h2");
  changeText(`Frontend developer`, "h3");
  changeText(`${data.other.workplace}`, "p");
  changeText(`${data.other.music}`, "p", 1);
  changeText(`${data.other.movie}`, "p", 2);
  changeHref(
    `https://github.com/${data.githubHandle}`,
    "a",
    `github.com/${data.name + data.surname}`
  );
  changeHref(`mailto:${data.other.mail}`, "a", data.other.mail, 1);
};

const changeImg = (link, element, index = 0) => {
  const elements = Array.from(document.getElementsByTagName(element));
  elements[index].src = link;
};

const changeText = (text, element, index = 0) => {
  const elements = Array.from(document.getElementsByTagName(element));
  elements[index].innerHTML = text;
};

const changeHref = (link, element, text, index = 0) => {
  const elements = Array.from(document.getElementsByTagName(element));
  elements[index].href = link;
  elements[index].innerHTML = text;
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
  githubHandle: "veerleprins",
  url: "https://veerleprins.github.io/kickoff-2021/",
  other: {
    age: "23",
    music: "House, Lo-Fi beats",
    pet: "Hond",
    sport: "Geen sport",
    workplace: "Op mijn slaapkamer aan mijn bureau.",
    mail: "info@veerleprins.nl",
    movie: "Horror, Thriller, Komedie, Actie",
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
