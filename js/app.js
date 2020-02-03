function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
       
        console.log('ios');

        window.onload = function() {

            try {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                window.audioContext = new AudioContext();
              } catch (e) {
                alert('Web Audio API not supported.');
              }
              
              // Put variables in global scope to make them available to the browser console.
              const constraints = window.constraints = {
                audio: true,
                video: false
              };
              
              function handleSuccess(stream) {
                // Put variables in global scope to make them available to the
                // browser console.
                window.stream = stream;
                const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
                soundMeter.connectToSource(stream, function(e) {
                  if (e) {
                    alert(e);
                    return;
                  }
                  setInterval(() => {
                    console.log(soundMeter.instant.toFixed(2));
                    if (soundMeter.instant.toFixed(2) >= 0.1) {
                        alert(soundMeter.instant.toFixed(2));
                        var body = document.querySelector('body');
                        body.querySelector('.flame').style.display = 'none';
                        setTimeout(() => {
                            body.querySelector('.flame').style.display = '';
                            console.log('FIRE!');
                        }, 5000);
                    }
                  }, 200);
                });
              }
              
              function handleError(error) {
                console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
              }
              
              navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
            };
            
    } else {
        console.log('android');
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
        
    }
}
    getMobileOperatingSystem();
