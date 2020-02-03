var body, num, array, width, context, logo, myElements, analyser, src, height;

body = document.querySelector('body');

num = 32;

array = new Uint8Array(num * 2);

width = 10;
window.onclick = function() {
    if (context) return;

    context = new AudioContext();
    analyser = context.createAnalyser();
    context.resume().then(() => {
        console.log('Playback resumed successfully');
    });
    navigator.mediaDevices
        .getUserMedia({
            audio: true
        })
        .then(stream => {
            src = context.createMediaStreamSource(stream);
            src.connect(analyser);
            loop();
        })
        .catch(error => {
            alert(error + '\r\n Отклонено. Страница будет обновлена!');
            location.reload();
        });
};

function loop() {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(array);
    for (var i = 0; i < num; i++) {
        height = array[i + num];
        if (height > 210) {
            console.log('OFF!');
            console.log(`Volume: ${height}`);

            body.querySelector('.flame').style.display = 'none';
            setTimeout(() => {
                body.querySelector('.flame').style.display = '';
                console.log('FIRE!');
            }, 5000);
        }
    }
}

alert('Click candle once to start!');
