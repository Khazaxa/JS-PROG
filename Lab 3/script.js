document.addEventListener('DOMContentLoaded', () => {
    const sounds = {
        'a': document.querySelector('#clap'),
        's': document.querySelector('#kick'),
        'd': document.querySelector('#hihat'),
        'f': document.querySelector('#tom'),
    };

    let channels = [[], [], [], []];
    let recording = false;
    let recordStartTime;
    let activeChannel = 0;
    let metronomeInterval;
    const metronomeSound = document.querySelector('#boom');
    const channelSelect = document.querySelector('#channelSelect');

    document.addEventListener('keydown', event => {
        if (!recording) return;

        const sound = sounds[event.key];
        if (sound) {
            const now = Date.now();
            const timeOffset = now - recordStartTime;
            
            sound.currentTime = 0;
            sound.play();
            
            channels[activeChannel].push({ key: event.key, time: timeOffset });
        }
    });

    document.querySelector('#startRecord').addEventListener('click', () => {
        recording = true;
        recordStartTime = Date.now();
    });

    document.querySelector('#stopRecord').addEventListener('click', () => {
        recording = false;
    });

    document.querySelector('#playSingleChannel').addEventListener('click', () => {
        channels[activeChannel].forEach(soundObj => {
            setTimeout(() => {
                const sound = sounds[soundObj.key];
                sound.currentTime = 0;
                sound.play();
            }, soundObj.time);
        });
    });

    document.querySelector('#playRecord').addEventListener('click', () => {
        channels.forEach(channel => {
            channel.forEach(note => {
                setTimeout(() => {
                    const sound = sounds[note.key];
                    sound.currentTime = 0;
                    sound.play();
                }, note.time);
            });
        });
    });

    document.querySelector('#channelSelect').addEventListener('change', (event) => {
        activeChannel = parseInt(event.target.value, 10);
    });

    function updateChannelList() {
        channelSelect.innerHTML = '';
        channels.forEach((channel, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = `Channel ${index + 1}`;
            channelSelect.appendChild(option);
        });
    }

    document.querySelector('#addChannel').addEventListener('click', () => {
        channels.push([]);
        updateChannelList();
    });

    document.querySelector('#removeChannel').addEventListener('click', () => {
        if (channels.length > 1) {
            channels.pop();
            updateChannelList();
        }
    });
    
    function startMetronome(bpm) {
        const beatInterval = 60000 / bpm;

        if (metronomeInterval) clearInterval(metronomeInterval);
        metronomeInterval = setInterval(() => {
            metronomeSound.currentTime = 0;
            metronomeSound.play();
        }, beatInterval);
    }
    
    function stopMetronome() {
        if (metronomeInterval) clearInterval(metronomeInterval);
    }
    
    document.querySelector('#startMetronome').addEventListener('click', () => {
        const bpm = document.querySelector('#metronomeBPM').value;
        startMetronome(bpm);
    });
    
    document.querySelector('#metronomeBPM').addEventListener('input', (event) => {
        const bpm = event.target.value;
        startMetronome(bpm);
    });

    document.querySelector('#stopMetronome').addEventListener('click', stopMetronome);
});