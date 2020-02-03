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
