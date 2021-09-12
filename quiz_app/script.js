const quizData = [
    {
        question: 'What is the most programing languages in 2021?',
        a: 'Java',
        b: 'C++',
        c: 'Python',
        d: 'JavaScript',
        correct: 'a'
    },
    {
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Languages',
        b: 'Application Programing Interface',
        c: 'Orientation Object Programing',
        d: 'Cascading Style Sheet',
        correct: 'a'
    },
    {
        question: 'What does CSS stand for?',
        a: 'Hypertext Markup Languages',
        b: 'Application Programing Interface',
        c: 'Orientation Object Programing',
        d: 'Cascading Style Sheet',
        correct: 'd'
    },
    {
        question: 'Which is the output device?',
        a: 'Window',
        b: 'Keyboard',
        c: 'Screen',
        d: 'Mouse',
        correct: 'c'
    },
    {
        question: 'Which is the OS in computer?',
        a: 'Bean',
        b: 'Fan',
        c: 'Ubuntu',
        d: 'Windown',
        correct: 'c'
    },
]

let currentQuiz = 0;
const totalQuiz = quizData.length;
let userAnswer = undefined;
let score = 0;
let correct = 0;
let wrong = 0;
let d = new Date();
let times = new Date();
times.setMinutes(d.getMinutes()+10);

const answerEleBox = document.querySelector('.answer__content');
const answerOptionList = document.querySelectorAll('.answer__option');
const modalCheckbox = document.querySelector('#modal_checkbox');
const btnPlayAgain = document.querySelector('#btn-play-again');
const minutesEle = document.querySelector('.header__times-minutes');
const secondsEle = document.querySelector('.header__times-seconds');

loadCurrentQuiz();
handle_submit();
setInterval(handle_timer, 1000);

function loadCurrentQuiz() {
    const statusAnswerEle = document.querySelectorAll('.question__label span');
    const questionEle = document.querySelector('.question__content');
    const answerOptionEle = document.querySelectorAll('.answer__content .answer__option p');
    
    statusAnswerEle[0].innerText = currentQuiz+1;
    statusAnswerEle[1].innerText = totalQuiz - (currentQuiz+1);
    questionEle.innerText = quizData[currentQuiz].question;
    answerOptionEle[0].innerText = quizData[currentQuiz].a;
    answerOptionEle[1].innerText = quizData[currentQuiz].b;
    answerOptionEle[2].innerText = quizData[currentQuiz].c;
    answerOptionEle[3].innerText = quizData[currentQuiz].d;

}

function handle_submit() {
    const scoreBoard = document.querySelector('#modal-body__score');
    const correctLabel = document.querySelector('.header__correct span');
    const wrongLabel = document.querySelector('.header__wrong span');
    
    if(userAnswer) {
        if(userAnswer === quizData[currentQuiz].correct) {
            score += 10;
            correct++;
        }else {
            wrong++;
        }

        correctLabel.innerText = correct;
        wrongLabel.innerText = wrong;

        console.log(score);
        currentQuiz++;

        if(currentQuiz >= totalQuiz) {
            modalCheckbox.checked = 'checked';
            scoreBoard.innerText = `${correct} / ${totalQuiz}`;
            return;
        }

        loadCurrentQuiz();
        clearSelection();
        userAnswer = undefined;
    }
    
}

// Handle when user select option
function getOption(element, selector) {

    if(element.matches(selector))
        return element;

    while(element.parentElement) {
        
        if(element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function clearSelection() {
    answerOptionList.forEach(option => {
        option.classList.contains('active') ? option.classList.remove('active'):'';
    })
}

function handle_timer() {
    let currentDate = new Date();
    let distance = times - currentDate;
    let minutes = Math.floor(distance/(60*1000));
    let seconds = Math.floor((distance%(60*1000))/1000);

    minutesEle.innerText = `${formatTime(minutes)} : `;
    secondsEle.innerText = formatTime(seconds);
    
}

function formatTime(time) {
    return (time<10)? `0${time}` : time;
}

answerEleBox.addEventListener('click', (e) => {
    const eleActive = getOption(e.target, '.answer__option');

    clearSelection();
    eleActive.classList.add('active');
    userAnswer = eleActive.id;
    console.log(userAnswer);
})

btnPlayAgain.addEventListener('click', (e) => {
    location.reload();
})

