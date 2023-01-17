//Initia Data
let currentColor = 'black';
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

//Events
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', colorClick);
});

//Functions
function colorClick(e){
    currentColor = e.target.getAttribute('data-color');
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}