var TRACKS = [
    "./audio/prologue.mp3",
]
var STEP = [10, 60, 300]
var SPEED = [1, 1.2, 1.5, 1.7, 2]
var state = {
    "playing" : false,
    "speed" : SPEED[0],
    "step" : STEP[0],
    "currentTrack" : 0,
    "currentTime" : 0,
}

var audio = document.getElementById('audio')

/* Loading */
function loadState() {
    stepBtn.innerHTML = Object.keys(STEP).find(k => STEP[k] === step)
}

/* ELEMENTS AND CONTROL BUTTONS */
var progressBar = document.getElementById('progress-bar')
var playPauseBtn = document.getElementById('play-pause')
var stepBtn = document.getElementById('step')
var backwardsBtn = document.getElementById('backwards')
var forewardsBtn = document.getElementById('forewards')
var speedBtn = document.getElementById('playspeed')

/* EVENTLISTENERS */
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
audio.addEventListener('timeupdate', updateAudioProgress)
audio.addEventListener('ended', endTract)

/* FUNCTIONS */
function play() {
    state.playing = true
    audio.play()
    playPauseBtn.classList.add('paused')   
}
function pause() {
    state.playing = false
    audio.pause()
    playPauseBtn.classList.remove('paused') 
}
function changeStep() {
    var stepIndex = STEP.indexOf(state.step) || 0
    if (stepIndex < STEP.length - 1) {
        stepIndex++
    } else {
        stepIndex = 0
    }
    state.step = STEP[stepIndex]
    var stateRender = ""
    if (state.step < 60) {
        stateRender = state.step.toString() + `"`
    } else {
        stateRender = state.step / 60 + `'`
    }
    stepBtn.innerHTML = stateRender
}
function changeSpeed() {
    var speedIndex = SPEED.indexOf(state.speed) || 0
    if (speedIndex < SPEED.length - 1) {
        speedIndex++
    } else {
        speedIndex = 0
    }
    state.speed = SPEED[speedIndex]
    audio.playbackRate = state.speed
    speedBtn.innerHTML = "x" + state.speed
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
function updateAudioProgress(e) {
    var {duration, currentTime} = e.srcElement
    var progressPercent = (currentTime / duration) * 100 || 0
    progressBar.style.width = `${progressPercent}%`
}
function endTract() {
    audio.currentTime = 0
    state.playing = false      
    playPauseBtn.classList.remove('paused') 
}


