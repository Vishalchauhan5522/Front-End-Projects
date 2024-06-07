const correctPassword = "12345"; // Change this to your desired password
const loginContainer = document.getElementById('login-container');
const galleryContainer = document.getElementById('gallery-container');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const fileInput = document.getElementById('file-input');
const addButton = document.getElementById('add-button');
const gallery = document.getElementById('gallery');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentIndex = 0;

loginButton.addEventListener('click', () => {
    if (passwordInput.value === correctPassword) {
        loginContainer.classList.remove('active');
        galleryContainer.classList.add('active');
        loadGallery();
    } else {
        alert('Incorrect password. Please try again.');
    }
});

addButton.addEventListener('click', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const galleryItem = createGalleryItem(e.target.result, file.type);
                gallery.appendChild(galleryItem);
                saveToLocalStorage(e.target.result, file.type);
            };
            reader.readAsDataURL(file);
        });
    } else {
        alert('Please select files to add.');
    }
});

function createGalleryItem(dataUrl, fileType) {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        galleryItem.remove();
        removeFromLocalStorage(dataUrl);
    });

    if (fileType.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = dataUrl;
        galleryItem.appendChild(img);
    } else if (fileType.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = dataUrl;
        video.controls = true;
        galleryItem.appendChild(video);
    }

    galleryItem.appendChild(deleteButton);
    return galleryItem;
}

function saveToLocalStorage(dataUrl, fileType) {
    let galleryItems = JSON.parse(localStorage.getItem('galleryItems')) || [];
    galleryItems.push({ dataUrl, fileType });
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
}

function removeFromLocalStorage(dataUrl) {
    let galleryItems = JSON.parse(localStorage.getItem('galleryItems')) || [];
    galleryItems = galleryItems.filter(item => item.dataUrl !== dataUrl);
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
}

function loadGallery() {
    const galleryItems = JSON.parse(localStorage.getItem('galleryItems')) || [];
    galleryItems.forEach(item => {
        const galleryItem = createGalleryItem(item.dataUrl, item.fileType);
        gallery.appendChild(galleryItem);
    });
    showGalleryItem(currentIndex);
}

function showGalleryItem(index) {
    const items = document.querySelectorAll('.gallery-item');
    if (items.length > 0) {
        items.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }
}

prevButton.addEventListener('click', () => {
    const items = document.querySelectorAll('.gallery-item');
    if (items.length > 0) {
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        showGalleryItem(currentIndex);
    }
});

nextButton.addEventListener('click', () => {
    const items = document.querySelectorAll('.gallery-item');
    if (items.length > 0) {
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        showGalleryItem(currentIndex);
    }
});
