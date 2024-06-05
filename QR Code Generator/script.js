const inputText = document.getElementById('input-text');
const generateButton = document.getElementById('generate-button');
const qrCodeContainer = document.getElementById('qr-code');

generateButton.addEventListener('click', () => {
    const text = inputText.value.trim();
    if (text === '') {
        alert('Please enter some text');
        return;
    }
    generateQRCode(text);
});

function generateQRCode(text) {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
    qrCodeContainer.innerHTML = `<img src="${apiUrl}" alt="QR Code">`;
}
