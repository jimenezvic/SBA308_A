const API_URL = `https://api.artic.edu/api/v1/artworks?q=artist_id`;

function constructIIIFImageUrl(imageId) {
    const baseUrl = 'https://www.artic.edu/iiif/2/';
    const region = 'full';
    const size = 'full';
    const rotation = '0';
    const quality = 'default';
    const format = 'jpg';
    console.log("image ID", imageId);
    return `${baseUrl}${imageId}/${region}/${size}/${rotation}/${quality}.${format}`;
}


let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }

    slides[slideIndex].style.display = 'flex';
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}


function getEuropeanaImages() {
    fetch(API_URL)
        .then(res => {
            if (!res.ok) {
                throw new Error('There was a problem with your fetch operation: ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            const artworks = data.data;
            const slideContainer = document.querySelector('.slides');
            const slider = document.querySelector('.slider');

            const btn1 = document.createElement('button');
            const btn2 = document.createElement('button');

            btn1.classList.add('prev');
            btn2.classList.add('next');

            btn1.innerHTML = '&#10094';
            btn2.innerHTML = '&#10095';

            btn1.onclick = prevSlide;
            btn2.onclick = nextSlide;

            artworks.forEach(artwork => {
                const { title, image_id, description } = artwork;

                if (image_id) {
                    const imageUrl = constructIIIFImageUrl(image_id);

                    
                    const slide = document.createElement('div');
                    slide.classList.add('slide');

                    
                    const imgElement = document.createElement('img');
                    imgElement.classList.add('displaySlide');
                    imgElement.src = imageUrl;
                    imgElement.alt = title;
                    imgElement.style.width = '80vh'
                    imgElement.style.height = 'auto'

                    
                    slide.appendChild(imgElement);
                    slideContainer.appendChild(slide);

                    console.log(description);
                }
            });

           
            slider.appendChild(btn1);
            slider.appendChild(btn2);

            showSlide(slideIndex); 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

getEuropeanaImages();
