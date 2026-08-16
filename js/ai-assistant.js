// TRAVIORA Tours & Travel - AI Assistant & WhatsApp Controller

document.addEventListener("DOMContentLoaded", () => {
  initWidgets();
});

function initWidgets() {
  // Create the floating widgets containers dynamically if not present in HTML
  let widgetsContainer = document.querySelector(".floating-widgets");
  if (!widgetsContainer) {
    widgetsContainer = document.createElement("div");
    widgetsContainer.className = "floating-widgets";
    widgetsContainer.innerHTML = `
      <button class="widget-btn whatsapp-btn" id="wa-widget" title="WhatsApp Support">
        <i class="fa-brands fa-whatsapp"></i>
      </button>
      <button class="widget-btn ai-assistant-btn" id="ai-widget" title="AI Travel Assistant">
        <i class="fa-solid fa-robot"></i>
      </button>
    `;
    document.body.appendChild(widgetsContainer);
  }

  // Create the AI Chat Panel dynamically if not present in HTML
  let chatPanel = document.querySelector(".ai-chat-panel");
  if (!chatPanel) {
    chatPanel = document.createElement("div");
    chatPanel.className = "ai-chat-panel";
    chatPanel.id = "ai-chat-panel";
    chatPanel.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-chat-profile">
          <div class="ai-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="ai-chat-title">
            <h4>Traviora AI Guide</h4>
            <div class="ai-chat-status"><span>●</span> Online</div>
          </div>
        </div>
        <button class="ai-chat-close" id="ai-chat-close"><i class="fa-solid fa-times"></i></button>
      </div>
      <div class="ai-chat-messages" id="ai-chat-messages">
        <div class="chat-bubble chat-bubble-assistant">
          Hi! I'm your Traviora AI travel assistant. How can I help you discover your next story today?
        </div>
        <div class="quick-options">
          <button class="quick-option-btn" data-query="Plan a trip to Bali">Plan a trip to Bali</button>
          <button class="quick-option-btn" data-query="Find luxury hotels">Find luxury hotels</button>
          <button class="quick-option-btn" data-query="Best time to visit Europe">Best time to visit Europe</button>
          <button class="quick-option-btn" data-query="Budget-friendly trips">Budget-friendly trips</button>
          <button class="quick-option-btn" data-query="Top beach destinations">Top beach destinations</button>
        </div>
      </div>
      <form class="ai-chat-input-area" id="ai-chat-form">
        <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Ask me anything..." required>
        <button type="submit" class="ai-chat-send"><i class="fa-solid fa-paper-plane"></i></button>
      </form>
    `;
    document.body.appendChild(chatPanel);
  }

  // Bind Event Listeners
  const aiWidget = document.getElementById("ai-widget");
  const waWidget = document.getElementById("wa-widget");
  const aiClose = document.getElementById("ai-chat-close");
  const aiForm = document.getElementById("ai-chat-form");
  const aiInput = document.getElementById("ai-chat-input");
  const messagesContainer = document.getElementById("ai-chat-messages");

  // WhatsApp click handler
  waWidget.addEventListener("click", () => {
    window.showModal(
      "Chat with Traviora Support",
      `<div style="text-align:center;padding:10px 0;">
        <i class="fa-brands fa-whatsapp" style="font-size:3.5rem;color:#25D366;margin-bottom:15px;display:block"></i>
        <p style="margin-bottom:20px;font-size:1.05rem">Would you like to connect with a Live Booking Agent via WhatsApp?</p>
        <div style="display:flex;flex-direction:column;gap:10px">
          <a href="https://wa.me/918219444573" target="_blank" class="btn btn-primary" style="background-color:#25D366;border-color:#25D366;color:white">
            <i class="fa-brands fa-whatsapp"></i> Start WhatsApp Chat
          </a>
          <button class="btn btn-outline" onclick="window.closeModal()">Cancel</button>
        </div>
      </div>`
    );
  });

  // AI open/close handlers
  aiWidget.addEventListener("click", () => {
    chatPanel.classList.toggle("open");
    // Scroll to bottom when opening
    if (chatPanel.classList.contains("open")) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });

  aiClose.addEventListener("click", () => {
    chatPanel.classList.remove("open");
  });

  // Quick options handler
  messagesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("quick-option-btn")) {
      const query = e.target.getAttribute("data-query");
      handleUserMessage(query);
    }
  });

  // Chat submit form handler
  aiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = aiInput.value.trim();
    if (!query) return;
    
    handleUserMessage(query);
    aiInput.value = "";
  });

  // Message dispatcher
  function handleUserMessage(query) {
    appendMessage(query, "user");
    
    // Show typing effect
    const typingBubble = appendTypingIndicator();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      const response = getAiResponse(query);
      appendMessage(response, "assistant");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 800);
  }

  function appendMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble chat-bubble-${sender}`;
    bubble.innerHTML = text;
    messagesContainer.appendChild(bubble);
    return bubble;
  }

  function appendTypingIndicator() {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble chat-bubble-assistant";
    bubble.style.display = "flex";
    bubble.style.alignItems = "center";
    bubble.style.gap = "4px";
    bubble.innerHTML = `
      <span style="animation: bounce 1.4s infinite both;font-weight:700">•</span>
      <span style="animation: bounce 1.4s infinite both 0.2s;font-weight:700">•</span>
      <span style="animation: bounce 1.4s infinite both 0.4s;font-weight:700">•</span>
    `;
    
    // Add custom stylesheet inline for typing bounce
    if (!document.getElementById("typing-animation-style")) {
      const style = document.createElement("style");
      style.id = "typing-animation-style";
      style.innerHTML = `
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    messagesContainer.appendChild(bubble);
    return bubble;
  }

  function getAiResponse(query) {
    const q = query.toLowerCase();
    
    if (q.includes("bali")) {
      return "Excellent choice! 🌴 Bali is one of our most popular destinations. I recommend our <strong>Bali Escape</strong> package (6 Days / 5 Nights, starting at ₹39,999/person). It includes luxury hotel stays, a Nusa Penida island day trip, and tours to the Ubud Monkey Forest and Uluwatu Temple. Would you like me to redirect you to our customized <a href='plan-trip.html' style='color:var(--accent-gold);text-decoration:underline;font-weight:600'>Trip Planner</a>?";
    }
    
    if (q.includes("hotel") || q.includes("stay") || q.includes("resort")) {
      return "We have premier handpicked luxury partners! 🏨 Some standouts include:<br>• <strong>The Palm Resort (Dubai)</strong>: Private beach and infinity pools (from ₹8,500/night)<br>• <strong>Goa Beach Resort (Goa)</strong>: Beachfront Calangute paradise (from ₹5,500/night)<br>• <strong>Bali Paradiso Resort (Ubud)</strong>: Overlooking lush valleys (from ₹9,500/night)<br><br>Check out our <a href='hotels.html' style='color:var(--accent-gold);text-decoration:underline;font-weight:600'>Hotels Page</a> to explore options!";
    }
    
    if (q.includes("europe") || q.includes("switzerland") || q.includes("paris")) {
      return "Europe is spectacular! 🏔️ Our <strong>Switzerland Explorer</strong> (7 Days / 6 Nights, starting from ₹1,15,999/person) includes cogwheel mountain rail passes, visits to Mt Titlis glaciers, and tours of Lucerne and Interlaken. The best time to visit is from June to September!";
    }
    
    if (q.includes("budget") || q.includes("cheap") || q.includes("affordable")) {
      return "Looking for a cost-effective escape? 💸 We have two highly recommended budget-friendly packages:<br>• <strong>Goa Holiday</strong>: 4 Days / 3 Nights with resort stay, sightseeing, and Mandovi river cruise from only <strong>₹10,999</strong>/person.<br>• <strong>Kashmir Adventure</strong>: 6 Days / 5 Nights in scenic valleys and a Dal Lake houseboat from <strong>₹24,999</strong>/person.";
    }
    
    if (q.includes("beach") || q.includes("sea") || q.includes("island")) {
      return "Sun, sand, and ocean breezes! 🏖️ We recommend:<br>• <strong>Goa</strong> (Beaches & nightlife, from ₹9,999)<br>• <strong>Bali</strong> (Spiritual volcanic beaches, from ₹14,999)<br>• <strong>Maldives</strong> (Ultimate private overwater lagoon villas, from ₹24,999)";
    }
    
    if (q.includes("dubai") || q.includes("burj")) {
      return "Dubai is a luxury oasis! 🏙️ Check out our signature <strong>Dubai Escape</strong> package (5 Days / 4 Nights, from ₹45,999/person). Features include a desert safari with BBQ buffet, city tours, and high-altitude Burj Khalifa tickets!";
    }

    if (q.includes("kashmir") || q.includes("gulmarg")) {
      return "Experience the 'Paradise on Earth'! ❄️ Our <strong>Kashmir Adventure</strong> (6 Days / 5 Nights, from ₹24,999) covers Gulmarg gondola cable-car rides, Pahalgam pines, Srinagar houseboats, and Mughal garden tours.";
    }

    return "I'd love to help you plan! ✈️ You can view our ready-made <a href='tours.html' style='color:var(--accent-gold);text-decoration:underline;font-weight:600'>Tour Packages</a>, explore luxury <a href='hotels.html' style='color:var(--accent-gold);text-decoration:underline;font-weight:600'>Hotels</a>, or generate a tailored itinerary in seconds using our interactive <a href='plan-trip.html' style='color:var(--accent-gold);text-decoration:underline;font-weight:600'>Multi-step Trip Planner</a>!";
  }
}
