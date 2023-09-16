const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const volumeSlider = document.getElementById('volume-slider');

// Cambiar el volumen cuando el control deslizante se mueva
volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
});

// Configurar el volumen inicial
music.volume = volumeSlider.value;


const songs = [
    {
        path: 'assets/flashinglights.mp3',
        displayName: 'Flashing Lights',
        cover: 'assets/graduation.jpg',
        artist: 'Kanye West',
    },
    {
        path: 'assets/runaway.mp3',
        displayName: 'Runaway',
        cover: 'assets/mbtdf.jpg',
        artist: 'Kanye West',
    },
    {
        path: 'assets/soundtrack2mylife.mp3',
        displayName: 'Soundtrack 2 My Life',
        cover: 'assets/manonthemoon.jpg',
        artist: 'Kid Cudi',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;

    // Establecer la duración como "0:00" temporalmente
    durationEl.textContent = '0:00';
    currentTimeEl.textContent = '0:00';

    // Actualizar el texto "Playing X of Y" con el índice de la canción actual
    const songCount = document.getElementById('song-count');
    songCount.textContent = `PLAYING ${musicIndex + 1} OF ${songs.length}`;

    // Agregar un evento para detectar cuando la nueva canción está cargada
    music.addEventListener('loadedmetadata', function () {
        // Actualizar la duración cuando la canción esté cargada
        const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
        durationEl.textContent = `${formatTime(music.duration / 60)}:${formatTime(music.duration % 60)}`;
    });

    // Iniciar la reproducción de la nueva canción
    playMusic();
}


function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);