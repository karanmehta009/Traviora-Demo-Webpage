// TRAVIORA Tours & Travel - Tour Listings Controller

document.addEventListener("DOMContentLoaded", () => {
  // Render shared navigation & footer
  window.renderHeader('tours');
  window.renderFooter();

  // Load and apply filters based on URL search query first
  initTourFilters();
});

function initTourFilters() {
  const destInput = document.getElementById("filter-dest");
  const budgetInput = document.getElementById("filter-budget");
  const budgetVal = document.getElementById("budget-val");
  const durationSelect = document.getElementById("filter-duration");
  const categorySelect = document.getElementById("filter-category");
  const ratingSelect = document.getElementById("filter-rating");
  const sortSelect = document.getElementById("sort-by");
  
  if (!destInput) return; // Guard for details pages

  // Set initial budget display text
  budgetInput.addEventListener("input", (e) => {
    budgetVal.textContent = `₹${parseInt(e.target.value).toLocaleString('en-IN')}`;
    applyFilters();
  });

  // Read URL search params
  const params = new URLSearchParams(window.location.search);
  const urlDest = params.get("dest");
  const urlCat = params.get("category");
  const urlOffer = params.get("offer");

  if (urlDest) {
    destInput.value = urlDest;
  }
  if (urlCat) {
    categorySelect.value = urlCat;
  }
  if (urlOffer) {
    // Show cheap tours under 45,000
    budgetInput.value = 45000;
    budgetVal.textContent = `₹45,000`;
  }

  // Bind change listeners to all filter inputs
  [destInput, durationSelect, categorySelect, ratingSelect, sortSelect].forEach(element => {
    element.addEventListener("change", applyFilters);
    element.addEventListener("keyup", applyFilters);
  });

  // Run initial filter rendering
  applyFilters();
}

function applyFilters() {
  const destVal = document.getElementById("filter-dest").value.toLowerCase().trim();
  const budgetVal = parseInt(document.getElementById("filter-budget").value);
  const durationVal = document.getElementById("filter-duration").value;
  const categoryVal = document.getElementById("filter-category").value;
  const ratingVal = parseFloat(document.getElementById("filter-rating").value || "0");
  const sortVal = document.getElementById("sort-by").value;

  const tours = window.TravioraDb.getTours();
  
  // Apply filtering criteria
  let filtered = tours.filter(t => {
    // 1. Destination / Title Text search
    const matchesDest = !destVal || 
                        t.destination.toLowerCase().includes(destVal) || 
                        t.name.toLowerCase().includes(destVal);
                        
    // 2. Budget price cap
    const matchesBudget = t.price <= budgetVal;
    
    // 3. Duration ranges
    let matchesDuration = true;
    const daysCount = parseInt(t.duration.split(" ")[0]); // extract days (e.g. 5 Days -> 5)
    
    if (durationVal === "short") {
      matchesDuration = daysCount <= 4;
    } else if (durationVal === "medium") {
      matchesDuration = daysCount > 4 && daysCount <= 6;
    } else if (durationVal === "long") {
      matchesDuration = daysCount > 6;
    }

    // 4. Category tags
    let matchesCategory = true;
    if (categoryVal) {
      // Find matching destination type in default dest database, or match direct tags
      const destDb = window.TravioraDb.getDestinations().find(d => d.name.toLowerCase() === t.destination.toLowerCase());
      const destType = destDb ? destDb.type : "";
      
      // Also match tour name or characteristics
      matchesCategory = (destType.toLowerCase() === categoryVal.toLowerCase()) || 
                        (t.tourType && t.tourType.toLowerCase().includes(categoryVal.toLowerCase())) ||
                        (t.name.toLowerCase().includes(categoryVal.toLowerCase()));
    }

    // 5. Rating threshold
    const matchesRating = t.rating >= ratingVal;

    return matchesDest && matchesBudget && matchesDuration && matchesCategory && matchesRating;
  });

  // Apply Sorting
  if (sortVal === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortVal === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // Recommended - keep original/trending layout order
    filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
  }

  // Draw updated cards
  renderToursGrid(filtered);
}

function renderToursGrid(list) {
  const container = document.getElementById("tours-listings-grid");
  const countEl = document.getElementById("results-count");
  if (!container) return;

  // Update total count indicator
  countEl.textContent = `${list.length} package${list.length === 1 ? '' : 's'} available`;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:60px 20px; background:var(--pure-white); border-radius:var(--radius-lg); border:1px solid var(--border-color)">
        <i class="fa-regular fa-folder-open" style="font-size:3rem;color:var(--text-muted);margin-bottom:15px"></i>
        <h3 style="margin-bottom:8px">No Packages Found</h3>
        <p>Try broadening your filter criteria or search query to explore more trips.</p>
        <button class="btn btn-primary btn-sm" style="margin-top:20px" onclick="resetAllFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(t => `
    <div class="tour-card">
      <div class="card-img-wrapper">
        <button class="wishlist-btn" data-id="${t.id}" title="Add to Wishlist"><i class="fa-regular fa-heart"></i></button>
        ${t.trending ? '<span class="card-badge">Trending</span>' : ''}
        <img src="${t.image}" class="card-img" alt="${t.name}">
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span><i class="fa-solid fa-location-dot"></i> ${t.destination}</span>
          <span><i class="fa-regular fa-clock"></i> ${t.duration}</span>
        </div>
        <h3 class="card-title">${t.name}</h3>
        <div class="card-rating">
          <div class="rating-stars">
            ${Array.from({length: Math.floor(t.rating)}).map(() => '<i class="fas fa-star"></i>').join('')}
            ${t.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
          </div>
          <span>${t.rating} (${t.reviewsCount} reviews)</span>
        </div>
        <div class="card-inclusions">
          ${t.inclusions.map(inc => `
            <span class="inclusion-item"><i class="fa-solid fa-circle-check"></i> ${inc}</span>
          `).join('')}
        </div>
        <div class="card-footer">
          <div class="card-price">From <span>₹${t.price.toLocaleString('en-IN')}</span></div>
          <a href="tour-details.html?id=${t.id}" class="btn btn-secondary btn-sm">View Trip</a>
        </div>
      </div>
    </div>
  `).join('');

  // Re-bind wishlists heart clicks
  window.initCardWishlists();
}

window.resetAllFilters = function() {
  document.getElementById("filter-dest").value = "";
  document.getElementById("filter-duration").value = "";
  document.getElementById("filter-category").value = "";
  document.getElementById("filter-rating").value = "";
  document.getElementById("sort-by").value = "recommended";
  
  const budgetSlider = document.getElementById("filter-budget");
  budgetSlider.value = 150000;
  document.getElementById("budget-val").textContent = `₹1,50,000`;
  
  applyFilters();
};
