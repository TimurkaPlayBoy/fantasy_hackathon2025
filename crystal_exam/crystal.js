function typeText(text, element, speed, callback) {
  element.innerHTML = ''; // очищаємо текст
  element.style.animation = 'none'; // скасовуємо анімацію

  const delay = Math.max(10, Math.abs(speed)); // мінімальна швидкість

  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text[i]; // додаємо один символ
      i++;
      setTimeout(typing, delay); // затримка перед наступним символом
    } else if (callback) {
      callback(); // викликаємо функцію після завершення
    }
  }

  typing(); // починаємо анімацію
}

let talkingText = document.getElementById('talking-text');
let hatWrapper = document.querySelector('.hat-wrapper');
let crystal = document.querySelector('.crystal');
let nextBtn = document.getElementById('next-btn');

// Перший текст
typeText("Вітаю, перший екзамен позаду. Але поки ти проходив тест, я загубила свій кристал. Якщо допоможеш знайти його, то далі тебе буде чекати останній екзамен. Тепер твоя задача — знайти кристал. Удачі!",
  talkingText, 30, function() {
    setTimeout(function() {
      hatWrapper.style.transition = 'opacity 1s ease';
      hatWrapper.style.opacity = '0';

      setTimeout(function() {
        hatWrapper.style.display = 'none';
        crystal.style.pointerEvents = 'auto'; // даємо можливість натискати
        crystal.style.cursor = 'pointer'; // змінюємо курсор на "вказівник"
      }, 1000);
    }, 2000);
  });

// Коли клікаєш на кристал
crystal.addEventListener('click', function() {
  if (!crystal.classList.contains('visible')) {
    crystal.classList.add('visible');

    setTimeout(function() {
      hatWrapper.style.display = 'inline-block';
      hatWrapper.style.opacity = '0';

      setTimeout(function() {
        hatWrapper.style.transition = 'opacity 1s ease';
        hatWrapper.style.opacity = '1';
        typeText("Ти справжній шукач! Попереду ще більше магії...", talkingText, 30, function() {
          nextBtn.classList.add('visible'); // показуємо кнопку переходу
        });
      }, 50);
    }, 3000);
  }
});

// Обробка кнопки переходу
nextBtn.addEventListener('click', function() {
  window.location.href = '/fantasy_hackathon2025/cards_quiz/cards.html';
});
