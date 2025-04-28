const survey = document.getElementById("poll__title");
const answers = document.getElementById("poll__answers");

function load() {
  fetch("https://students.netoservices.ru/nestjs-backend/poll")
    .then((response) => response.json())
    .then((data) => {
      survey.textContent = data.data.title;
      answers.innerHTML = "";
      data.data.answers.forEach((answer, index) => {
        const btnAnswers = document.createElement("button");
        btnAnswers.className = "poll__answer";
        answers.appendChild(btnAnswers);
        btnAnswers.textContent = answer;

        btnAnswers.addEventListener("click", () => {
          fetch("https://students.netoservices.ru/nestjs-backend/poll", {
            method: "POST",
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              vote: data.id,
              answer: index,
            }).toString(),
          })
            .then((response) => response.json())
            .then((results) => {
              displayResults(results.stat);
            });
        });
      });
    });
  function displayResults(stat) {
    answers.innerHTML = "";
    stat.forEach((item) => {
      const resultItem = document.createElement("div");
      resultItem.textContent = `${item.answer}: ${item.votes} голосов`;
      answers.appendChild(resultItem);
    });
  }
}

load();
