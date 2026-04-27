const products = [
    {
      name: "Italian Denim Mini Skirt",
      price: "$25.00",
      image: "images/skirt.jpg"
    },
    {
      name: "Lavender Wrap Dress",
      price: "$32.00",
      image: "images/dress.jpg"
    },
    {
      name: "Bold Yellow Jacket",
      price: "$45.00",
      image: "images/yellow-jacket.jpg"
    },
    {
      name: "Checkered Crop Top",
      price: "$28.00",
      image: "images/checkered-top.jpg"
    },
    {
      name: "Blue Patterned Blouse",
      price: "$30.00",
      image: "images/blue-blouse.jpg"
    },
    {
      name: "Classic White Dress",
      price: "$35.00",
      image: "images/white-dress.jpg"
    },
    {
      name: "Purple Long Sleeve",
      price: "$29.00",
      image: "images/purple-top.jpg"
    },
  ];
  
  const grid = document.getElementById('productGrid');
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
    grid.appendChild(card);
  });


  document.querySelectorAll('.insider-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
  
      // Toggle active class
      document.querySelectorAll('.insider-nav a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.querySelector('.insider-nav a[href="#all-topics"]').classList.add('active');

  function showInsiderSection(sectionId, clickedLink) {
    // Show the selected section
    const sections = document.querySelectorAll('.insider-section');
    sections.forEach(sec => {
      sec.style.display = (sec.id === sectionId) ? 'block' : 'none';
    });
  
    // Update active tab underline
    const links = document.querySelectorAll('.insider-nav a');
    links.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
  
    // Smooth scroll to the section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reset carousel if buy section is shown
    if (sectionId === 'buy') {
      moveToSlide(0);
    }
  }


  let currentSlide = 0;

function moveToSlide(slideIndex) {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.dot');
  const slideWidth = document.querySelector('.carousel-slide').offsetWidth;

  track.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  currentSlide = slideIndex;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[slideIndex].classList.add('active');
}


const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const slideWidth = slides[0].offsetWidth;
    const scrollPosition = slideWidth * index;

    track.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });

    // Update active dot
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});


const shows = [
  { title: "Chanel SS25", season: "ss25", city: "paris", image: "chanel.jpg" },
  { title: "Prada FW25", season: "fw25", city: "milan", image: "prada.jpg" },
  { title: "Tom Ford SS25", season: "ss25", city: "newyork", image: "tomford.jpg" },
  { title: "Versace FW25", season: "fw25", city: "milan", image: "versace.jpg" },
  { title: "Dior SS25", season: "ss25", city: "paris", image: "dior.jpg" }
];
function renderFilteredShows() {
  const season = document.getElementById("season-filter").value;
  const city = document.getElementById("city-filter").value;
  const grid = document.getElementById("show-grid");

  const filtered = shows.filter(show => {
    const seasonMatch = season === "all" || show.season === season;
    const cityMatch = city === "all" || show.city === city;
    return seasonMatch && cityMatch;
  });

  grid.innerHTML = filtered.map(show => `
    <div class="show-card">
      <img src="images/${show.image}" alt="${show.title}" />
      <h4>${show.title}</h4>
      <p>${formatSeason(show.season)} · ${capitalize(show.city)}</p>
    </div>
  `).join("");
}

function formatSeason(code) {
  return code === "ss25" ? "Spring/Summer 2025" : "Fall/Winter 2025";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById("season-filter").addEventListener("change", renderFilteredShows);
document.getElementById("city-filter").addEventListener("change", renderFilteredShows);

// Initial render
renderFilteredShows();