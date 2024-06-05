const passwordDisplay = document.getElementById('password');
const lengthInput = document.getElementById('length');
const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';

function generatePassword(length) {
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function updatePasswordDisplay() {
    const length = parseInt(lengthInput.value);
    const newPassword = generatePassword(length);
    passwordDisplay.textContent = newPassword;
}

function copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = passwordDisplay.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Password copied to clipboard');
}

generateButton.addEventListener('click', updatePasswordDisplay);
copyButton.addEventListener('click', copyToClipboard);
