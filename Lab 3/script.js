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
    let metronomeInterval;
    const metronomeSound = document.querySelector('#boom');
    let selectedChannels = [0];

    function updateSelectedChannels() {
        selectedChannels = [];
        const checkboxes = document.querySelectorAll('.channel-checkboxes input[type="checkbox"]:checked');
        checkboxes.forEach((checkbox) => {
            selectedChannels.push(parseInt(checkbox.getAttribute('data-channel-index')));
        });
    }

    document.addEventListener('keydown', event => {
        if (!recording) return;

        const sound = sounds[event.key];
        if (sound) {
            const now = Date.now();
            const timeOffset = now - recordStartTime;

            sound.currentTime = 0;
            sound.play();

            selectedChannels.forEach(channelIndex => {
                if (recording) {
                    channels[channelIndex] = channels[channelIndex].filter(note => note.time < recordStartTime);
                    channels[channelIndex].push({ key: event.key, time: timeOffset });
                }
            });
        }
    });

    document.querySelector('#startRecord').addEventListener('click', () => {
        updateSelectedChannels();
        recording = true;
        recordStartTime = Date.now();
    });

    document.querySelector('#stopRecord').addEventListener('click', () => {
        recording = false;
    });

    document.querySelector('#playRecord').addEventListener('click', () => {
        updateSelectedChannels();
    
        selectedChannels.forEach(channelIndex => {
            const channelStartTime = channels[channelIndex][0] ? channels[channelIndex][0].time : 0;
            channels[channelIndex].forEach(soundObj => {
                const delay = soundObj.time - channelStartTime;
    
                setTimeout(() => {
                    const sound = sounds[soundObj.key];
                    sound.currentTime = 0;
                    sound.play();
                }, delay);
            });
        });
    });
    

    document.querySelector('#addChannel').addEventListener('click', () => {
        channels.push([]);
        updateChannelCheckboxes();
    });

    document.querySelector('#removeChannel').addEventListener('click', () => {
        if (channels.length > 1) {
            channels.pop();
            updateChannelCheckboxes();
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

    document.querySelector('#stopMetronome').addEventListener('click', stopMetronome);

    function updateChannelCheckboxes() {
        const container = document.querySelector('.channel-checkboxes');
        container.innerHTML = '';
        channels.forEach((_, index) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'channel' + index;
            checkbox.setAttribute('data-channel-index', index);
            checkbox.checked = selectedChannels.includes(index);
            const label = document.createElement('label');
            label.htmlFor = 'channel' + index;
            label.textContent = ' Channel ' + (index + 1);

            container.appendChild(checkbox);
            container.appendChild(label);
            container.appendChild(document.createElement('br'));
        });
    }

    updateChannelCheckboxes();
});
