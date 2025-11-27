var songs = [
    {title: "DDU-DU DDU-DU", artist: "BLACKPINK", album: "SQUARE UP", 
    duration: "3:28", cover: 'linear-gradient(135deg, #ff1493, #c71585)', audioUrl: '/music/ddu-du-ddu-du.mp3'},
    {title: "Kill This Love", artist: "BLACKPINK", album: "KILL THIS LOVE", 
    duration: "3:13", cover: 'linear-gradient(135deg, #c71585, #000000)', audioUrl: '/music/kill-this-love.mp3'},
    {title: "How You Like That", artist: "BLACKPINK", album: "THE ALBUM", 
    duration: "3:02", cover: 'linear-gradient(135deg, #ff69b4, #ff1493)', audioUrl: '/music/how-you-like-that.mp3'},
    {title: "BOOMBAYAH", artist: "BLACKPINK", album: "SQUARE ONE", 
    duration: "4:00", cover: 'linear-gradient(135deg, #000000, #ff1493)', audioUrl: '/music/boombayah.mp3'},
    {title: "Whistle", artist: "BLACKPINK", album: "SQUARE ONE", 
    duration: "3:32", cover: 'linear-gradient(135deg, #ff1493, #ff69b4)', audioUrl: '/music/whistle.mp3'},
    {title: "Playing with Fire", artist: "BLACKPINK", album: "SQUARE TWO", 
    duration: "3:30", cover: 'linear-gradient(135deg, #c71585, #ff69b4)', audioUrl: '/music/playing-with-fire.mp3'},
    {title: "As If It's Your Last", artist: "BLACKPINK", album: "SINGLE", 
    duration: "3:32", cover: 'linear-gradient(135deg, #ff69b4, #000000)', audioUrl: '/music/as-if-its-your-last.mp3'},
    {title: "Stay", artist: "BLACKPINK", album: "SQUARE TWO", 
    duration: "3:22", cover: 'linear-gradient(135deg, #ff1493, #c71585)', audioUrl: '/music/stay.mp3'},
    {title: "Pink Venom", artist: "BLACKPINK", album: "BORN PINK", 
    duration: "3:07", cover: 'linear-gradient(135deg, #000000, #c71585)', audioUrl: '/music/pink-venom.mp3'},
    {title: "Shut Down", artist: "BLACKPINK", album: "BORN PINK", 
    duration: "2:54", cover: 'linear-gradient(135deg, #c71585, #ff1493)', audioUrl: '/music/shut-down.mp3'},
    {title: "Lovesick Girls", artist: "BLACKPINK", album: "THE ALBUM", 
    duration: "3:12", cover: 'linear-gradient(135deg, #ff69b4, #c71585)', audioUrl: '/music/lovesick-girls.mp3'},
    {title: "Ice Cream", artist: "BLACKPINK ft. Selena Gomez", album: "THE ALBUM", 
    duration: "2:56", cover: 'linear-gradient(135deg, #ff1493, #ff69b4)', audioUrl: '/music/ice-cream.mp3'},
    {title: "Forever Young", artist: "BLACKPINK", album: "SQUARE UP", 
    duration: "3:56", cover: 'linear-gradient(135deg, #ff1493, #000000)', audioUrl: '/music/forever-young.mp3'},
    {title: "Pretty Savage", artist: "BLACKPINK", album: "THE ALBUM", 
    duration: "3:18", cover: 'linear-gradient(135deg, #000000, #ff69b4)', audioUrl: '/music/pretty-savage.mp3'},
    {title: "The Girls", artist: "BLACKPINK", album: "BORN PINK", 
    duration: "2:55", cover: 'linear-gradient(135deg, #c71585, #ff69b4)', audioUrl: '/music/the-girls.mp3'},
    {title: "Jump", artist: "BLACKPINK", album: "JUMP", 
    duration: "3:14", cover: 'linear-gradient(135deg, #c71585, #ff69b4)', audioUrl: '/music/jump.mp3'},
    {title: "Flower", artist: "JISOO", album: "ME", 
    duration: "2:53", cover: 'linear-gradient(135deg, #ff1493, #000000)', audioUrl: '/music/flower.mp3'},
    {title: "Solo", artist: "JENNIE", album: "SOLO", 
    duration: "2:49", cover: 'linear-gradient(135deg, #000000, #c71585)', audioUrl: '/music/solo.mp3'},
    {title: "On Th Ground", artist: "ROSE", album: "R", 
    duration: "2:48", cover: 'linear-gradient(135deg, #ff69b4, #ff1493)', audioUrl: '/music/on-the-ground.mp3'},
    {title: "Money", artist: "LISA", album: "LALISA", 
    duration: "2:48", cover: 'linear-gradient(135deg, #ff69b4, #000000)', audioUrl: '/music/money.mp3'}
];

