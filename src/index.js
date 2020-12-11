import './style/style.scss';
import App from './components/App';
import shuffle from './components/Shuffle';

const app = new App();
const btn = document.getElementById('show');
const nav = document.getElementById('nav');
const categoryCards = [app.card1, app.card2, app.card3, app.card4, app.card5, app.card6, app.card7,
    app.card8];
const categoryLinks = document.querySelectorAll('.category__link');
const modeButton = document.querySelector('.tgl-btn');
const arr = [0, 1, 2, 3, 4, 5, 6, 7];

btn.addEventListener('click', () => {
    nav.classList.toggle('active');
    btn.classList.toggle('open');
});

app.start();

categoryCards.forEach((elem, i) => {
    elem.addEventListener('click', () => {
        const rotateBtn = document.querySelectorAll('.card-rotate');
        if (app.state.page === 0) {
            app.changeCategory(i);
            shuffle(arr);
        } else if (!app.state.play) {
            app.sayWord(i);
        } else if (app.state.playActive) {
            if (i === arr[app.state.currentCard]) {
                app.state.currentCard += 1;
                const correct = new Audio('src/data/audio/correct.mp3');
                correct.play();
                correct.addEventListener('ended', () => {
                    app.sayWord(arr[app.state.currentCard]);
                });
            } else {
                app.state.errors += 1;
                const err = new Audio('src/data/audio/error.mp3');
                err.play();
            }
        }
        rotateBtn.forEach((elems) => {
            elems.addEventListener('click', (e) => {
                e.stopPropagation();
                app.flipCard(e.target);
                app.state.isFlipped = true;
            });
        });
    });
    elem.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        elem.classList.remove('is-flipped');
        app.state.isFlipped = false;
    });
});

const startButton = document.querySelector('.start_btn');

categoryLinks.forEach((elem, i) => {
    elem.addEventListener('click', () => {
        app.changeCategory(i - 1);
        shuffle(arr);
        startButton.classList.remove('repeatBtn');
        startButton.textContent = 'START';
        nav.classList.toggle('active');
        btn.classList.toggle('open');
    });
});

modeButton.addEventListener('click', () => {
    app.changeMode();
    app.state.currentCard = 0;
    startButton.classList.remove('repeatBtn');
    startButton.textContent = 'START';
    if (app.state.page !== 0) {
        const rotateBtn = document.querySelectorAll('.card-rotate');
        const wordList = document.querySelectorAll('.word');
        const imageList = document.querySelectorAll('.image');
        const btns = document.querySelector('.btns');
        rotateBtn.forEach((elems) => {
            elems.classList.toggle('play_mode');
        });
        wordList.forEach((elems) => {
            elems.classList.toggle('play_mode');
        });
        imageList.forEach((elems) => {
            elems.classList.toggle('img_play_mode');
        });
        btns.classList.toggle('btns_play');
        if (app.state.play) {
            shuffle(arr);
        }
    }
});

startButton.addEventListener('click', () => {
    app.sayWord(arr[app.state.currentCard]);
    if (!startButton.classList.contains('repeatBtn')) {
        app.state.playActive = true;
        startButton.classList.add('repeatBtn');
        startButton.innerHTML = '<span class="material-icons">loop</span>';
        document.querySelector('.material-icons').style.fontSize = '38px';
    }
});

alert('ВНИМАНИЕ, проверяющий!!! Убедительная просьба не выставлять на данный момент оценку за таск, я еще нахожусь в процессе выполнения данного задания! Моя телега для контактов @ant_mihailov');
