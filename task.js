// функция для отображения результатов голосования
function showResults(results) {
  const resultsElement = document.createElement("div");
  resultsElement.className = "poll__results";
  results.stat.forEach((stat) => {
    const resultItem = document.createElement("div");
    resultItem.textContent = `${stat.answer}: ${stat.votes}`;
    resultsElement.appendChild(resultItem);
  });
  document.body.appendChild(resultsElement);
}

// функция для отправки голосов
function submitVote(pollId, answerIndex) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/poll");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status === 200) {
      showResults(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(`vote=${pollId}&answer=${answerIndex}`);
}
// функция для отображения опроса
function displayPoll(pollData) {
  const survey = document.querySelector("#poll__title");
  const answers = document.querySelector("#poll__answers");
  survey.textContent = pollData.data.title;
  answers.innerHTML = "";
  pollData.data.answers.forEach((answer, index) => {
    const btnAnswers = document.createElement("button");
    btnAnswers.className = "poll__answer";
    btnAnswers.textContent = answer;
    btnAnswers.onclick = () => submitVote(pollData.id, index);
    answers.appendChild(btnAnswers);
  });
}
// функция для загрузки опроса
function load() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
  xhr.onload = () => {
    if (xhr.status === 200) {
      const pollData = JSON.parse(xhr.responseText);
      displayPoll(pollData);
    }
  };
  xhr.send();
}

window.onload = load;

// const survey = document.getElementById("poll__title");
// const answers = document.getElementById("poll__answers");

// function load() {
//   fetch("https://students.netoservices.ru/nestjs-backend/poll")
//     .then((response) => response.json())
//     .then((data) => {
//       survey.textContent = data.data.title;
//       answers.innerHTML = "";
//       data.data.answers.forEach((answer, index) => {
//         const btnAnswers = document.createElement("button");
//         btnAnswers.className = "poll__answer";
//         answers.appendChild(btnAnswers);
//         btnAnswers.textContent = answer;

//         btnAnswers.addEventListener("click", () => {
//           fetch("https://students.netoservices.ru/nestjs-backend/poll", {
//             method: "POST",
//             headers: { "Content-type": "application/x-www-form-urlencoded" },
//             body: new URLSearchParams({
//               vote: data.id,
//               answer: index,
//             }).toString(),
//           })
//             .then((response) => response.json())
//             .then((results) => {
//               displayResults(results.stat);
//             });
//         });
//       });
//     });
//   function displayResults(stat) {
//     answers.innerHTML = "";
//     stat.forEach((item) => {
//       const resultItem = document.createElement("div");
//       resultItem.textContent = `${item.answer}: ${item.votes} голосов`;
//       answers.appendChild(resultItem);
//     });
//   }
// }

// load();
