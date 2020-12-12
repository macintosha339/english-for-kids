import './style/style.scss';
import App from './components/App';
import shuffle from './components/Shuffle';

const app = new App();
const btn = document.getElementById('show');
const header = document.querySelector('header');
const nav = document.getElementById('nav');
const wrapper = document.querySelector('.wrapper');
const btns = document.querySelector('.btns');
const categoryCards = [app.card1, app.card2, app.card3, app.card4, app.card5, app.card6, app.card7,
    app.card8];
const categoryLinks = document.querySelectorAll('.category__link');
const modeButton = document.querySelector('.tgl-btn');
const arr = [0, 1, 2, 3, 4, 5, 6, 7];
const starsBlock = document.querySelector('.answers_block');
const hideList = [header, nav, wrapper, btns];
const startButton = document.querySelector('.start_btn');

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
                app.loadImg(starsBlock, 'src/data/img/star-win.svg', 'star');
                correct.play();
                elem.classList.add('hide');
                if (app.state.currentCard === 8 && app.state.errors === 0) {
                    correct.addEventListener('ended', () => {
                        const winVoice = new Audio('src/data/audio/success.mp3');
                        hideList.forEach((item) => {
                            item.classList.add('dissapear');
                        });
                        app.loadImg(document.body, 'src/data/img/success.jpg', 'endGameImage');
                        winVoice.play();
                        setTimeout(() => {
                            app.changeCategory(-1);
                            hideList.forEach((item) => {
                                item.classList.remove('dissapear');
                            });
                            const success = document.querySelector('.endGameImage');
                            success.remove();
                            categoryCards.forEach((cards) => {
                                cards.classList.remove('hide');
                            });
                            const starsList = document.querySelectorAll('.star');
                            starsList.forEach((stars) => {
                                stars.remove();
                            });
                            startButton.classList.remove('repeatBtn');
                            startButton.textContent = 'START';
                        }, 2000);
                    });
                    console.log('WIN!!!!!!!!!');
                }
                if (app.state.currentCard === 8 && app.state.errors !== 0) {
                    correct.addEventListener('ended', () => {
                        const loseVoice = new Audio('src/data/audio/failure.mp3');
                        hideList.forEach((item) => {
                            item.classList.add('dissapear');
                        });
                        app.loadImg(document.body, 'src/data/img/failure.jpg', 'endGameImage');
                        const mistakes = document.createElement('div');
                        const errors = document.body.appendChild(mistakes);
                        errors.classList.add('endGameDiv');
                        errors.innerHTML = `You make ${app.state.errors} mistakes!`;
                        loseVoice.play();
                        setTimeout(() => {
                            app.changeCategory(-1);
                            hideList.forEach((item) => {
                                item.classList.remove('dissapear');
                            });
                            const success = document.querySelector('.endGameImage');
                            success.remove();
                            errors.remove();
                            categoryCards.forEach((cards) => {
                                cards.classList.remove('hide');
                            });
                            const starsList = document.querySelectorAll('.star');
                            starsList.forEach((stars) => {
                                stars.remove();
                            });
                            startButton.classList.remove('repeatBtn');
                            startButton.textContent = 'START';
                        }, 2000);
                    });
                    console.log('FAILURE');
                }
                if (app.state.currentCard < 8) {
                    correct.addEventListener('ended', () => {
                        app.sayWord(arr[app.state.currentCard]);
                    });
                }
            } else {
                app.state.errors += 1;
                app.loadImg(starsBlock, 'src/data/img/star.svg', 'star');
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

categoryLinks.forEach((elem, i) => {
    elem.addEventListener('click', () => {
        app.changeCategory(i - 1);
        shuffle(arr);
        app.state.errors = 0;
        starsBlock.textContent = '';
        categoryCards.forEach((cards) => {
            cards.classList.remove('hide');
        });
        startButton.classList.remove('repeatBtn');
        startButton.textContent = 'START';
        nav.classList.toggle('active');
        btn.classList.toggle('open');
    });
});
modeButton.addEventListener('click', () => {
    app.changeMode();
    app.state.currentCard = 0;
    app.state.errors = 0;
    starsBlock.textContent = '';
    categoryCards.forEach((cards) => {
        cards.classList.remove('hide');
    });
    startButton.classList.remove('repeatBtn');
    startButton.textContent = 'START';
    if (app.state.page !== 0) {
        const rotateBtn = document.querySelectorAll('.card-rotate');
        const wordList = document.querySelectorAll('.word');
        const imageList = document.querySelectorAll('.image');
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
