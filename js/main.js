// TRAVIORA Tours & Travel - Global JavaScript Controller

document.addEventListener("DOMContentLoaded", () => {
  // Initialize standard page animations, layouts and state indicators
  initHeaderScroll();
  initMobileNav();
  initNewsletter();
  window.updateWishlistBadges();
  
  // Expose global modules
  window.initCardWishlists();
});

// 1. Header scroll transition handler
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger immediately in case page is loaded scrolled
}

// 2. Mobile navigation drawer triggers
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".mobile-nav-overlay");
  const closeBtn = document.querySelector(".drawer-close");
  
  if (!hamburger || !overlay) return;
  
  const openMenu = () => overlay.classList.add("open");
  const closeMenu = () => overlay.classList.remove("open");
  
  hamburger.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });
}

// 3. Footer Newsletter form handler
function initNewsletter() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector(".newsletter-input");
      if (!input || !input.value.trim()) return;
      
      window.showToast("Thank you for subscribing to Traviora updates!", "success");
      input.value = "";
    });
  });
}

// 4. Global Toast Notification System
window.showToast = function(message, type = "success") {
  // Create container if not exists
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  
  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconClass = "fa-check-circle";
  if (type === "error") iconClass = "fa-exclamation-circle";
  if (type === "warning") iconClass = "fa-exclamation-triangle";
  
  toast.innerHTML = `
    <i class="fas ${iconClass}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Trigger animation frame for browser transition
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });
  
  // Remove toast
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 3500);
};

// 5. Global Modal System
window.showModal = function(title, contentHtml) {
  let modalOverlay = document.querySelector(".modal-overlay");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.innerHTML = `
      <div class="modal-box">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
    
    modalOverlay.querySelector(".modal-close").addEventListener("click", window.closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) window.closeModal();
    });
  } else {
    modalOverlay.querySelector(".modal-header h3").textContent = title;
  }
  
  modalOverlay.querySelector(".modal-body").innerHTML = contentHtml;
  modalOverlay.classList.add("open");
};

window.closeModal = function() {
  const modalOverlay = document.querySelector(".modal-overlay");
  if (modalOverlay) {
    modalOverlay.classList.remove("open");
  }
};

// 6. Wishlist reactive handlers
window.updateWishlistBadges = function() {
  const badges = document.querySelectorAll("#wishlist-badge");
  const count = window.TravioraDb.getWishlist().length;
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "block" : "none";
  });
};

window.toggleWishlistState = function(itemId, element) {
  const isAdded = window.TravioraDb.isInWishlist(itemId);
  const updatedWishlist = window.TravioraDb.toggleWishlist(itemId);
  window.updateWishlistBadges();
  
  // Set heart classes
  const heartIcon = element.querySelector("i") || element;
  if (!isAdded) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid", "active");
    element.classList.add("active");
    window.showToast("Added to your wishlist!", "success");
  } else {
    heartIcon.classList.remove("fa-solid", "active");
    heartIcon.classList.add("fa-regular");
    element.classList.remove("active");
    window.showToast("Removed from your wishlist.", "info");
  }
  
  // Trigger secondary custom events if listeners need updates (e.g. wishlist page)
  const event = new CustomEvent("wishlistUpdated", { detail: { itemId, action: !isAdded ? "add" : "remove" } });
  document.dispatchEvent(event);
};

// Setup heart clicks on page loaded
window.initCardWishlists = function() {
  const wishButtons = document.querySelectorAll(".wishlist-btn");
  wishButtons.forEach(btn => {
    const itemId = btn.getAttribute("data-id");
    
    // Set initial class
    const heartIcon = btn.querySelector("i");
    if (window.TravioraDb.isInWishlist(itemId)) {
      btn.classList.add("active");
      if (heartIcon) {
        heartIcon.className = "fa-solid fa-heart active";
      }
    } else {
      btn.classList.remove("active");
      if (heartIcon) {
        heartIcon.className = "fa-regular fa-heart";
      }
    }
    
    // Bind click event (re-bind to avoid duplicate listeners)
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.toggleWishlistState(itemId, btn);
    };
  });
};

