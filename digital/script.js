const col1 = document.getElementById('col-1');
const col2 = document.getElementById('col-2');
const sentinel = document.getElementById('sentinel');

let mediaItems = [];
let currentIndex = 0;
const itemsPerLoad = 8; // Larger batch size to stay ahead of fast scrolling

async function init() {
  try {
    const response = await fetch('data.json');
    mediaItems = await response.json();
    
    renderItems(); // Render initial batch
    setupInfiniteScroll();
  } catch (error) {
    console.error("Error loading JSON data:", error);
    sentinel.innerText = "Failed to load data.";
  }
}

function renderItems() {
  const endIndex = Math.min(currentIndex + itemsPerLoad, mediaItems.length);

  for (let i = currentIndex; i < endIndex; i++) {
    const item = mediaItems[i];
    
    const card = document.createElement('div');
    card.className = 'masonry-item';

    // Build media tag
    let mediaHTML = '';
    if (item.type === 'video') {
      mediaHTML = `<video src="${item.url}" autoplay loop muted playsinline></video>`;
    } else {
      mediaHTML = `<img src="${item.url}" alt="Gallery Media">`;
    }

    // Build optional text container
    let textHTML = '';
    if (item.title || item.description) {
      textHTML += `<div class="masonry-content">`;
      if (item.title) textHTML += `<h3 class="masonry-title">${item.title}</h3>`;
      if (item.description) textHTML += `<p class="masonry-desc">${item.description}</p>`;
      textHTML += `</div>`;
    }

    card.innerHTML = mediaHTML + textHTML;

    // Strict alternating insertion prevents layout jumps
    if (i % 2 === 0) {
      col1.appendChild(card);
    } else {
      col2.appendChild(card);
    }
  }

  currentIndex = endIndex;

  if (currentIndex >= mediaItems.length) {
    sentinel.style.display = 'none';
  }
}

function setupInfiniteScroll() {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && currentIndex < mediaItems.length) {
      renderItems();
    }
  }, {
    // 1500px margin forces pre-fetching well before the user reaches the bottom
    rootMargin: "1500px 0px"
  });

  observer.observe(sentinel);
}

document.addEventListener('DOMContentLoaded', init);