const board = document.getElementById("game-board");
const hatWrapper = document.getElementById("hat-wrapper");
const bubble = document.getElementById("speech-bubble");

const images = [
  'img1.jpg', 'img1.jpg',
  'img2.jpg', 'img2.jpg',
  'img3.jpg', 'img3.jpg',
  'img4.jpg', 'img4.jpg',
  'img5.jpg', 'img5.jpg',
  'img6.jpg', 'img6.jpg',
  'img7.jpg', 'img7.jpg',
  'img8.png', 'img8.png',
];

images.sort(() => 0.5 - Math.random());

let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;

images.forEach((src) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<span>?</span><img src="img/${src}" alt="img">`;

  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      lockBoard = true;
      const img1 = firstCard.querySelector("img").src;
      const img2 = card.querySelector("img").src;

      if (img1 === img2) {
        matchedPairs++;
        firstCard = null;
        lockBoard = false;

        if (matchedPairs === images.length / 2) {
          setTimeout(() => {
            showFinalMessage();
          }, 800);
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          card.classList.remove("flipped");
          firstCard = null;
          lockBoard = false;
        }, 1000);
      }
    }
  });

  board.appendChild(card);
});

const greetingText = "Вітаю! Ось ти підійшов до останнього тесту, який вирішить твою долю... На жаль, вчителі університету загубились, і тобі потрібно їх знайти. Удачі!";
const finalText = "Вітаю, юний чарівнику! Ти успішно пройшов всі випробування та продемонстрував свою відданість, мудрість, хоробрість і кмітливість! Тепер офіційно ти є нашим учнем у Школі Чарів і Магії Гоґвортс. Чарівний світ чекає на тебе. Нехай твоя пригода почнеться! Очікуй сову з повідомленням, коли буде старт навчання.";
let textIndex = 0;

function typeText(text, callback) {
  if (textIndex < text.length) {
    bubble.textContent += text.charAt(textIndex);
    textIndex++;
    setTimeout(() => typeText(text, callback), 50);
  } else if (callback) {
    callback();
  }
}

function showBubble(text, callback) {
  bubble.textContent = "";
  textIndex = 0;
  bubble.style.display = "block";
  typeText(text, callback);
}

function hideHat() {
  bubble.style.display = "none";
  hatWrapper.style.display = "none";
}

function showFinalMessage() {
    hatWrapper.style.display = "flex";
    showBubble(finalText);
    nextPage();
};

function nextPage(){
  setTimeout(() => {
    window.location.href = '/fantasy_hackathon2025/cards_quiz/cards.html';
  }, 24000);
}

// Показати шляпу одразу при завантаженні
window.addEventListener("load", () => {
  showBubble(greetingText, () => {
    setTimeout(() => {
      hideHat();
    }, 1000);
  });
});
