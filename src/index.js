import './style/style.scss';

const btn = document.getElementById('show');
const nav = document.getElementById('nav');

btn.addEventListener('click', () => {
    nav.classList.toggle('active');
});