const originalSongs = [...songs];

let currentSongIndex = -1;
var isPlaying = false;

const audioPlayer = document.getElementById('audioPlayer');

document.addEventListener('DOMContentLoaded', () => {
    displaySongList();
    setupEventListeners();
    updateSongCount();
    setupAudioEvents();
});

function setupAudioEvents() {
    if (!audioPlayer) return;

    audioPlayer.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        showMessage('Failed to load audio', 'error');
        playNextSong();
    } );

    audioPlayer.addEventListener('ended', () => 
        playNextSong());

    audioPlayer.addEventListener('timeupdate', () => 
        updateProgressBar());

    audioPlayer.addEventListener('loadedmetadata', () => 
        updateDuration());
}

function displaySongList() {
    const container = document.getElementById('songListContainer');
    container.innerHTML = '';
    
    songs.forEach ((song, i) => {
        const row = createSongRow(song, i);
        container.appendChild(row);
    });
    }
        
 function createSongRow(song, index) {
    const row = document.createElement('div');
    row.className = 'song-row';
    row.dataset.index = index;

    const numberDiv = document.createElement('div');
    numberDiv.className = 'song-number';
    numberDiv.innerHTML = `<span class="song-number-text">${index + 1}</span><span class="song-play-icon"></span>`;

    const coverDiv = document.createElement('div');
    coverDiv.className = 'song-album-cover';
    coverDiv.innerHTML = `<div class="cd-mini" style="background: ${song.cover}"></div>`;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'song-title-artist';
    titleDiv.innerHTML = `<div class="song-title-text">${song.title}</div><div class="song-artist-text">${song.artist}</div>`;

    const albumDiv = document.createElement('div');
    albumDiv.className = 'song-album-text';
    albumDiv.textContent = song.album;

    const durationDiv = document.createElement('div');
    durationDiv.className ='song-duration';
    durationDiv.textContent = song.duration;

    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'song-delete-btn';
    deleteBtn.innerHTML = 'x';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteSong(index);
    };

    row.onclick = () => playSong(index);

    row.append(numberDiv, coverDiv, titleDiv, albumDiv, durationDiv, deleteBtn);
    return row;
}
    
function playSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    const song = songs[index];
    
    if (!song.audioUrl) {
        showMessage('No audio available for this song', 'error');
        return;
    }

    currentSongIndex = index;

    audioPlayer.src = song.audioUrl;
    audioPlayer.load();
    audioPlayer.play().then(() => {
        isPlaying = true;
        updateNowPlaying(song);
        updateSongRows();
        startCDAnimation();
        updatePlayPauseButton();
    }).catch(error => {
        console.error('Playback failed:', error);
        isPlaying = false;
    });
}

function togglePlayPause() {
    if (currentSongIndex === -1) {
        playSong(0);
        return;
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        stopCDAnimation();
    } else {
        audioPlayer.play().then(() => {
            isPlaying = true;
            startCDAnimation();
        }).catch(console.error);
    }
        updatePlayPauseButton();
}

function playNextSong() {
    let nextIndex = currentSongIndex + 1;
    if (nextIndex >= songs.length) nextIndex = 0;
    playSong(nextIndex);
}

