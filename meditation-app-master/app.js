const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')

    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    // console.log(outlineLength);

    //Duration
    let fakeDuration = 30;

    outline.style.strokeDasharray = outlineLength;
    // below adds white space to the circle so it looks like it's counting down with the timer eg: 200 or 500;
    outline.style.strokeDashoffset = outlineLength;



    // play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    })

    // pick different sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound') 
            video.src = this.getAttribute('data-video')
            checkPlaying(song);
        });
    });

    // select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60
            )}`
        });
    });

    
    const checkPlaying = song => {
        // Create a function specific to stop and play the sounds
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        }
    
    };
    // animate circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // animate the circle

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
    
};

app();