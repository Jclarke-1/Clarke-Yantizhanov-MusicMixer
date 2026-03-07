console.log("JS file connected");

//Variables
const seals = document.querySelectorAll(".seal");
const targetZones = document.querySelectorAll(".target-zone");
let currentDragged = null;
const resetBttn = document.querySelector(".reset-btn");
const sealBox = document.querySelector(".sealboxes");


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


 function resetPlacement() {
    targetZones.forEach(sealZone => {
        let child = sealZone[0];
        if (child) {
            sealBox.appendChild(child);
        }
        console.log("Reset");
    })
 }

//Eventlisteners

seals.forEach(seal => {
    seal.addEventListener("drag start", dragStart);
});

targetZones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", dropped);
});

resetBttn.addEventListener("click", resetPlacement);
