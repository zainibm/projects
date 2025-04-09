let playing = false;

function playSound(donut) {
    var track;
    switch(donut) {
        case 1:
            track = document.getElementById("firstAudio");
            isPlaying(track);
            break;
        case 2:
            track = document.getElementById("secondAudio");
            isPlaying(track);
            break;
        case 3:
            track = document.getElementById("thirdAudio");
            isPlaying(track);
            break;
        case 4:
            track = document.getElementById("fourthAudio");
            isPlaying(track);
            break;
        case 5:
            track = document.getElementById("fifthAudio");
            isPlaying(track);
            break;
    }
}

function isPlaying(track) {
    if (playing) {
        track.pause();
        track.currentTime = 0;
    }
    else track.play();
    playing = !playing;
}
