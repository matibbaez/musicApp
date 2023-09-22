// Espera 3 segundos (3000 milisegundos) antes de ocultar el loader
setTimeout(function() {
    // Oculta el loader
    document.querySelector('.loader').style.display = 'none';

    // Muestra el contenido principal
    document.querySelector('.container').classList.remove('hidden');
}, 400);
