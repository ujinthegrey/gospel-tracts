var STEP = {
    "10s" : 10,
    "1m" : 60,
    "5m" : 300,
    "15m" : 900,
}
var SPEED = {
    "1.0" : 1,
    "1.2" : 1.2,
    "1.5" : 1.5,
    "1.7" : 1.7,
}
var state = {
    "active" : false,
    "playing" : false,
    "speed" : SPEED["1.0"],
    "step" : STEP["10s"],
    "currentTime" : 0,
}

var audio = document.getElementById('audio')

/* ELEMENTS */
var showPlayerBtn = document.getElementById('show-player')
var nav = document.getElementById('nav')
var player = document.getElementById('player')
var progressBar = document.getElementById('progress-bar')

/* AUDIO CONTROLL BUTTONS */
var playPauseBtn = document.getElementById('play-pause')
var stepBtn = document.getElementById('step')
var backwardsBtn = document.getElementById('backwards')
var forewardsBtn = document.getElementById('forewards')
var speedBtn = document.getElementById('playspeed')

/* EVENTLISTENERS */
showPlayerBtn.addEventListener("click", () => {
    showPlayer()
})
playPauseBtn.addEventListener("click", () => {
    if (!state.playing) {
        play()
    } else {
        pause()
    }
})
stepBtn.addEventListener('click', () => {
    changeStep()
})
forewardsBtn.addEventListener("click", () => {
    const step = state.step
    stepForwards(step)
})
backwardsBtn.addEventListener("click", () => {
    const step = state.step
    stepBackwards(step)
})
speedBtn.addEventListener('click', () => {
    changeSpeed()
})
document.addEventListener("scroll", () => {
    if (!state.active) updateScrollProgress()
})
audio.addEventListener('timeupdate', updateAudioProgress)
audio.addEventListener('ended', endTract())

/* FUNCTIONS */
function showPlayer() {
    nav.classList.add("hide")
    player.classList.add("show")
    state.active = true
    play()
}
function hidePlayer() {
    player.classList.remove("show")
    nav.classList.remove("hide")
    state.active = false
}
function play() {
    state.playing = true
    audio.play()
    playPauseBtn.innerHTML = "&#10074;&#10074;"   
}
function pause() {
    state.playing =false
    audio.pause()
    playPauseBtn.innerHTML = "&#9658;"      
}
function changeStep() {
    var step = state.step
    if (state.step === STEP["10s"]) step = STEP["1m"]
    if (state.step === STEP["1m"]) step = STEP["5m"]
    if (state.step === STEP["5m"]) step = STEP["15m"]
    if (state.step === STEP["15m"]) step = STEP["10s"]
    state.step = step
    stepBtn.innerHTML = Object.keys(STEP).find(k => STEP[k] === step)
}
function changeSpeed() {
    var speed = state.speed
    if (state.speed === SPEED["1.0"]) speed = SPEED["1.2"]
    if (state.speed === SPEED["1.2"]) speed = SPEED["1.5"]
    if (state.speed === SPEED["1.5"]) speed = SPEED["1.7"]
    if (state.speed === SPEED["1.7"]) speed = SPEED["1.0"]
    state.speed = speed
    speedBtn.innerHTML = Object.keys(SPEED).find(k => SPEED[k] === speed)
    audio.playbackRate = speed
}
function stepForwards(step) {
    if (audio.currentTime + step < audio.duration) {
        audio.currentTime = audio.currentTime + step
    }
}
function stepBackwards(step) {
    if (audio.currentTime - step > 0 ) {
        audio.currentTime = audio.currentTime - step
    } else {
        audio.currentTime = 0
    }
}
function updateScrollProgress() {
    progressBar.style.setProperty("width", ((document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100).toString() + "%")
}
function updateAudioProgress(e) {
    var {duration, currentTime} = e.srcElement
    var progressPercent = (currentTime / duration) * 100 || 0
    progressBar.style.width = `${progressPercent}%`
}
function endTract() {
    if (!state.active) return
    console.log("ENDED!");    
    playPauseBtn.innerHTML = "&#9658;"
    hidePlayer()
}


