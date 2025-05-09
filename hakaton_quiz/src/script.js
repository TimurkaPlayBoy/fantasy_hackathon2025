const harryPotterQuestions = [
  {
    question: "Як називається чарівне закляття, яке відбиває інші закляття?",
    correct: "Protego",
    answers: ["Expelliarmus", "Lumos", "Protego", "Avada Kedavra"]
  },
  {
    question: "Хто з героїв міг перетворюватися на тварину без чарівної палички?",
    correct: "Сіріус Блек",
    answers: ["Сіріус Блек", "Северус Снейп", "Волдеморт", "Драко Мелфой"]
  },
  {
    question: "Який предмет викладає професор Снегг (Снейп) більшість книг?",
    correct: "Зілляваріння",
    answers: ["Травологія", "Захист від темних мистецтв", "Зілляваріння", "Астрономія"]
  },
  {
    question: "Як називається банк чарівників у Лондоні?",
    correct: "Gringotts",
    answers: ["Azkaban", "Gringotts", "Diagon", "Olivander’s"]
  },
  {
    question: "Як звали сову Гаррі Поттера?",
    correct: "Букля",
    answers: ["Крук", "Букля", "Еррол", "Сніжинка"]
  }
];

let container_main = document.querySelector('.main');
let container_start = document.querySelector('.start');
let start_button = document.querySelector('.start-btn');
let restart_button = document.querySelector('.restart-btn');
let next_button = document.querySelector('.next-btn');
let answer_buttons = document.querySelectorAll('.answer');
let talkingText = document.querySelectorAll('#talking-text');

let questionIndex = 0;
let correct_answers_given = 0;
let total_answers_given = 0;
let shuffledQuestions = [];

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    let temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

function typeText(text, el, speed, callback) {
  el.innerHTML = '';
  el.style.animation = 'none';

  let index = 0;

  function type() {
    if (index < text.length) {
      el.innerHTML += text[index];
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

function displayQuestion() {
  if (questionIndex >= shuffledQuestions.length) {
    container_main.style.display = 'none';
    container_start.style.display = 'flex';

    let score = Math.round((correct_answers_given * 100) / total_answers_given);
    typeText(`Ви дали ${correct_answers_given} правильних відповідей із ${total_answers_given}. Точність - ${score}%.`, talkingText[0], 30);

    restart_button.style.display = 'inline-block';
    next_button.style.display = 'inline-block';
    return;
  }

  let q = shuffledQuestions[questionIndex];
  typeText(q.question, talkingText[1], 30);

  let shuffled = shuffle(q.answers.slice());
  for (let i = 0; i < answer_buttons.length; i++) {
    answer_buttons[i].innerHTML = shuffled[i];
    answer_buttons[i].classList.remove('correct', 'incorrect');
    answer_buttons[i].style.pointerEvents = 'auto';
  }
}

for (let i = 0; i < answer_buttons.length; i++) {
  answer_buttons[i].addEventListener('click', function () {
    let selected = answer_buttons[i].innerHTML;
    let correct = shuffledQuestions[questionIndex].correct;

    for (let btn of answer_buttons) {
      btn.style.pointerEvents = 'none';
    }

    if (selected === correct) {
      answer_buttons[i].classList.add('correct');
      correct_answers_given++;
    } else {
      answer_buttons[i].classList.add('incorrect');
    }

    total_answers_given++;
    questionIndex++;

    setTimeout(displayQuestion, 1000);
  });
}

start_button.addEventListener('click', function () {
  container_main.style.display = 'flex';
  container_start.style.display = 'none';
  restart_button.style.display = 'none';
  next_button.style.display = 'none';
  start_button.style.display = 'none';

  questionIndex = 0;
  correct_answers_given = 0;
  total_answers_given = 0;
  shuffledQuestions = shuffle([...harryPotterQuestions]);

  displayQuestion();
});

restart_button.addEventListener('click', function () {
  container_start.style.display = 'none';
  container_main.style.display = 'flex';
  restart_button.style.display = 'none';
  next_button.style.display = 'none';

  questionIndex = 0;
  correct_answers_given = 0;
  total_answers_given = 0;
  shuffledQuestions = shuffle([...harryPotterQuestions]);

  displayQuestion();
});

next_button.addEventListener('click', function () {
  let score = Math.round((correct_answers_given * 100) / total_answers_given);

  if (score >= 80) {
    typeText("Молодець, ти гарно склав екзамен, можеш приступати до наступного екзамену.", talkingText[0], 30, function () {
      window.location.href = "../../../crystal_exam/crystal.html";
    });
  } else {
    typeText("Щоб перейти до наступного рівня потрібно здати екзамен більше ніж 80%.", talkingText[0], 30);
  }
});

typeText("Готові до квізу по Гаррі Поттеру?", talkingText[0], 30);

const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', function (e) {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});
