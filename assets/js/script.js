// script.js

// Efeito Parallax no Hero Section
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Animações em Cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Rolagem Suave Aprimorada
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Adiciona classe para animação de destaque
            targetElement.classList.add('highlight');
            setTimeout(() => {
                targetElement.classList.remove('highlight');
            }, 1000);
        }
    });
});

// Animação de entrada para seções
const sections = document.querySelectorAll('section');

const options = {
    root: null,
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Carrossel de Imagens
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-slide');
    const images = carousel.querySelectorAll('img');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalPrevButton = modal.querySelector('.carousel-button.prev');
    const modalNextButton = modal.querySelector('.carousel-button.next');

    let currentIndex = 0;
    const totalSlides = images.length;
    let autoplayInterval;
    let isModalOpen = false;

    // Função para iniciar autoplay
    function startAutoplay() {
        if (!isModalOpen) {
            autoplayInterval = setInterval(nextSlide, 5000);
        }
    }

    // Função para parar autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Atualizar slide com animação suave
    function updateSlide() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateModalImage() {
        modalImage.src = images[currentIndex].src;
        modalImage.alt = images[currentIndex].alt;
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlide();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        if (isModalOpen) {
            updateModalImage();
        } else {
            updateSlide();
        }
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        if (isModalOpen) {
            updateModalImage();
        } else {
            updateSlide();
        }
    }

    // Adicionar funcionalidade de visualização em tela cheia
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            updateModalImage();
            modal.classList.add('active');
            isModalOpen = true;
            stopAutoplay();
        });
    });

    // Navegação no modal
    modalPrevButton.addEventListener('click', () => {
        prevSlide();
    });

    modalNextButton.addEventListener('click', () => {
        nextSlide();
    });

    // Navegação no modal com teclado
    document.addEventListener('keydown', (e) => {
        if (isModalOpen) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

    // Fechar modal
    function closeModal() {
        modal.classList.remove('active');
        isModalOpen = false;
        startAutoplay();
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Criar indicadores de slides
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
        dotsContainer.appendChild(dot);
    });

    // Eventos dos botões do carrossel
    prevButton.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    nextButton.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });

    // Iniciar autoplay
    startAutoplay();

    // Pausar autoplay quando o mouse estiver sobre o carrossel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

});