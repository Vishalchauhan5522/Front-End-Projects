document.getElementById('speak-button').addEventListener('click', () => {
    const textInput = document.getElementById('text-input').value;
    if (textInput) {
        const speech = new SpeechSynthesisUtterance(textInput);
        window.speechSynthesis.speak(speech);
    } else {
        alert('Please enter some text to speak.');
    }
});
