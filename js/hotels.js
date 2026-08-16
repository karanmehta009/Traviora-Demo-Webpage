// TRAVIORA Tours & Travel - Hotels Listings Controller

document.addEventListener("DOMContentLoaded", () => {
  // Render shared navigation & footer
  window.renderHeader('hotels');
  window.renderFooter();

  // Initialize filters
  initHotelFilters();
});

function initHotelFilters() {
  const destInput = document.getElementById("filter-dest");
  const budgetInput = document.getElementById("filter-budget");
  const budgetVal = document.getElementById("budget-val");
  const ratingSelect = document.getElementById("filter-rating");
  const sortSelect = document.getElementById("sort-by");
  
  if (!destInput) return; // Guard for detail page

  // Handle price range display
  budgetInput.addEventListener("input", (e) => {
    budgetVal.textContent = `₹${parseInt(e.target.value).toLocaleString('en-IN')}`;
    applyFilters();
  });

  // Read URL search params
  const params = new URLSearchParams(window.location.search);
  const urlDest = params.get("dest");

  if (urlDest) {
    destInput.value = urlDest;
  }

  // Bind change listeners to all filter inputs
  [destInput, ratingSelect, sortSelect].forEach(element => {
    element.addEventListener("change", applyFilters);
    element.addEventListener("keyup", applyFilters);
  });

  // Bind change listeners to amenities checkboxes
  const amenitiesCheckboxes = document.querySelectorAll(".filter-amenity");
  amenitiesCheckboxes.forEach(cb => {
    cb.addEventListener("change", applyFilters);
  });

  // Run initial rendering
  applyFilters();
}

function applyFilters() {
  const destVal = document.getElementById("filter-dest").value.toLowerCase().trim();
  const budgetVal = parseInt(document.getElementById("filter-budget").value);
  const ratingVal = parseFloat(document.getElementById("filter-rating").value || "0");
  const sortVal = document.getElementById("sort-by").value;
  
  // Selected amenities array
  const checkedAmenities = Array.from(document.querySelectorAll(".filter-amenity:checked")).map(cb => cb.value);

  const hotels = window.TravioraDb.getHotels();
  
  // Apply filtering criteria
  let filtered = hotels.filter(h => {
    // 1. Destination / Hotel Name Text search
    const matchesDest = !destVal || 
                        h.location.toLowerCase().includes(destVal) || 
                        h.name.toLowerCase().includes(destVal) ||
                        h.destination.toLowerCase().includes(destVal);
                        
    // 2. Budget price cap (per night)
    const matchesBudget = h.price <= budgetVal;
    
    // 3. Rating threshold
    const matchesRating = h.rating >= ratingVal;

    // 4. Amenities Checklist Match
    let matchesAmenities = true;
    if (checkedAmenities.length > 0) {
      matchesAmenities = checkedAmenities.every(ame => h.amenities.includes(ame));
    }

    return matchesDest && matchesBudget && matchesRating && matchesAmenities;
  });

  // Apply Sorting
  if (sortVal === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortVal === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // Default sorting - recommended rating high
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Draw updated cards
  renderHotelsGrid(filtered);
}

function renderHotelsGrid(list) {
  const container = document.getElementById("hotels-listings-grid");
  const countEl = document.getElementById("results-count");
  if (!container) return;

  // Update total count indicator
  countEl.textContent = `${list.length} hotel${list.length === 1 ? '' : 's'} available`;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:60px 20px; background:var(--pure-white); border-radius:var(--radius-lg); border:1px solid var(--border-color)">
        <i class="fa-regular fa-folder-open" style="font-size:3rem;color:var(--text-muted);margin-bottom:15px"></i>
        <h3 style="margin-bottom:8px">No Stays Found</h3>
        <p>Try widening your search terms or unchecking amenities filters.</p>
        <button class="btn btn-primary btn-sm" style="margin-top:20px" onclick="resetHotelFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(h => `
    <div class="hotel-card">
      <div class="card-img-wrapper">
        <button class="wishlist-btn" data-id="${h.id}" title="Add to Wishlist"><i class="fa-regular fa-heart"></i></button>
        <img src="${h.image}" class="card-img" alt="${h.name}">
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span><i class="fa-solid fa-location-dot"></i> ${h.location}</span>
        </div>
        <h3 class="card-title">${h.name}</h3>
        <div class="card-rating">
          <div class="rating-stars">
            ${Array.from({length: Math.floor(h.rating)}).map(() => '<i class="fas fa-star"></i>').join('')}
            ${h.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
          </div>
          <span>${h.rating} (${h.reviewsCount} reviews)</span>
        </div>
        <div class="card-inclusions" style="font-size:0.75rem;">
          ${h.amenities.map(ame => `
            <span class="inclusion-item"><i class="fa-solid fa-bell-concierge"></i> ${ame}</span>
          `).join('')}
        </div>
        <div class="card-footer">
          <div class="card-price">Per Night <span>₹${h.price.toLocaleString('en-IN')}</span></div>
          <a href="hotel-details.html?id=${h.id}" class="btn btn-secondary btn-sm">View Hotel</a>
        </div>
      </div>
    </div>
  `).join('');

  // Re-bind wishlists heart clicks
  window.initCardWishlists();
}

window.resetHotelFilters = function() {
  document.getElementById("filter-dest").value = "";
  document.getElementById("filter-rating").value = "";
  document.getElementById("sort-by").value = "recommended";
  
  const budgetSlider = document.getElementById("filter-budget");
  budgetSlider.value = 40000;
  document.getElementById("budget-val").textContent = `₹40,000`;
  
  // Uncheck amenities checkboxes
  const checkboxes = document.querySelectorAll(".filter-amenity");
  checkboxes.forEach(cb => cb.checked = false);
  
  applyFilters();
};
