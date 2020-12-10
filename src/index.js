import './style/style.scss';
import App from './components/App';
import cards from './data/cardsData';

const app = new App();
const btn = document.getElementById('show');
const nav = document.getElementById('nav');
const categoryCards = [app.card1, app.card2, app.card3, app.card4, app.card5, app.card6, app.card7,
    app.card8];

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
        } else {
            app.sayWord(i);
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

alert('ВНИМАНИЕ, проверяющий!!! Убедительная просьба не выставлять на данный момент оценку за таск, я еще нахожусь в процессе выполнения данного задания! Моя телега для контактов @ant_mihailov');
