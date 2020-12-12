import cards from '../data/cardsData';

class App {
    constructor() {
        this.card1 = document.getElementById('1_card');
        this.card2 = document.getElementById('2_card');
        this.card3 = document.getElementById('3_card');
        this.card4 = document.getElementById('4_card');
        this.card5 = document.getElementById('5_card');
        this.card6 = document.getElementById('6_card');
        this.card7 = document.getElementById('7_card');
        this.card8 = document.getElementById('8_card');
        this.arrCards = [this.card1, this.card2, this.card3, this.card4, this.card5, this.card6,
            this.card7, this.card8];
        this.arrLinks = document.querySelectorAll('.category__link');
    }

    state = {
        page: 0,
        currentCard: 0,
        play: false,
        playActive: false,
        errors: 0,
        endGame: false,
        isFlipped: false,
    }

    start() {
        this.loadImg(this.card1, 'src/data/img/games.png', 'image');
        this.loadImg(this.card2, 'src/data/img/fruit.jpg', 'image');
        this.loadImg(this.card3, 'src/data/img/vegetables.jpg', 'image');
        this.loadImg(this.card4, 'src/data/img/actions.jpg', 'image');
        this.loadImg(this.card5, 'src/data/img/animals.jpg', 'image');
        this.loadImg(this.card6, 'src/data/img/things.jpg', 'image');
        this.loadImg(this.card7, 'src/data/img/clothes.jpg', 'image');
        this.loadImg(this.card8, 'src/data/img/emotions.jpg', 'image');
        this.arrLinks[this.state.page].style.color = '#3D3D3D';
    }

    loadImg(elem, url, selectorClass) {
        const img = document.createElement('img');
        const elemI = elem.appendChild(img);
        elemI.classList.add(selectorClass);
        elemI.src = url;
        return this;
    }

    changeCategory(indexOfCategory) {
        this.arrLinks[this.state.page].style.color = '#FFF';
        this.state.page = indexOfCategory + 1;
        this.state.playActive = false;
        this.state.currentCard = 0;
        this.arrLinks[this.state.page].style.color = '#3D3D3D';
        if (indexOfCategory === -1) {
            this.arrCards.forEach((elem, i) => {
                // eslint-disable-next-line no-param-reassign
                elem.innerHTML = `${cards[indexOfCategory + 1][i].word}
                <img src = 'src/data/${cards[indexOfCategory + 1][i].image}' class="image">`;
            });
        } else {
            this.arrCards.forEach((elem, i) => {
                // eslint-disable-next-line no-param-reassign
                elem.innerHTML = `<div class="card__face card__face--front">
                <span class = "word">${cards[indexOfCategory + 1][i].word}</span>
                <div class = "card-rotate"></div>
                <img src = 'src/data/${cards[indexOfCategory + 1][i].image}' class = "image">
                </div>
                <div class="card__face card__face--back">${cards[indexOfCategory + 1][i].translation}</div>`;
            });
        }
        if (this.state.play) {
            const startBtn = document.querySelector('.btns');
            if (this.state.page !== 0) {
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
                if (!startBtn.classList.contains('btns_play')) startBtn.classList.toggle('btns_play');
            } else {
                startBtn.classList.toggle('btns_play');
            }
        }
    }

    flipCard(element) {
        element.parentNode.parentNode.classList.toggle('is-flipped');
        return this;
    }

    sayWord(indexOfWord) {
        const audio = new Audio(`src/data/${cards[this.state.page][indexOfWord].audioSrc}`);
        audio.play();
        return this;
    }

    changeMode() {
        this.state.play = !this.state.play;
        if (!this.state.play) this.state.playActive = false;
    }
}

export default App;
