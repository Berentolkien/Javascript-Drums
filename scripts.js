const keyState = {}; // Objeto para rastrear el estado de las teclas

window.addEventListener('keydown', function (e) {
    if (keyState[e.keyCode]) return; // Si la tecla ya está presionada, no hagas nada
    keyState[e.keyCode] = true; // Marca la tecla como presionada

    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; // Detén la función si no hay audio asociado

    audio.currentTime = 0; // Reinicia el sonido si se está reproduciendo actualmente
    audio.play();
    key.classList.add('playing');
});

window.addEventListener('keyup', function (e) {
    keyState[e.keyCode] = false; // Marca la tecla como no presionada al soltarla
});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // Solo esperamos la transición de transformación
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
