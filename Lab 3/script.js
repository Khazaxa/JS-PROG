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
});
