// Admin Panel Controller for Traviora Travel Platform
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialise dynamic header/footer
  window.renderHeader('admin');
  window.renderFooter();
  
  // 2. Render all admin tables
  refreshAdminDashboard();
});

// Refresh stats and all list tables
function refreshAdminDashboard() {
  renderAdminStats();
  renderBookingsTable();
  renderToursTable();
  renderHotelsTable();
}

// Compute and draw analytics cards
function renderAdminStats() {
  const bookings = window.TravioraDb.getBookings();
  const tours = window.TravioraDb.getTours();
  const hotels = window.TravioraDb.getHotels();
  
  // Bookings count
  document.getElementById("stat-bookings-count").textContent = bookings.length;
  
  // Revenue sum
  const revenue = bookings.reduce((sum, b) => b.status === "Confirmed" ? sum + b.amount : sum, 0);
  document.getElementById("stat-revenue-sum").textContent = `₹${revenue.toLocaleString('en-IN')}`;
  
  // Catalog sizes
  document.getElementById("stat-tours-count").textContent = tours.length;
  document.getElementById("stat-hotels-count").textContent = hotels.length;
}

// Draw bookings log table rows
function renderBookingsTable() {
  const rowsEl = document.getElementById("admin-bookings-rows");
  if (!rowsEl) return;
  
  const bookings = window.TravioraDb.getBookings();
  if (bookings.length === 0) {
    rowsEl.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:30px">No bookings catalogued in system.</td></tr>`;
    return;
  }
  
  rowsEl.innerHTML = bookings.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>
        <div><strong>${b.guestName}</strong></div>
        <div style="font-size:0.75rem;color:var(--text-muted)">${b.guestEmail}</div>
      </td>
      <td>${b.itemName} <span style="font-size:0.7rem;background:var(--light-gray);padding:2px 6px;border-radius:4px">${b.type}</span></td>
      <td>${b.date}</td>
      <td><strong>₹${b.amount.toLocaleString('en-IN')}</strong></td>
      <td>
        <span style="font-weight:700; color:${b.status === 'Confirmed' ? 'var(--success)' : 'var(--danger)'}">
          <i class="fa-solid ${b.status === 'Confirmed' ? 'fa-circle-check' : 'fa-circle-xmark'}" style="margin-right:4px"></i>${b.status}
        </span>
      </td>
      <td>
        <div class="action-btn-group">
          ${b.status === 'Confirmed' ? 
            `<button class="btn-table-action btn-delete-action" onclick="adminCancelBooking('${b.id}')" title="Cancel Booking"><i class="fa-solid fa-ban"></i> Cancel</button>` : 
            `<span style="font-size:0.75rem;color:var(--text-muted)">Cancelled</span>`
          }
          <button class="btn-table-action btn-delete-action" onclick="adminDeleteBooking('${b.id}')" title="Delete record"><i class="fa-regular fa-trash-can"></i> Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Cancel Booking wrapper
window.adminCancelBooking = function(bookingId) {
  if (confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
    window.TravioraDb.cancelBooking(bookingId);
    refreshAdminDashboard();
    window.showToast(`Booking ${bookingId} status updated to Cancelled.`, "info");
  }
};

// Delete Booking record completely
window.adminDeleteBooking = function(bookingId) {
  if (confirm(`Dangerous: Delete booking log ${bookingId} completely from database?`)) {
    // Read list, filter, save back
    let bookings = window.TravioraDb.getBookings();
    bookings = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem("traviora_bookings", JSON.stringify(bookings));
    refreshAdminDashboard();
    window.showToast("Transaction history record deleted.", "success");
  }
};

// Draw Tours catalogue rows
function renderToursTable() {
  const rowsEl = document.getElementById("admin-tours-rows");
  if (!rowsEl) return;
  
  const tours = window.TravioraDb.getTours();
  rowsEl.innerHTML = tours.map(t => `
    <tr>
      <td><img src="${t.image}" class="table-row-thumb" alt="Thumbnail"></td>
      <td><strong>${t.name}</strong></td>
      <td>${t.destination}</td>
      <td>${t.duration}</td>
      <td><strong>₹${t.price.toLocaleString('en-IN')}</strong></td>
      <td><i class="fa-solid fa-star" style="color:#FFB800"></i> ${t.rating}</td>
      <td>
        <div class="action-btn-group">
          <button class="btn-table-action btn-edit-action" onclick="openTourEditForm('${t.id}')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>
          <button class="btn-table-action btn-delete-action" onclick="adminDeleteTour('${t.id}')"><i class="fa-regular fa-trash-can"></i> Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Draw Hotels catalogue rows
function renderHotelsTable() {
  const rowsEl = document.getElementById("admin-hotels-rows");
  if (!rowsEl) return;
  
  const hotels = window.TravioraDb.getHotels();
  rowsEl.innerHTML = hotels.map(h => `
    <tr>
      <td><img src="${h.image}" class="table-row-thumb" alt="Thumbnail"></td>
      <td><strong>${h.name}</strong></td>
      <td>${h.location}</td>
      <td><i class="fa-solid fa-star" style="color:#FFB800"></i> ${h.rating}</td>
      <td><strong>₹${h.price.toLocaleString('en-IN')} / night</strong></td>
      <td style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${h.amenities.join(', ')}</td>
      <td>
        <div class="action-btn-group">
          <button class="btn-table-action btn-edit-action" onclick="openHotelEditForm('${h.id}')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>
          <button class="btn-table-action btn-delete-action" onclick="adminDeleteHotel('${h.id}')"><i class="fa-regular fa-trash-can"></i> Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Delete Tour
window.adminDeleteTour = function(tourId) {
  if (confirm("Are you sure you want to remove this tour package from listings?")) {
    let tours = window.TravioraDb.getTours();
    tours = tours.filter(t => t.id !== tourId);
    localStorage.setItem("traviora_tours", JSON.stringify(tours));
    refreshAdminDashboard();
    window.showToast("Tour package removed.", "info");
  }
};

// Delete Hotel
window.adminDeleteHotel = function(hotelId) {
  if (confirm("Are you sure you want to remove this stay from listings?")) {
    let hotels = window.TravioraDb.getHotels();
    hotels = hotels.filter(h => h.id !== hotelId);
    localStorage.setItem("traviora_hotels", JSON.stringify(hotels));
    refreshAdminDashboard();
    window.showToast("Stay hotel removed.", "info");
  }
};

// TOUR Form Open (Add & Edit)
window.openTourAddForm = function() {
  openTourModalForm(null);
};

window.openTourEditForm = function(tourId) {
  const tour = window.TravioraDb.getTours().find(t => t.id === tourId);
  if (tour) {
    openTourModalForm(tour);
  }
};

function openTourModalForm(tour = null) {
  const isEdit = tour !== null;
  const modalTitle = isEdit ? `Edit Tour: ${tour.name}` : "Add New Tour Package";
  
  const formHtml = `
    <form id="modal-tour-form" style="padding:10px 0;">
      <input type="hidden" id="tour-form-id" value="${isEdit ? tour.id : ''}">
      
      <div class="form-group">
        <label>Tour Name</label>
        <input type="text" class="form-control" id="tour-form-name" value="${isEdit ? tour.name : ''}" required>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Destination</label>
          <input type="text" class="form-control" id="tour-form-dest" value="${isEdit ? tour.destination : ''}" required>
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="form-control" id="tour-form-cat">
            <option value="Beach" ${isEdit && tour.category === 'Beach' ? 'selected' : ''}>Beach</option>
            <option value="Mountain" ${isEdit && tour.category === 'Mountain' ? 'selected' : ''}>Mountain</option>
            <option value="Romantic" ${isEdit && tour.category === 'Romantic' ? 'selected' : ''}>Romantic</option>
            <option value="Family" ${isEdit && tour.category === 'Family' ? 'selected' : ''}>Family</option>
            <option value="Backpacking" ${isEdit && tour.category === 'Backpacking' ? 'selected' : ''}>Backpacking</option>
            <option value="Luxury" ${isEdit && tour.category === 'Luxury' ? 'selected' : ''}>Luxury</option>
          </select>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Price (INR)</label>
          <input type="number" class="form-control" id="tour-form-price" value="${isEdit ? tour.price : 10000}" required>
        </div>
        <div class="form-group">
          <label>Duration (e.g. 5 Days / 4 Nights)</label>
          <input type="text" class="form-control" id="tour-form-duration" value="${isEdit ? tour.duration : '5 Days / 4 Nights'}" required>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Image URL</label>
          <input type="url" class="form-control" id="tour-form-img" value="${isEdit ? tour.image : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80'}" required>
        </div>
        <div class="form-group">
          <label>Rating (1.0 to 5.0)</label>
          <input type="number" class="form-control" id="tour-form-rating" step="0.1" min="1" max="5" value="${isEdit ? tour.rating : 4.8}" required>
        </div>
      </div>
      
      <div class="form-group">
        <label>Inclusions (Comma separated list)</label>
        <input type="text" class="form-control" id="tour-form-inc" value="${isEdit ? tour.inclusions.join(', ') : 'Hotels, Flights, Sightseeing, Transfers'}" required>
      </div>
      
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px">
        <button type="button" class="btn btn-outline" onclick="window.closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Create Package'}</button>
      </div>
    </form>
  `;
  
  window.showModal(modalTitle, formHtml);
  
  // Bind form submission inside modal
  const form = document.getElementById("modal-tour-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const idVal = document.getElementById("tour-form-id").value;
    const isEditing = idVal !== "";
    
    const tourObj = {
      id: isEditing ? idVal : "t-" + Math.floor(Math.random()*10000),
      name: document.getElementById("tour-form-name").value.trim(),
      destination: document.getElementById("tour-form-dest").value.trim(),
      category: document.getElementById("tour-form-cat").value,
      price: parseInt(document.getElementById("tour-form-price").value),
      duration: document.getElementById("tour-form-duration").value.trim(),
      image: document.getElementById("tour-form-img").value.trim(),
      rating: parseFloat(document.getElementById("tour-form-rating").value),
      reviewsCount: isEditing ? (window.TravioraDb.getTours().find(t => t.id === idVal).reviewsCount || 120) : 10,
      inclusions: document.getElementById("tour-form-inc").value.split(',').map(i => i.trim())
    };
    
    let tours = window.TravioraDb.getTours();
    if (isEditing) {
      tours = tours.map(t => t.id === idVal ? tourObj : t);
    } else {
      tours.push(tourObj);
    }
    
    localStorage.setItem("traviora_tours", JSON.stringify(tours));
    window.closeModal();
    refreshAdminDashboard();
    window.showToast(isEditing ? "Tour details updated!" : "New tour package created successfully!", "success");
  });
}

// HOTEL Form Open (Add & Edit)
window.openHotelAddForm = function() {
  openHotelModalForm(null);
};

window.openHotelEditForm = function(hotelId) {
  const hotel = window.TravioraDb.getHotels().find(h => h.id === hotelId);
  if (hotel) {
    openHotelModalForm(hotel);
  }
};

function openHotelModalForm(hotel = null) {
  const isEdit = hotel !== null;
  const modalTitle = isEdit ? `Edit Stay: ${hotel.name}` : "Add New Hotel Stay";
  
  const formHtml = `
    <form id="modal-hotel-form" style="padding:10px 0;">
      <input type="hidden" id="hotel-form-id" value="${isEdit ? hotel.id : ''}">
      
      <div class="form-group">
        <label>Hotel Name</label>
        <input type="text" class="form-control" id="hotel-form-name" value="${isEdit ? hotel.name : ''}" required>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Location / City</label>
          <input type="text" class="form-control" id="hotel-form-loc" value="${isEdit ? hotel.location : ''}" required>
        </div>
        <div class="form-group">
          <label>Price Per Night (INR)</label>
          <input type="number" class="form-control" id="hotel-form-price" value="${isEdit ? hotel.price : 6000}" required>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Image URL</label>
          <input type="url" class="form-control" id="hotel-form-img" value="${isEdit ? hotel.image : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80'}" required>
        </div>
        <div class="form-group">
          <label>Rating (1.0 to 5.0)</label>
          <input type="number" class="form-control" id="hotel-form-rating" step="0.1" min="1" max="5" value="${isEdit ? hotel.rating : 4.8}" required>
        </div>
      </div>
      
      <div class="form-group">
        <label>Amenities (Comma separated list)</label>
        <input type="text" class="form-control" id="hotel-form-ame" value="${isEdit ? hotel.amenities.join(', ') : 'Free WiFi, Infinity Pool, Spa, Ocean View'}" required>
      </div>
      
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px">
        <button type="button" class="btn btn-outline" onclick="window.closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Create Hotel'}</button>
      </div>
    </form>
  `;
  
  window.showModal(modalTitle, formHtml);
  
  // Bind form submission inside modal
  const form = document.getElementById("modal-hotel-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const idVal = document.getElementById("hotel-form-id").value;
    const isEditing = idVal !== "";
    
    const hotelObj = {
      id: isEditing ? idVal : "h-" + Math.floor(Math.random()*10000),
      name: document.getElementById("hotel-form-name").value.trim(),
      location: document.getElementById("hotel-form-loc").value.trim(),
      price: parseInt(document.getElementById("hotel-form-price").value),
      image: document.getElementById("hotel-form-img").value.trim(),
      rating: parseFloat(document.getElementById("hotel-form-rating").value),
      reviewsCount: isEditing ? (window.TravioraDb.getHotels().find(h => h.id === idVal).reviewsCount || 85) : 8,
      amenities: document.getElementById("hotel-form-ame").value.split(',').map(a => a.trim())
    };
    
    let hotels = window.TravioraDb.getHotels();
    if (isEditing) {
      hotels = hotels.map(h => h.id === idVal ? hotelObj : h);
    } else {
      hotels.push(hotelObj);
    }
    
    localStorage.setItem("traviora_hotels", JSON.stringify(hotels));
    window.closeModal();
    refreshAdminDashboard();
    window.showToast(isEditing ? "Stay hotel details updated!" : "New stay hotel added to listings!", "success");
  });
}

// Reset System Data to baseline defaults
window.resetSystemData = function() {
  if (confirm("Warning: Reset all database tables? You will lose custom bookings and wishlist configurations.")) {
    window.TravioraDb.reset();
    refreshAdminDashboard();
    window.showToast("Database tables refreshed to factory defaults.", "success");
  }
};

// Admin Tab Navigation Switcher
window.switchAdminTab = function(tabName, button) {
  // Hide all panels
  document.querySelectorAll(".admin-panel").forEach(p => p.classList.remove("active"));
  // Show selected
  document.getElementById(`admin-${tabName}`).classList.add("active");
  
  // Header button style
  document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
};
