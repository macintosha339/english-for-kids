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
    }

    state = {
        page: 0,
        currentCard: 0,
        play: false,
        playActive: false,
        randomArr: [],
        errors: 0,
        endGame: false,
        isFlipped: false,
    }

    start() {
        this.loadImg(this.card1, 'src/data/img/games.png');
        this.loadImg(this.card2, 'src/data/img/fruit.jpg');
        this.loadImg(this.card3, 'src/data/img/vegetables.jpg');
        this.loadImg(this.card4, 'src/data/img/actions.jpg');
        this.loadImg(this.card5, 'src/data/img/animals.jpg');
        this.loadImg(this.card6, 'src/data/img/things.jpg');
        this.loadImg(this.card7, 'src/data/img/clothes.jpg');
        this.loadImg(this.card8, 'src/data/img/emotions.jpg');
    }

    loadImg(elem, url) {
        const img = document.createElement('img');
        const elemI = elem.appendChild(img);
        elemI.src = url;
        return this;
    }

    changeCategory(indexOfCategory) {
        this.state.page = indexOfCategory + 1;
        this.arrCards.forEach((elem, i) => {
            // eslint-disable-next-line no-param-reassign
            elem.innerHTML = `<div class="card__face card__face--front">
            ${cards[indexOfCategory + 1][i].word}
            <div class = "card-rotate"></div>
            <img src = 'src/data/${cards[indexOfCategory + 1][i].image}'>
            </div>
            <div class="card__face card__face--back">${cards[indexOfCategory + 1][i].translation}</div>`;
            // const img = elem.querySelector('img');
            // img.src = `src/data/${cards[indexOfCategory + 1][i].image}`;
        });
    }

    flipCard(element) {
        element.parentNode.parentNode.classList.toggle('is-flipped');
        return this;
    }
}

export default App;
