import './style/style.scss';
import App from './components/App';

const btn = document.getElementById('show');
const nav = document.getElementById('nav');

btn.addEventListener('click', () => {
    nav.classList.toggle('active');
    btn.classList.toggle('open');
});

const app = new App();
app.start();
console.log(app);

alert('ВНИМАНИЕ, проверяющий!!! Убедительная просьба не выставлять на данный момент оценку за таск, я еще нахожусь в процессе выполнения данного задания! Моя телега для контактов @ant_mihailov');
