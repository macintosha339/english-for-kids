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
    }

    state = {
        page: 0,
        currentCard: 0,
        play: false,
        playActive: false,
        randomArr: [],
        errors: 0,
        endGame: false,
    }

    start() {
        this.loadImg(this.card1, 'src/data/img/vegetables.jpg');
        this.loadImg(this.card2, 'src/data/img/apple.jpg');
        this.loadImg(this.card3, 'src/data/img/vegetables.jpg');
        this.loadImg(this.card4, 'src/data/img/vegetables.jpg');
        this.loadImg(this.card5, 'src/data/img/vegetables.jpg');
        this.loadImg(this.card6, 'src/data/img/vegetables.jpg');
        this.loadImg(this.card7, 'src/data/img/vegetables.jpg');
        this.loadImg(this.card8, 'src/data/img/vegetables.jpg');
    }

    loadImg(elem, url) {
        const img = document.createElement('img');
        const elemI = elem.appendChild(img);
        elemI.src = url;
        return this;
    }
}

export default App;
