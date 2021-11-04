song = document.querySelector('.title');
artist = document.querySelector('.artist');
album = document.querySelector('.album');
prev = document.getElementById('prev');
next = document.getElementById('next');
darkmode = document.querySelector('.darkmode')
body = document.querySelector('body')
album = document.querySelector('.album');
const music = document.getElementById('sound')
const play = document.getElementById('play')
const like = document.querySelector('#like')
const playlist = document.querySelector('#playlist')
const frame = document.querySelector('.frame')
const fMenu = document.querySelector('.fMenu')
const folder = document.getElementsByClassName('.folder')
const info = document.querySelector('#info')
const mode = document.querySelector('#mode')
const close = document.querySelector('#close')
progress = document.querySelector('#progress');
progressLine = document.querySelector('#progress-line');
totalDuration = document.getElementById("f-progress");
current_time = document.getElementById("i-progress");
leftBack = document.getElementById("remain-progress");
letter = document.getElementById("letter");
vbar = document.getElementById("vbar");
firsthold = document.getElementById("firsthold");
volume = document.getElementById("volume");
down = document.getElementById('down')
playNav = document.getElementById('playNav')
center = document.querySelector('.center')


times = setInterval(progress_grace, 1000);

center.style.display = 'none'
leftBack.style.display = 'none';
vbar.style.display = 'none';



// Song list

const list = [
    {
        name: "Hôn Lễ Của Em _ Hứa Quang Hán x Chương Nhược Nam _ Khách Mời - Trương Viễn",
        title: "Khách Mời",
        Artist: "Trương Viễn",
        album: "trieulotu1",
        Duration: '05:31'
    },
    {
        name: "Gõ đáng yêu rồi nhấn phím 5_ 输入法可爱按第五_vietsub_pinyin",
        title: "Gõ Đáng Yêu Rồi Nhấn Phím 5",
        Artist: "Mika",
        album: "trieulotu2",
        Duration: '03:50'
    },
    {
        name: "[Vietsub + Pinyin] Câu Chuyện Nếu Như - Superluckyqi _  如果的事 (Tik Tok_抖音)",
        title: "Câu Chuyện Nếu Như",
        Artist: "Superluckyqi",
        album: "trieulotu3",
        Duration: '03:29'
    },
    {
        name: "[Vietsub + Tiktok] Ngu Hề Thán - Văn Nhân Thính Thư _ 虞兮叹 - 闻人听書",
        title: "Ngu Hề Thán",
        Artist: "Văn Nhân Thính Thư",
        album: "trieulotu4",
        Duration: '03:31'
    },
    {
        name: "[Vietsub] Yến Vô Hiết – Tưởng Tuyết Nhi _ 燕无歇",
        title: "Yết Vô Hiết",
        Artist: "Tưởng Tuyết Nhi",
        album: "trieulotu5",
        Duration: '03:22'
    }
]

const loadSong = (list) => {
    song.textContent = list.title;
    artist.textContent = list.Artist;
    music.src = "songs/" + list.name + ".mp3";
    album.src = "imgs/" + list.album + ".jpg";
    info.setAttribute('title',
        `Title: ${list.title}
Artist: ${list.Artist}
Album: ${list.album}
Duration: ${list.Duration}`)
    like.classList.replace("fa-heart", "fa-heart-o");
    like.style.color = 'black';
}

songIndex = 0;
const nextSong = () => {
    songIndex = (songIndex + 1) % list.length;
    loadSong(list[songIndex]);
    pauseMusic();
}
const prevSong = () => {
    songIndex = (songIndex - 1 + list.length) % list.length;
    loadSong(list[songIndex]);
    pauseMusic();
}

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);


let isLiked = false;
const liked = () => {
    isLiked = true;
    like.classList.replace("fa-heart-o", "fa-heart");
    like.style.color = 'red';
}
const unliked = () => {
    isLiked = false;
    like.classList.replace("fa-heart", "fa-heart-o");
    like.style.color = 'black';
}
like.addEventListener("click", () => {
    if (isLiked) {
        unliked();
    } else {
        liked();
    }
})
let isOpened = false;
const unOpen = () => {
    isOpened = true;
    playlist.style.color = 'blue';
}
const Open = () => {
    isOpened = false;
    playlist.style.color = 'black';
}
playlist.addEventListener("click", () => {
    if (isOpened) {
        Open();
    } else {
        unOpen();
    }
})

let isToggled = false;
const notoggle = () => {
    isToggled = true;
    mode.style.color = 'yellow';
    body.classList.add('darkmode')
}
const toggle = () => {
    isToggled = false;
    mode.style.color = 'black';
    body.classList.remove('darkmode')
}
mode.addEventListener("click", () => {
    if (isToggled) {
        toggle();
    } else {
        notoggle();
    }
})



