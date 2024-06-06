document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io();

    const libreButton = document.getElementById('libre');
    const ocupadoButton = document.getElementById('ocupado');
    const compartirButton = document.getElementById('compartir');
    const buttons = document.querySelectorAll('.btn');
    const colorBackground = document.querySelector('.color-background');

    const sendCommand = (command) => {
        socket.emit('command', command);
    };

    const setActiveButton = (activeButton) => {
        buttons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    };

    libreButton.addEventListener('click', () => {
        colorBackground.style.backgroundColor = 'green';
        sendCommand('libre');
        setActiveButton(libreButton);
    });

    ocupadoButton.addEventListener('click', () => {
        colorBackground.style.backgroundColor = 'red';
        sendCommand('ocupado');
        setActiveButton(ocupadoButton);
    });

    compartirButton.addEventListener('click', () => {
        colorBackground.style.backgroundColor = 'blue';
        sendCommand('compartir');
        setActiveButton(compartirButton);
    });
});
