var speech = false;
var recognition = null;

document.getElementById('click_to_record').addEventListener('click', function() {
    speech = true;
    startRecognition();
});

document.getElementById('stop_recording').addEventListener('click', function() {
    speech = false;
    recognition.stop();
});

function startRecognition() {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'az-AZ';

    let transcript = '';

    recognition.addEventListener('result', e => {
        transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        document.getElementById("convert_text").value = transcript;
        console.log(transcript);
    });
    
    recognition.addEventListener('end', function() {
        if (speech == true) {
            document.getElementById("convert_text").value += ' ';
            startRecognition();
        }
    });
    
    recognition.start();
}















// click_to_record.addEventListener('click',function(){
//     var speech = true;
//     window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    
//     const recognition = new SpeechRecognition();
//     recognition.interimResults = true;
//     recognition.lang = 'az-AZ';

//     recognition.addEventListener('result', e => {
//         const transcript = Array.from(e.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('')

//         document.getElementById("convert_text").value += transcript;
//         console.log(transcript);
//     });
    
//     if (speech == true) {
//         recognition.start();
//     }
// })
