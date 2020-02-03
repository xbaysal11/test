/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* global AudioContext, SoundMeter */

window.onload = function() {
try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new AudioContext();
} catch (e) {
    alert('Web Audio API not supported.');
}

// Put variables in global scope to make them available to the browser console.
const constraints = (window.constraints = {
  audio: true,
  video: false
});

// function getMobileOperatingSystem() {
    // var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    //   alert('IOS');

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
                    // instantMeter.value = instantValueDisplay.innerText = soundMeter.instant.toFixed(
                    //     2
                    // );

                    // slowMeter.value = slowValueDisplay.innerText = soundMeter.slow.toFixed(
                    //     2
                    // );
                    // clipMeter.value = clipValueDisplay.innerText = soundMeter.clip;
                    console.log(soundMeter.instant.toFixed(2));
                if (soundMeter.instant.toFixed(2) >= 0.15) {
                    // alert('FIRE OFF!!!!')
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

            
    // } else {
    //     var body,
    //         num,
    //         array,
    //         width,
    //         context,
    //         analyser,
    //         src,
    //         height;

    //     body = document.querySelector('body');
    //     num = 32;
    //     array = new Uint8Array(num * 2);
    //     width = 10;
    //     window.onclick = function() {
    //         if (context) return;
    //         context = new AudioContext();
    //         analyser = context.createAnalyser();
    //         context.resume().then(() => {
    //             console.log('Playback resumed successfully');
    //         });
    //         navigator.mediaDevices
    //             .getUserMedia({
    //                 audio: true
    //             })
    //             .then(stream => {
    //                 src = context.createMediaStreamSource(stream);
    //                 src.connect(analyser);
    //                 loop();
    //             })
    //             .catch(error => {
    //                 alert(error + '\r\n Отклонено. Страница будет обновлена!');
    //                 location.reload();
    //             });
    //     };

    //     function loop() {
    //         window.requestAnimationFrame(loop);
    //         analyser.getByteFrequencyData(array);
    //         for (var i = 0; i < num; i++) {
    //             height = array[i + num];
    //             if (height > 210) {
    //                 console.log('OFF!');
    //                 console.log(`Volume: ${height}`);

    //                 body.querySelector('.flame').style.display = 'none';
    //                 setTimeout(() => {
    //                     body.querySelector('.flame').style.display = '';
    //                     console.log('FIRE!');
    //                 }, 5000);
    //             }
    //         }
    //     }
    //     alert('Click candle once to start!');
    // }
// }
// getMobileOperatingSystem();
}
