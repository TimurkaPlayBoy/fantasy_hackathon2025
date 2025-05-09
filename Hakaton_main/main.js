const bubble = document.getElementById("speech-bubble");
const slytherin = document.getElementById("slytherin");
const ravenclaw = document.getElementById("ravenclaw");

const introMessage = "Вітаю друже! Зараз лише починається твій шлях і він буде не легким. Далі тебе чекає багато випробувань, а я можу побажати тобі тільки удачі!";
const warningMessage = "Для цього екзамену тобі ще зарано, розпочни з червоного.";

let introIndex = 0;
let hasStarted = false;

// Друкує привітальний текст по одному символу
function typeIntroText() {
  if (introIndex < introMessage.length) {
    bubble.textContent += introMessage.charAt(introIndex);
    introIndex++;
    setTimeout(typeIntroText, 50);
  }
}

// Показує попередження
function showWarning() {
  bubble.textContent = warningMessage;
  bubble.style.display = "block";
  setTimeout(function() {
    bubble.style.display = "none";
  }, 3000);
}

// Поява тексту при скролі до блоку
const observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !hasStarted) {
        hasStarted = true;
        bubble.style.display = "block";
        typeIntroText();
      }
    });
  },
  { threshold: 0.5 }
);

const target = document.querySelector(".hat_content");
if (target) {
  observer.observe(target);
}

// Обробка кліків по факультетах
// event — це об'єкт події, який передається автоматично
slytherin.addEventListener("click", function(event) {
  event.preventDefault();
  showWarning();
});

ravenclaw.addEventListener("click", function(event) {
  event.preventDefault();
  showWarning();
});