// 7. Dynamic shared header/footer components setup helper
// Helpful to maintain structure across multiple static files
window.renderHeader = function(activePage) {
  const container = document.getElementById("header-placeholder");
  if (!container) return;
  
  const user = window.TravioraDb.getUser();
  
  container.innerHTML = `
    <div class="container">
      <nav class="navbar">
        <a href="index.html" class="logo-container">
          <div class="logo-icon brand-mark"><i class="fa-solid fa-feather-pointed"></i></div>
          <div class="logo-text">
            <span class="logo-title">TRAVIORA</span>
            <span class="logo-subtitle">Tours & Travel</span>
          </div>
        </a>
        <ul class="nav-menu">
          <li><a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="hotels.html" class="nav-link ${activePage === 'hotels' ? 'active' : ''}">Hotels</a></li>
          <li><a href="tours.html" class="nav-link ${activePage === 'tours' ? 'active' : ''}">Tour</a></li>
          <li><a href="destinations.html" class="nav-link ${activePage === 'destinations' ? 'active' : ''}">Destination</a></li>
          <li><a href="#" class="nav-link" onclick="window.showToast('Services page is a demonstration. Features are mock only.', 'info')">Services</a></li>
          <li><a href="#" class="nav-link" onclick="window.showToast('Traviora client demo created with high visual fidelity.', 'info')">About</a></li>
        </ul>
        <div class="nav-actions">
          <button class="nav-icon-btn" title="Search" onclick="window.showToast('Please search using the homepage search bars or package list filters!', 'info')"><i class="fa-solid fa-magnifying-glass"></i></button>
          <button class="nav-icon-btn" title="Wishlist" onclick="location.href='profile.html#wishlist'"><i class="fa-regular fa-heart"></i><span class="badge" id="wishlist-badge" style="display:none">0</span></button>
          <button class="nav-icon-btn" title="Support" onclick="window.showModal('Customer Support', '<p style=\'margin-bottom:15px\'>Need help with booking? Connect with our 24/7 dedicated travel experts:</p><p style=\'font-weight:600\'><i class=\'fa-solid fa-phone\' style=\'color:var(--accent-gold);margin-right:8px\'></i>+91 82194 44573</p><p style=\'font-weight:600;margin-top:10px\'><i class=\'fa-solid fa-envelope\' style=\'color:var(--accent-gold);margin-right:8px\'></i>support@traviora.com</p>')"><i class="fa-solid fa-headset"></i></button>
          <a href="profile.html" class="btn btn-outline btn-sm"><i class="fa-regular fa-user"></i> View Profile</a>
          <a href="plan-trip.html" class="btn btn-primary btn-sm">Plan My Trip <i class="fa-solid fa-arrow-right-long"></i></a>
          <div class="hamburger"><i class="fa-solid fa-bars"></i></div>
        </div>
      </nav>
    </div>
    <div class="mobile-nav-overlay">
      <div class="mobile-drawer">
        <div class="drawer-header">
          <a href="index.html" class="logo-container">
            <div class="logo-icon" style="font-size:1.8rem"><i class="fa-solid fa-feather-pointed"></i></div>
            <div class="logo-text">
              <span class="logo-title" style="font-size:1.3rem">TRAVIORA</span>
              <span class="logo-subtitle" style="font-size:0.5rem">Tours & Travel</span>
            </div>
          </a>
          <button class="drawer-close"><i class="fa-solid fa-times"></i></button>
        </div>
        <div class="mobile-menu-links">
          <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
          <a href="hotels.html" class="nav-link ${activePage === 'hotels' ? 'active' : ''}">Hotels</a>
          <a href="tours.html" class="nav-link ${activePage === 'tours' ? 'active' : ''}">Tour</a>
          <a href="destinations.html" class="nav-link ${activePage === 'destinations' ? 'active' : ''}">Destination</a>
          <a href="#" class="nav-link" onclick="window.showToast('Services page is a demonstration. Features are mock only.', 'info')">Services</a>
          <a href="#" class="nav-link" onclick="window.showToast('Traviora client demo created with high visual fidelity.', 'info')">About</a>
          <hr style="border:0;border-top:1px solid var(--border-color);margin:10px 0;">
          <a href="profile.html" class="nav-link ${activePage === 'profile' ? 'active' : ''}"><i class="fa-regular fa-user"></i> ${user.name}</a>
          <a href="admin.html" class="nav-link"><i class="fa-solid fa-user-gear"></i> Admin Dashboard</a>
          <a href="plan-trip.html" class="btn btn-primary" style="margin-top:20px">Plan My Trip <i class="fa-solid fa-arrow-right-long"></i></a>
        </div>
      </div>
    </div>
  `;
  
  // Re-run triggers since elements were dynamically inserted
  initMobileNav();
  window.updateWishlistBadges();
};

