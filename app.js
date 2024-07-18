let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songTitle = document.querySelector(".music-player h1");
let songArtist = document.querySelector(".music-player p");
let songImg = document.querySelector(".song-img");

let songs = [
    {
        title: "Give Me Some Sunshine",
        artist: "By Swanand Kirkire",
        src: "music/Give-me-some-sunshine.mp3",
        img: "images/song-give me some sunshibe.jpg"
    },
    {
        title: "Mera Safar",
        artist: "By Eqlipse Nova",
        src: "music/mera safar.mp3",
        img: "images/song-mera safar.jpeg"
    },
    {
        title: "Yalgaar",
        artist: "By Ajey Nagar",
        src: "music/Yalgaar.mp3",
        img: "images/song-yalgaar.jpg"
    }
];

let currentSongIndex = 0;

function loadSong(index) {
    let songData = songs[index];
    song.src = songData.src;
    songTitle.textContent = songData.title;
    songArtist.textContent = songData.artist;
    songImg.src = songData.img;
    progress.value = 0;
    song.onloadedmetadata = function() {
        progress.max = song.duration;
    };
    playPause(); // Automatically play the new song
}

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

function playPause() {
    if(ctrlIcon.classList.contains('fa-pause')){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
};

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

document.querySelector(".fa-forward").addEventListener("click", nextSong);
document.querySelector(".fa-backward").addEventListener("click", prevSong);

// Load the first song initially
loadSong(currentSongIndex);
