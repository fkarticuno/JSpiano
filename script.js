const WHITE_KEYS = ['z','x','c','v','b','n','m']
const BLACK_KEYS = ['s','d','f','g','h']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')
const vols = document.querySelectorAll('.snd')
const drums = document.getElementsByClassName('drums')[0]
drums.loop = true;

keys.forEach(key => {
    key.addEventListener('click', ()=> playNote(key))
    key.innerText = key.attributes[0].value   
})
document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key;
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);
    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})
function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0;
    noteAudio.play();
    key.classList.add('active')
    noteAudio.addEventListener('ended', ()=> {
        key.classList.remove('active')
    })
}
function changeVolume() {
    var slider = document.getElementById('volSlider').value
    drums.volume = slider / 100
    vols.forEach(vol => {
        vol.volume = slider / 100
        var volControl = document.getElementById('volume')
        volControl.innerText = 'Vol: '+ Math.round(slider)
        console.log('Volume Change',vol.volume)
    })
}
document.addEventListener('keydown', e => {
    var slider = document.getElementById('volSlider').value
    console.log(e.which, slider)
    if ( (e.which === 37 || e.which === 40) && slider > 0) {
        slider -- 
        drums.volume = slider / 100 
        vols.forEach(vol => {
            vol.volume = slider / 100
            var volControl = document.getElementById('volume')
            document.getElementById('volSlider').value = Math.round(slider)
            volControl.innerText = 'Vol: '+ Math.round(slider)
            console.log('Volume Change',vol.volume)
        })
    } 
    if ( (e.which === 39 || e.which === 38) && slider/100 <1.00  ) {
        console.log('something')
        slider ++
        drums.volume = slider / 100
        vols.forEach(vol => {
            vol.volume = slider / 100
            var volControl = document.getElementById('volume')
            document.getElementById('volSlider').value = Math.round(slider)
            volControl.innerText = 'Vol: '+ Math.round(slider)
            console.log('Volume Change',vol.volume)
        })
    }
})
function toggleDrums() {
    var curTime = document.getElementsByClassName('drums')[0].currentTime
    var drumBg = document.getElementsByClassName('drumImg')[0]
    if (curTime > 0) {
        drums.pause()
        drums.currentTime = 0
        drumBg.classList.remove('bgOn')
    } else {
        drums.play()
        drumBg.classList.add('bgOn')
    }
}
// https://www.html5rocks.com/en/mobile/touch/
document.addEventListener('touchmove', function(event) {
    for (var i = 0; i < event.touches.length; i++) {
      var touch = event.touches[i];
      ctx.beginPath();
      ctx.arc(touch.pageX, touch.pageY, 20, 0, 2*Math.PI, true);
      ctx.fill();
      ctx.stroke();
    }
  }, false);