function playPreviousSong() {
    let prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;
    playSong(prevIndex);
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');

    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        if(progressFill) 
            progressFill.style.width = `${percent}%`;
        if(currentTimeEl) 
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

function updateDuration() {
    const durationEl = document.getElementById('duration');
    if (durationEl && audioPlayer.duration) {
        durationEl.textContent = formatTime(audioPlayer.duration);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updatePlayPauseButton() {
    const btn = document.getElementById('playPauseBtn');
    if (btn) btn.textContent = isPlaying ? '⏸︎' : '▶'
    }

function updateNowPlaying(song) {
    const titleElement = document.getElementById('nowPlayingTitle');
    const artistElement = document.getElementById('nowPlayingArtist');
    const playerCD = document.getElementById('playerCD');

    if(titleElement) titleElement.textContent = song.title;
    if(artistElement) artistElement.textContent = song.artist;
    if(playerCD) playerCD.style.background = song.cover;
}

function updateSongRows() {
    document.querySelectorAll('.song-row').forEach(row => {
    const index = parseInt(row.dataset.index);
    if (index === currentSongIndex) {
        row.classList.add('playing');
    } else {
        row.classList.remove('playing');
    }
    });
}

function startCDAnimation() {
    const mainCD = document.getElementById('mainCD');
    const playerCD = document.getElementById('playerCD');
    const miniCDs = document.querySelectorAll('.cd-mini');

    if(mainCD) mainCD.classList.add('playing');
    if(playerCD) playerCD.classList.add('playing');

    miniCDs.forEach(cd =>
        cd.classList.remove('spinning'));

    const rows = document.querySelectorAll('.song-row');
    if (rows[currentSongIndex]) {
        const miniCD = rows[currentSongIndex].querySelector('.cd-mini');
        if(miniCD) miniCD.classList.add('spinning');
    }
}

function stopCDAnimation() {
    const mainCD = document.getElementById('mainCD');
    const playerCD = document.getElementById('playerCD');
    const miniCDs = document.querySelectorAll('.cd-mini');

    if(mainCD) mainCD.classList.remove('playing');
    if(playerCD) playerCD.classList.remove('playing');

    miniCDs.forEach(cd =>
        cd.classList.remove('spinning'));
}

function shufflePlaylist() {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    displaySongList();
    showMessage('Playlist shuffled!', 'success');
}

function resetPlaylist() {
    songs = [...originalSongs];
    displaySongList();
    updateSongCount();
    showMessage('Playlist reset!', 'success');
}

function deleteSong(index) {
    if (confirm(`Remove "${songs[index].title}" from playlist?`)) {
        songs.splice(index, 1);

        if (currentSongIndex === index) {
        audioPlayer.pause();
        currentSongIndex = -1;
        isPlaying = false;
    } else if (currentSongIndex > index) {
        currentSongIndex--;
    }

    displaySongList();
    updateSongCount();
    showMessage('Song removed', 'success');
}
    }

function addNewSong() {
    const titleInput = document.getElementById('newSongTitle');
    const albumInput = document.getElementById('newAlbumName');
    const artistInput = document.getElementById('newArtistName');
    const durationInput = document.getElementById('newDuration');
    
    const title = titleInput.value.trim();
    const album = albumInput.value.trim() || 'Unknown Album';
    const artist = artistInput.value.trim() || 'BLACKPINK';
    const duration = durationInput.value.trim() || '3:30';
    
    if (title === '') {
        showMessage('Please enter a song title', 'error');
        return;
    }

    const newSong = {
        title,
        artist,
        album,
        duration,
        cover: 'linear-gradient(135deg, #ff1493, #ff69b4)',
        audioUrl: ''
    };
    
    songs.push(newSong);
    displaySongList();
    updateSongCount();
    
    titleInput.value = '';
    albumInput.value = '';
    artistInput.value = 'BLACKPINK';
    durationInput.value = '';

    showMessage('Song added!', 'success');
}

function updateSongCount() {
    const countEl = document.getElementById('playlistSongCount');
    if (countEl) {
        countEl.textContent = `${songs.length} songs`;
    }
}

function showMessage(text, type) {
    const messageBox = document.getElementById('addSongMessage');
    if (messageBox) {
        messageBox.textContent = text;
        messageBox.className = `message-box ${type} show`;

        setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
    } 
}

function setupEventListeners() {
    const playAllBtn = document.getElementById('playAllBtn');
    if (playAllBtn) playAllBtn.addEventListener('click', () => playSong(0));

    const shuffleBtn = document.getElementById('shufflePlaylistBtn');
    if (shuffleBtn) shuffleBtn.addEventListener('click', shufflePlaylist);
        
    const resetBtn = document.getElementById('resetPlaylistBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetPlaylist);

    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);

    const prevBtn = document.getElementById('prevSongBtn');
    if (prevBtn) prevBtn.addEventListener('click', playPreviousSong);

    const nextBtn = document.getElementById('nextSongBtn');
    if (nextBtn) nextBtn.addEventListener('click', playNextSong);

    const addBtn = document.getElementById('addNewSongBtn');
    if (addBtn) addBtn.addEventListener('click', addNewSong);

    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
        });
    }

    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audioPlayer.volume = e.target.value / 100;
        });
    }
}