
click_to_record.addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'az-AZ';

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        document.getElementById("convert_text").value = transcript;
        console.log(transcript);

    }); 
    
    if (speech == true) {
        recognition.start();
    }
})







// click_to_record.addEventListener('click',function(){
//     var speech = true;
//     window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    
//     const recognition = new SpeechRecognition();
//     recognition.interimResults = true;
//     recognition.lang = 'en-US';

//     recognition.addEventListener('result', e => {
//         const transcript = Array.from(e.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('')

//         document.getElementById("convert_text").value = transcript;
//         console.log(transcript);

//     }); 
    
//     if (speech == true) {
//         recognition.start();
//     }
// })