// For controlling audio

let isPlaying = false;
const pauseMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
}
const playMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
}
play.addEventListener("click", () => {
    if (isPlaying) {
        playMusic();
    }
    else {
        pauseMusic();
    }
});



// For update time according to song

music.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.target;

    // Total duration update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_Duration = `0${min_duration}:${sec_duration}`;

    // Current duration update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);






    if (sec_currentTime < 10) {
        let tot_currentTime = `${min_currentTime}:0${sec_currentTime}`;
        current_time.textContent = tot_currentTime;
    }
    else {
        let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
        current_time.textContent = tot_currentTime;
    }


    let remainTime = (duration - currentTime);
    let lTime = Math.floor(remainTime / 60);
    let rTime = Math.floor(remainTime % 60);
    leftback = `${lTime}: ${rTime}`;

    if (duration) {
        totalDuration.textContent = tot_Duration;
        leftBack.textContent = leftback;
    }

    if (rTime < 10) {
        leftback = `-${lTime}: 0${rTime}`;
        leftBack.textContent = leftback;
    }
    else {
        leftback = `-${lTime}: ${rTime}`;
        leftBack.textContent = leftback;
    }

    totalDuration.addEventListener("click", function () {
        totalDuration.style.display = ('none')
        leftBack.style.display = ('block')
    })
    leftBack.addEventListener("click", function () {
        totalDuration.style.display = ('block')
        leftBack.style.display = ('none')
    })

    // console.log(sec_currentTime);
})


function volume_change() {
    music.volume = vbar.value / 100;
    let volumeto = vbar.value;
    if (volumeto < 50) {
        volume.classList.replace("fa-volume-up", "fa-volume-down")
    }
    if (volumeto > 50) {
        volume.classList.replace("fa-volume-down", "fa-volume-up")
    }
    if (volumeto == 0) {
        volume.classList.replace("fa-volume-down", "fa-volume-off")
    }
    if (volumeto > 0 && volumeto < 50) {
        volume.classList.replace("fa-volume-off", "fa-volume-down")
    }
    if (volumeto > 0 && volumeto > 50) {
        volume.classList.replace("fa-volume-off", "fa-volume-up")
    }
}



isMute = false;
let halfMute = false;
const unMute = () => {
    music.volume = 0.0;
    isMute = true;
    volume.classList.replace("fa-volume-up", "fa-volume-off")
}
const mute = () => {
    isMute = false;
    halfMute = false;
    music.volume = vbar.value / 100;
    volume.classList.replace("fa-volume-off", "fa-volume-up")

}
const locateMute = () => {
    halfMute = true;
    volume.classList.replace("fa-volume-down", "fa-volume-off")
    music.volume = 0.0;
}
const hMute = () => {
    halfMute = false;
    music.volume = vbar.value / 100;
    volume.classList.replace("fa-volume-off", "fa-volume-down")
}
function mute_sound() {
    if (isMute || halfMute) {
        if (vbar.value > 50) { mute() }
        else {
            hMute()
        }
    }
    else {
        if (vbar.value > 50) { unMute() }
        else {
            locateMute()
        }
    }



}

let isClicked = false;
const notoggled = () => {
    isClicked = true;
    vbar.style.display = 'none';
}
const toggled = () => {
    isClicked = false;
    vbar.style.display = 'block';
}
volume.addEventListener("click", function () {
    if (isClicked) {
        toggled();
    }
    else {
        notoggled();
    }
})



function music_change() {
    let progress_position = music.duration * (progress.value / 100);
    music.currentTime = progress_position;
}
function progress_grace() {
    let position = 0;

    if (music.duration != isNaN) {
        position = music.currentTime * (100 / music.duration);
        progress.value = position;
    }
}


let goDown = false;
const tDown = () => {
    goDown = true;
    down.classList.replace("fa-angle-up", "fa-angle-down");
    playNav.style.top = '80px';
    playNav.style.borderBottomLeftRadius = '0';
    playNav.style.borderBottomRightRadius = '0';
    center.style.display = 'block';
}
const noTDown = () => {
    goDown = false;
    down.classList.replace("fa-angle-down", "fa-angle-up");
    playNav.style.top = '428px';
    playNav.style.borderBottomLeftRadius = '40px';
    playNav.style.borderBottomRightRadius = '40px';
    center.style.display = 'none';
}

function toggle_down() {
    if (goDown) {
        noTDown();
    } else {
        tDown();
    }
}

music.addEventListener("ended", function () {
    current_time.textContent = '0:00';
    totalDuration.style.display = ('block')
    leftBack.style.display = ('none')
    play.classList.replace("fa-pause", "fa-play")
})


