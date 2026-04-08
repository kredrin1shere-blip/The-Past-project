const images = ['gallery/1.png', 'gallery/2.png', 'gallery/3.png', 'gallery/4.png', 'gallery/5.png', 'gallery/6.png', 'gallery/7.png', 'gallery/8.png', 'gallery/9.png']; 

const track = document.getElementById('sliderTrack');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
let currentIndex = 0;

// 1. Ініціалізація слайдера
function initSlider() {
    // Подвоюємо масив для безперервності
    const fullList = [...images, ...images]; 
    
    fullList.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = `images/${src}`;
        // Вираховуємо реальний індекс (0, 1, 2, 3...)
        img.onclick = () => openModal(index % images.length);
        track.appendChild(img);
    });

    // Запускаємо анімацію після короткої паузи, щоб браузер встиг відмалювати картинки
    setTimeout(() => {
        track.classList.add('running');
    }, 100);
}

// 2. Функції модального вікна
function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    updateModalImg();
}

function updateModalImg() {
    modalImg.src = `images/${images[currentIndex]}`;
}

document.querySelector('.close').onclick = () => modal.style.display = "none";

document.querySelector('.next').onclick = (e) => {
    e.stopPropagation(); // Щоб клік по кнопці не закривав модалку
    currentIndex = (currentIndex + 1) % images.length;
    updateModalImg();
};

document.querySelector('.prev').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModalImg();
};

// Закриття при кліку на фон (модальне вікно)
modal.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

initSlider();