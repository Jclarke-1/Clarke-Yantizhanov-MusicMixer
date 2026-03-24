console.log("JS file connected");

//Variables
const seals = document.querySelectorAll(".seal");
const targetZones = document.querySelectorAll(".target-zone");
let currentDragged = null;
const resetBttn = document.querySelector(".reset-btn");
const sealBox = document.querySelector(".sealboxes");
const playBttn = document.querySelector("#playButton");
const pauseBttn = document.querySelector("#pauseButton");
const audioSrc = document.querySelectorAll("audio");

myaudios = [
{species: 'baikal', src: 'audio/baikal-seal'.wav}, 
{species: 'elephant', src: 'audio/elephant-seal'.wav},
{species: 'gray', src: 'audio/gray-seal'.wav},
{species: 'harbor', src: 'audio/harbor-seal'.wav}, 
{species: 'ribbon', src: 'audio/ribbon_seal'.wav},
{species: 'lion', src: 'audio/sea-lion'.wav}
];

finalElements = ''
myaudios.forEach(audio => {
  finalElements += `<audio data-species=${audio.species} src=${audio.src}></audio>`
})




//Functions

function dragStart() {
    console.log("Drag Start");
    currentDragged = this;
}

function dragOver(e) {
    e.preventDefault();
    console.log("Called Drag");
}

function dropped(e) {
    e.preventDefault();
    console.log("dropped");
    if(this.children.length>=1) {
        return;
    }
    this.append(currentDragged);
    currentDragged = null;
}

function loadAudio() {
    let currentSrc = `audio/${this.dataset.species}.wav`;
    audioSrc.src = currentSrc;
    audioSrc.load();
    playAudio();
}

function playAudio() {
    audioSrc.forEach(wav => {
     wav.currentTime = 0; 
    wav.play();
    })

}

function pauseAudio() {
    audioSrc.forEach(audioStart => {
        audioStart.pause()
    })
}


function resetPlace() {
    targetZones.forEach(zone => {
    if(zone.firstElementChild) {
        sealBox.appendChild(zone.firstElementChild);
    }
    audioSrc.currentTime = 0;
    audioSrc.pause();
    });
}
//Eventlisteners


seals.forEach(seal => {
    seal.addEventListener("dragstart", dragStart);
});

targetZones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", dropped);
});

resetBttn.addEventListener("click", resetPlace);

playBttn.addEventListener("click", playAudio);

pauseBttn.addEventListener("click", pauseAudio);
