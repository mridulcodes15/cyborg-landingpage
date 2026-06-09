// 1. Synthesizer for Cyber Sound Effects (No external audio files needed!)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High beep
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime); // Low buzz
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
    }
}

// 2. Auto-Typing Script
const textToType = "UPGRADE YOUR BIOLOGY.";
const typingTarget = document.getElementById("typing-text");
let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        typingTarget.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

window.onload = () => {
    typeWriter();
};

// 3. Immersive Interface Controls
const syncButton = document.getElementById("sync-btn");
const errorModal = document.getElementById("error-modal");
const closeModal = document.getElementById("close-modal");

syncButton.addEventListener("click", () => {
    playSound('click');
    syncButton.innerText = "SYNCING...";
    syncButton.style.borderColor = "#ff0055";
    syncButton.style.color = "#ff0055";
    syncButton.style.boxShadow = "0 0 25px #ff0055";
    
    setTimeout(() => {
        playSound('error');
        errorModal.classList.add("active");
    }, 1200);
});

closeModal.addEventListener("click", () => {
    playSound('click');
    errorModal.classList.remove("active");
    
    // Reset Main Button state
    syncButton.innerText = "INITIALIZE SYNC";
    syncButton.style.borderColor = "#00f2fe";
    syncButton.style.color = "#00f2fe";
    syncButton.style.boxShadow = "0 0 10px rgba(0, 242, 254, 0.2)";
});