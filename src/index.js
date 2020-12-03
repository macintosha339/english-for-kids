import './style/style.scss';
import App from './components/App';

const btn = document.getElementById('show');
const nav = document.getElementById('nav');

btn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

const app = new App();
app.start();
console.log(app);
