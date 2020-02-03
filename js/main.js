window.onload = function() {

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            const constraints = (window.constraints = {
                audio: true,
                video: false
            });
            function handleSuccess(stream) {
                window.stream = stream;
                const soundMeter = (window.soundMeter = new SoundMeter(
                    window.audioContext
                ));
                soundMeter.connectToSource(stream, function(e) {
                    if (e) {
                        alert(e);
                        return;
                    }
                    setInterval(() => {
                        console.log(soundMeter.instant.toFixed(2));
                        if (soundMeter.instant.toFixed(2) >= 0.15) {
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
                console.log(
                    'navigator.MediaDevices.getUserMedia error: ',
                    error.message,
                    error.name
                );
            }

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(handleSuccess)
                .catch(handleError);
        } else {
            var body, num, array, width, context, logo, myElements, analyser, src, height;

            body = document.querySelector('body');
            
            num = 32;
            
            array = new Uint8Array(num*2);
            
            width = 10;
            // if (window.AudioContext && _config2.default.context.state == "suspended") {
            // 	_config2.default.context.resume()
            // }
            window.onclick = function(){
                
                if(context) return;
            
                // body.querySelector('h1').remove();
            
                // for(var i = 0 ; i < num ; i++){
                //     logo = document.createElement('div');
                //     logo.className = 'logo';
                //     logo.style.background = 'red';
                //     logo.style.minWidth = width+'px';
                //     body.appendChild(logo);
                // }
            
                // myElements = document.getElementsByClassName('logo');
                context = new AudioContext();
                analyser = context.createAnalyser();
                context.resume().then(() => {
                    console.log('Playback resumed successfully');
                  });
                navigator.mediaDevices.getUserMedia({
                    audio: true
                }).then(stream => {
                    src = context.createMediaStreamSource(stream);
                    src.connect(analyser);
                    loop();
                }).catch(error => {
                    alert(error + '\r\n\ Отклонено. Страница будет обновлена!');
                    location.reload();
                });
            }
            
            function loop() {
                window.requestAnimationFrame(loop);
                analyser.getByteFrequencyData(array);
                for(var i = 0 ; i < num ; i++){
                    height = array[i+num];
                    // myElements[i].style.minHeight = height+'px';
                    // myElements[i].style.opacity = 0.008*height;
                    if(height > 210){
                        console.log("OFF!");
                        console.log(`Volume: ${height}`);
            
                        body.querySelector('.flame').style.display = 'none'
                        setTimeout(() => {
                            body.querySelector('.flame').style.display = ''
                            console.log("FIRE!");
                        }, 5000);
                        // flameOff();
                        // flameFire();
                        // body.querySelector('#id').innerHTML = height;
                    }
                }
            
            }
            function flameFire(){
                setTimeout(() => {
                    body.querySelector('.flame').style.display = ''
                    console.log("fire");
                }, 5000);
            }
            function flameOff(){
                body.querySelector('.flame').style.display = 'none'
                console.log("off");
            }
            
            alert("Click candle once to start!")
    }
    }
    getMobileOperatingSystem();
};
