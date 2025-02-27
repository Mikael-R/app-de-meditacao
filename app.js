// render the app
const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline= document.querySelector('.moving-outline circle')
    const video = document.querySelector('.video-container video')
    // sounds
    const sounds = document.querySelectorAll('.sound-picker button')
    // time display
    const timeDisplay = document.querySelector('.time-display')
    timeSelect = document.querySelectorAll('.time-select button')
    // length of outline
    const outlineLength = outline.getTotalLength()
    // duration
    let fakeDuration = 300

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    // choose sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            console.log('cliquei para mudar a música')
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song)
        })
    })

    // play sound
    play.addEventListener('click', () => {
        checkPlaying(song)
    })

    // select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${("00" + Math.floor(fakeDuration / 60)).slice(-2)}:${("00" + Math.floor(fakeDuration % 60)).slice(-2)}`
        })
    })
    // play and strop the sounds
    const checkPlaying = song => {
        if(song.paused) {
            song.play()
            video.play()
            play.src = './svg/pause.svg'
        } else {
            song.pause()
            video.pause()
            play.src = './svg/play.svg'
        }
    }

    // circle animation
    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsed = fakeDuration - currentTime
        let seconds = ("00" + Math.floor(elapsed % 60)).slice(-2)
        let minutes = ("00" + Math.floor(elapsed / 60)).slice(-2)

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress

        // time text
        timeDisplay.textContent = `${minutes}:${seconds}`
        if(currentTime >= fakeDuration) {
            song.pause()
            song.currentTime = 0
            play.src = "./svg/play.svg"
            video.pause()
        }
    }
}

app()