window.renderFooter = function() {
  const container = document.getElementById("footer-placeholder");
  if (!container) return;
  
  container.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo-container">
            <div class="logo-icon" style="color:var(--accent-gold)"><i class="fa-solid fa-feather-pointed"></i></div>
            <div class="logo-text">
              <span class="logo-title" style="color:var(--pure-white)">TRAVIORA</span>
              <span class="logo-subtitle" style="color:rgba(255,255,255,0.6)">Tours & Travel</span>
            </div>
          </a>
          <p>Discover destinations, experiences and stays worth remembering.</p>
          <div class="social-links">
            <a href="#" class="social-btn" onclick="window.showToast('Connecting to Facebook...', 'info')"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="social-btn" onclick="window.showToast('Connecting to Instagram...', 'info')"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-btn" onclick="window.showToast('Connecting to YouTube...', 'info')"><i class="fa-brands fa-youtube"></i></a>
            <a href="#" class="social-btn" onclick="window.showToast('Connecting to Twitter/X...', 'info')"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="social-btn" onclick="window.showToast('Connecting to Pinterest...', 'info')"><i class="fa-brands fa-pinterest-p"></i></a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Explore</h4>
          <ul class="footer-links">
            <li><a href="destinations.html">Destinations</a></li>
            <li><a href="hotels.html">Hotels</a></li>
            <li><a href="tours.html">Tour Packages</a></li>
            <li><a href="#" onclick="window.showToast('Experiences category selected. Features are mock.', 'info')">Experiences</a></li>
            <li><a href="#" onclick="window.showToast('Loading Travel Guide...', 'info')">Travel Guide</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-heading">Company</h4>
          <ul class="footer-links">
            <li><a href="#" onclick="window.showToast('About Traviora loaded.', 'info')">About Traviora</a></li>
            <li><a href="#" onclick="window.showToast('No active openings currently.', 'info')">Careers</a></li>
            <li><a href="#" onclick="window.showToast('Media desk loaded.', 'info')">Press & Media</a></li>
            <li><a href="#" onclick="window.showToast('Blog section loaded.', 'info')">Blog</a></li>
            <li><a href="#" onclick="window.showToast('Opening contact channel...', 'info')">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer-newsletter">
          <h4 class="footer-heading">Subscribe</h4>
          <p>Get travel inspiration in your inbox.</p>
          <form class="newsletter-form">
            <input type="email" class="newsletter-input" placeholder="Enter your email" required>
            <button type="submit" class="newsletter-submit"><i class="fa-regular fa-paper-plane"></i></button>
          </form>
          <div class="support-contact">
            <div class="support-icon"><i class="fa-solid fa-headset"></i></div>
            <div class="support-text">
              <span>24/7 Customer Support</span>
              <a href="tel:+918219444573">+91 82194 44573</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Traviora Tours & Travel. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="#" onclick="window.showToast('Loading Site Map...', 'info')">Sitemap</a>
          <a href="#" onclick="window.showToast('Loading Terms of Use...', 'info')">Terms</a>
          <a href="#" onclick="window.showToast('Loading Privacy Policy...', 'info')">Privacy</a>
        </div>
      </div>
    </div>
  `;
  
  // Re-run newsletter binder for newly injected forms
  initNewsletter();
};
