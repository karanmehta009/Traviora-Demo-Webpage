// TRAVIORA Tours & Travel - Mock Data Store
// Utilizes localStorage to enable dynamic CRUD actions and page integration.

const DEFAULT_DESTINATIONS = [
  {
    id: "goa",
    name: "Goa",
    tagline: "Beaches, nightlife & sunshine",
    price: 9999,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "A pocket-sized paradise on the west coast of India, Goa is a kaleidoscopic blend of Portuguese-Indian heritage, delicious seafood, and serene sandy shores.",
    type: "Beach"
  },
  {
    id: "kashmir",
    name: "Kashmir",
    tagline: "Paradise on earth awaits you",
    price: 12999,
    image: "https://images.unsplash.com/photo-1566837430420-9ebccd34bcb3?auto=format&fit=crop&w=800&q=80",
    description: "From the snow-capped mountains of Gulmarg to the tranquil waters of Dal Lake in Srinagar, Kashmir is truly a paradise on earth, rich in culture and breathtaking vistas.",
    type: "Mountain"
  },
  {
    id: "dubai",
    name: "Dubai",
    tagline: "Luxury, skyline & endless adventures",
    price: 18999,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    description: "A futuristic metropolis in the desert, Dubai offers luxury shopping, cutting-edge architecture, world-class dining, and exciting desert dune adventures.",
    type: "Luxury"
  },
  {
    id: "bali",
    name: "Bali",
    tagline: "Island of gods & serenity",
    price: 14999,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Famous for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs, Bali offers deep spiritual heritage blended with tropical luxury.",
    type: "Romantic"
  },
  {
    id: "maldives",
    name: "Maldives",
    tagline: "Turquoise waters & luxury overwater stays",
    price: 24999,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
    description: "A tropical nation in the Indian Ocean, composed of 26 ring-shaped atolls, Maldives is the ultimate destination for private overwater villas and vibrant marine life.",
    type: "Luxury"
  },
  {
    id: "europe",
    name: "Europe",
    tagline: "Timeless cities & iconic landscapes",
    price: 49999,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    description: "From the classical ruins of Rome to the romantic streets of Paris and the dramatic fjords of Norway, Europe offers a rich tapestry of history, art, and landscapes.",
    type: "Culture"
  },
  {
    id: "switzerland",
    name: "Switzerland",
    tagline: "Majestic Alps & crystal lakes",
    price: 61999,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    description: "A mountainous Central European country, home to numerous lakes, villages, and the high peaks of the Alps. Renowned for its ski resorts, hiking trails, chocolate, and watches.",
    type: "Mountain"
  },
  {
    id: "singapore",
    name: "Singapore",
    tagline: "The garden city of the future",
    price: 27999,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    description: "A global financial center with a tropical climate and multicultural population. Renowned for its futuristic Gardens by the Bay, clean streets, and vibrant street food.",
    type: "Family"
  }
];

const DEFAULT_TOURS = [
  {
    id: "t-dubai-escape",
    name: "Dubai Escape",
    destination: "Dubai",
    duration: "5 Days / 4 Nights",
    maxPeople: 20,
    price: 45999,
    rating: 4.8,
    reviewsCount: 230,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544989164-325251edef8f?auto=format&fit=crop&w=800&q=80"
    ],
    inclusions: ["Flights", "Hotel", "Meals", "Transfers"],
    highlights: ["Desert Safari", "Burj Khalifa visit", "Dubai City Tour", "Luxury Shopping Mall Escapade", "Airport Transfers"],
    overview: "Experience the perfect blend of modern luxury and traditional culture with our Dubai Premium Escape tour. From iconic skyscrapers and luxury shopping to thrilling desert adventures, this 5-day journey will leave you with memories of a lifetime.",
    itinerary: [
      { day: 1, title: "Arrival in Dubai", description: "Arrive at Dubai International Airport. Meet our representative and transfer to hotel. Check-in and relax. Evening free for leisure. Overnight in Dubai." },
      { day: 2, title: "Dubai City Tour", description: "After breakfast, enjoy a half-day city tour covering Burj Al Arab (photo stop), Dubai Museum, Jumeirah Mosque, Palm Jumeirah and more. Overnight in Dubai." },
      { day: 3, title: "Desert Safari Adventure", description: "Morning free for leisure. In the afternoon, enjoy an exciting desert safari with dune bashing, camel ride, BBQ dinner and cultural shows. Overnight in Dubai." },
      { day: 4, title: "Leisure Day", description: "Full day free for leisure. You can explore shopping malls, beaches or optional attractions on your own. Overnight in Dubai." },
      { day: 5, title: "Departure", description: "After breakfast, check out from the hotel and transfer to Dubai Airport for your return flight with sweet memories. Tour Ends." }
    ],
    includes: [
      "4 Nights accommodation in 4-star hotel",
      "Daily breakfast at the hotel",
      "Airport pickup & drop on private basis",
      "Dubai city tour with English speaking guide",
      "Desert safari with BBQ dinner & belly dance",
      "All transfers on SIC basis",
      "Applicable taxes"
    ],
    excludes: [
      "International flights and visa fees",
      "Lunch & dinner (except on Desert Safari)",
      "Personal expenses, laundry, tips",
      "Travel insurance",
      "Tips and gratuities",
      "Anything not mentioned in inclusions"
    ],
    cancellation: [
      { range: "More than 30 days before departure", details: "Full refund minus 10% of the tour cost as administrative fees." },
      { range: "15 – 30 days before departure", details: "50% of the tour cost will be charged as cancellation penalty." },
      { range: "Less than 15 days before departure", details: "100% of the tour cost will be charged. No refund will be provided." }
    ],
    trending: true,
    packagesCount: 32,
    difficulty: "Easy",
    season: "Oct - Mar",
    tourType: "Private Tour"
  },
  {
    id: "t-goa-holiday",
    name: "Goa Holiday",
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    maxPeople: 25,
    price: 10999,
    rating: 4.7,
    reviewsCount: 180,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473116763269-255448993b66?auto=format&fit=crop&w=800&q=80"
    ],
    inclusions: ["Hotel", "Meals", "Transfers"],
    highlights: ["North Goa Beach Tour", "South Goa Heritage Sites", "Dolphin Cruise", "Scuba Diving Experience"],
    overview: "Sunny beaches, vibrant nightlife, Portuguese heritage, and delightful seafood. Goa Holiday brings you the best of India's favorite beach destination with comfort and style.",
    itinerary: [
      { day: 1, title: "Arrival in Goa", description: "Arrive at Goa Airport/Railway station. Transfer to your resort. Rest of the day is at leisure. Explore nearby beaches or local shacks." },
      { day: 2, title: "North Goa Sightseeing", description: "Visit Calangute, Baga, and Anjuna beaches. Explore the historical Aguada Fort for stunning sunset views." },
      { day: 3, title: "South Goa & Heritage", description: "Explore the churches of Old Goa, Mangueshi Temple, Miramar beach, and take a romantic boat cruise on the Mandovi River." },
      { day: 4, title: "Departure", description: "Check out after breakfast. Transfer to airport or station for departure." }
    ],
    includes: ["3 Nights resort stay", "Breakfast and Dinner", "North & South Goa tours in AC coach", "Mandovi River Cruise ticket"],
    excludes: ["Flights", "Lunch", "Personal tips", "Watersports costs"],
    cancellation: [
      { range: "More than 15 days before departure", details: "Full refund minus 5% service charge." },
      { range: "7 – 15 days before departure", details: "50% refund." },
      { range: "Less than 7 days", details: "No refund." }
    ],
    trending: false,
    packagesCount: 15,
    difficulty: "Easy",
    season: "Nov - Feb",
    tourType: "Group Tour"
  },
  {
    id: "t-bali-escape",
    name: "Bali Escape",
    destination: "Bali",
    duration: "6 Days / 5 Nights",
    maxPeople: 15,
    price: 39999,
    rating: 4.9,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518548419070-ad8d5d988b99?auto=format&fit=crop&w=800&q=80"
    ],
    inclusions: ["Flights", "Hotel", "Meals"],
    highlights: ["Ubud Sacred Monkey Forest", "Uluwatu Sunset Temple Tour", "Kintamani Volcano Trek", "Tegallalang Rice Terrace Swing"],
    overview: "Discover Bali's beautiful blend of culture, volcanic landscapes, and pristine beaches. This premium packages guides you through Ubud's spiritual heart to Seminyak's luxury shorelines.",
    itinerary: [
      { day: 1, title: "Welcome to Bali", description: "Arrive at Ngurah Rai Airport. Transfer to your hotel in Ubud. Explore Ubud Market in the evening." },
      { day: 2, title: "Ubud Culture & Swing", description: "Visit Sacred Monkey Forest, Tegallalang Rice Terrace, and experience the famous Bali Swing. Overnight in Ubud." },
      { day: 3, title: "Kintamani Volcano & Coffee Plantation", description: "Marvel at Mount Batur active volcano. Taste famous Luwak Coffee at a local organic farm." },
      { day: 4, title: "Seminyak & Uluwatu Sunset", description: "Transfer to Seminyak hotel. In the evening, visit Uluwatu Temple perched on a cliff edge, followed by a Kecak Fire Dance." },
      { day: 5, title: "Nusa Penida Day Trip", description: "Take a speed boat to Nusa Penida island. Visit Kelingking T-Rex Beach, Angel's Billabong, and Broken Beach." },
      { day: 6, title: "Farewell Bali", description: "Morning free for shopping. Transfer to airport for flight home." }
    ],
    includes: ["5 Nights luxury hotel stays", "Daily breakfast & select dinners", "English speaking tour guide", "Nusa Penida boat and tour tickets"],
    excludes: ["Visa on Arrival", "Personal expenditures", "Tips"],
    cancellation: [
      { range: "More than 30 days before departure", details: "Full refund minus 10% administration fee." },
      { range: "15 – 30 days before", details: "50% charge." },
      { range: "Less than 15 days", details: "Non-refundable." }
    ],
    trending: true,
    packagesCount: 28,
    difficulty: "Moderate",
    season: "Apr - Oct",
    tourType: "Wanderlust Package"
  },
  {
    id: "t-kashmir-adv",
    name: "Kashmir Adventure",
    destination: "Kashmir",
    duration: "6 Days / 5 Nights",
    maxPeople: 18,
    price: 24999,
    rating: 4.8,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1566837430420-9ebccd34bcb3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566837430420-9ebccd34bcb3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80"
    ],
    inclusions: ["Hotel", "Meals", "Transfers"],
    highlights: ["Dal Lake Shikara Ride", "Gulmarg Gondola Ride", "Pahalgam Valley Tour", "Stay in Luxury Houseboat"],
    overview: "Embark on an unforgettable journey through Kashmir. Stay in a traditional wooden houseboat on Dal Lake, walk through pine forests in Pahalgam, and ride Asia's highest cable car in Gulmarg.",
    itinerary: [
      { day: 1, title: "Srinagar Arrival & Houseboat Stay", description: "Arrive at Srinagar airport. Board a premium wooden houseboat. Enjoy a peaceful Shikara ride on Dal Lake in the evening." },
      { day: 2, title: "Srinagar Local Sightseeing", description: "Explore Shalimar, Nishat, and Chashme Shahi Mughal Gardens. Overnight at hotel in Srinagar." },
      { day: 3, title: "Gulmarg Day Trip", description: "Drive to Gulmarg, the meadow of flowers. Enjoy the Gondola ride (Phase 1 & 2) up to 13,000 feet for snow activities." },
      { day: 4, title: "Pahalgam Valley Transfer", description: "Travel to Pahalgam. En route visit saffron fields and Avantipura ruins. Overnight at hotel in Pahalgam." },
      { day: 5, title: "Aru & Betaab Valleys", description: "Explore the picturesque Betaab Valley and Aru Valley. Enjoy local horseback riding. Return to Srinagar." },
      { day: 6, title: "Departure", description: "Transfer to Srinagar airport for departure." }
    ],
    includes: ["1 Night Houseboat, 4 Nights 4-star hotels", "Breakfast & Dinner daily", "All sightseeing by private sedan", "Shikara ride on Dal Lake"],
    excludes: ["Flights", "Gondola ride tickets (can be pre-booked)", "Pony rides", "Betaab Valley local taxi charge"],
    cancellation: [
      { range: "More than 20 days before departure", details: "Full refund minus 5% processing fee." },
      { range: "10 - 20 days", details: "50% refund." },
      { range: "Less than 10 days", details: "No refund." }
    ],
    trending: false,
    packagesCount: 22,
    difficulty: "Easy",
    season: "Mar - Oct",
    tourType: "Nature Adventure"
  },
  {
    id: "t-switzerland-exp",
    name: "Switzerland Explorer",
    destination: "Switzerland",
    duration: "7 Days / 6 Nights",
    maxPeople: 12,
    price: 115999,
    rating: 4.9,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518098268026-4e66f1a9c869?auto=format&fit=crop&w=800&q=80"
    ],
    inclusions: ["Flights", "Hotel", "Meals", "Transfers"],
    highlights: ["Mount Titlis Glacier Tour", "Scenic Lucerne Chapel Bridge", "Interlaken Lakes Cruise", "Jungfraujoch Top of Europe Train"],
    overview: "Explore Switzerland's snow-clad peaks, crystal clear lakes, and fairytale towns. Travel on iconic scenic trains and enjoy ultimate Swiss hospitality.",
    itinerary: [
      { day: 1, title: "Arrival in Zurich - Lucerne Transfer", description: "Arrive in Zurich, take a scenic train to Lucerne. Walk the historic Chapel Bridge. Overnight in Lucerne." },
      { day: 2, title: "Mount Titlis Glacier Mountain", description: "Take the revolving Rotair cable car to Mount Titlis summit. Walk the cliff bridge. Overnight in Lucerne." },
      { day: 3, title: "Lucerne to Interlaken", description: "Board the golden pass panoramic train to Interlaken. Spend the evening walking around Höheweg. Overnight in Interlaken." },
      { day: 4, title: "Jungfraujoch - Top of Europe", description: "Board the cogwheel train to Jungfraujoch, the highest railway station in Europe. Experience the Ice Palace. Overnight in Interlaken." },
      { day: 5, title: "Interlaken to Geneva", description: "Transfer to Geneva. See the Jet d'Eau and visit the UN headquarters. Overnight in Geneva." },
      { day: 6, title: "Geneva Sightseeing & Chocolate Tasting", description: "Enjoy a walking tour of the Old Town and a master Swiss chocolatier workshop." },
      { day: 7, title: "Departure", description: "Transfer to Geneva/Zurich airport for departure." }
    ],
    includes: ["6 Nights luxury hotels", "Daily Buffet Breakfast", "Swiss Travel Pass 1st Class", "Jungfraujoch & Mt Titlis tickets"],
    excludes: ["Visa fees", "Lunch & dinner", "Personal porter services"],
    cancellation: [
      { range: "More than 45 days before departure", details: "Full refund minus 10% tour cost." },
      { range: "15 – 45 days before", details: "70% cancellation fee." },
      { range: "Less than 15 days", details: "No refund." }
    ],
    trending: true,
    packagesCount: 18,
    difficulty: "Moderate",
    season: "Jun - Sep",
    tourType: "Luxury Rail Tour"
  },
  {
    id: "t-maldives-luxury",
    name: "Maldives Luxury Escape",
    destination: "Maldives",
    duration: "5 Days / 4 Nights",
    maxPeople: 10,
    price: 85999,
    rating: 4.9,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80"
    ],
    inclusions: ["Hotel", "Meals", "Transfers"],
    highlights: ["Private Overwater Villa Stay", "Speedboat/Seaplane Transfers", "Sunset Floating Breakfast", "Snorkeling Tour with Sea Turtles"],
    overview: "Indulge in absolute luxury. A romantic and serene holiday package designed for honeymooners and families looking for private islands, white sands, and turquoise infinity pools.",
    itinerary: [
      { day: 1, title: "Arrive in Maldives - Speedboat Transfer", description: "Arrive at Male International Airport. Board the luxury speedboat to your private resort island. Check-in to your Beach Villa." },
      { day: 2, title: "Water Villa Upgrade & Snorkeling", description: "Check-in to your Overwater Villa with private pool. Guided snorkeling tour of the house reef." },
      { day: 3, title: "Floating Breakfast & Spa Session", description: "Wake up to a floating breakfast in your private pool. In the afternoon, enjoy a 60-minute couple's massage." },
      { day: 4, title: "Sunset Cruise & Dolphin Watching", description: "Relax at the resort beach. Embark on a sunset cruise to spot wild dolphins playing in the ocean waves." },
      { day: 5, title: "Departure", description: "Enjoy the resort breakfast. Check-out and speedboat transfer back to Male Airport." }
    ],
    includes: ["4 Nights in a 5-star Overwater Villa", "All-Inclusive Meal Plan (Breakfast, Lunch, Dinner & Drinks)", "Roundtrip speedboat airport transfers", "Complimentary watersports equipment"],
    excludes: ["International Flights", "Spa extra add-ons", "Scuba certification costs"],
    cancellation: [
      { range: "More than 30 days before", details: "Full refund minus 5% bank charges." },
      { range: "Less than 30 days", details: "Non-refundable due to resort policies." }
    ],
    trending: true,
    packagesCount: 12,
    difficulty: "Easy",
    season: "Dec - Apr",
    tourType: "Romantic Escape"
  },
  {
    id: "t-thailand-exp",
    name: "Thailand Explorer",
    destination: "Thailand",
    duration: "6 Days / 5 Nights",
    maxPeople: 22,
    price: 34999,
    rating: 4.6,
    reviewsCount: 152,
    image: "https://images.unsplash.com/photo-1528181304800-2f0908879943?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1528181304800-2f0908879943?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80"
    ],
    inclusions: ["Hotel", "Meals", "Transfers"],
    highlights: ["Bangkok Temple Tour", "Phuket Phi Phi Island Speedboat Tour", "Coral Island Watersports", "Famous Thai Street Food Safari"],
    overview: "Discover Thailand's famous dynamic nightlife, stunning beach cliffs, and Buddhist temples. Combining the urban sprawl of Bangkok with the tropical beauty of Phuket.",
    itinerary: [
      { day: 1, title: "Arrival in Phuket", description: "Arrive in Phuket. Meet and greet at airport. Check-in to resort. Evening at Patong Beach & Bangla road." },
      { day: 2, title: "Phi Phi Island Day Trip", description: "Full-day tour to Phi Phi Don & Phi Phi Leh by Speedboat. Snorkel, swim, and view Maya Bay cliffs." },
      { day: 3, title: "Phuket City & Temples", description: "Visit the Big Buddha statue, Wat Chalong temple, and take photos of historical Sino-Portuguese Old Town." },
      { day: 4, title: "Phuket to Bangkok Flight", description: "Fly to Bangkok. Check-in to downtown hotel. Enjoy a luxury dinner cruise on the Chao Phraya River." },
      { day: 5, title: "Bangkok Temples & Shopping", description: "Tour the Grand Palace and Wat Pho temple. Afternoon free for shopping at MBK Center and Siam Paragon." },
      { day: 6, title: "Departure", description: "Transfer to Suvarnabhumi Airport for your departure flight." }
    ],
    includes: ["3 Nights in Phuket, 2 Nights in Bangkok", "Daily buffet breakfast", "Phi Phi island tour with lunch", "Bangkok Dinner Cruise ticket"],
    excludes: ["Domestic/International flights", "National Park entry fees (approx 400 THB)", "Tips"],
    cancellation: [
      { range: "More than 15 days before departure", details: "Full refund." },
      { range: "Less than 15 days", details: "No refund." }
    ],
    trending: false,
    packagesCount: 30,
    difficulty: "Easy",
    season: "Nov - Apr",
    tourType: "Sightseeing Tour"
  },
  {
    id: "t-singapore-disc",
    name: "Singapore Discovery",
    destination: "Singapore",
    duration: "5 Days / 4 Nights",
    maxPeople: 20,
    price: 49999,
    rating: 4.7,
    reviewsCount: 118,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&w=800&q=80"
    ],
    inclusions: ["Hotel", "Meals", "Transfers"],
    highlights: ["Universal Studios Singapore", "Gardens by the Bay Supertree Grove", "Night Safari Adventure", "Sentosa Island Cable Car Ride"],
    overview: "Explore Singapore - the world's greenest and most advanced city-state. Enjoy thrilling theme park rides, futuristic botanical structures, and safe night-time wildlife safaris.",
    itinerary: [
      { day: 1, title: "Arrive in Singapore - Night Safari", description: "Arrive at Changi Airport. Transfer to your hotel. In the evening, explore the world's first nocturnal wildlife park - Singapore Night Safari." },
      { day: 2, title: "City Tour & Gardens by the Bay", description: "Drive past Merlion Park, Chinatown, and Little India. Spend the afternoon exploring the Flower Dome & Cloud Forest at Gardens by the Bay." },
      { day: 3, title: "Universal Studios Sentosa", description: "Spend a full day of excitement at Universal Studios Singapore, riding Battlestar Galactica and Transformers." },
      { day: 4, title: "Sentosa Island Leisure & Wings of Time", description: "Cable car ride to Sentosa. Visit S.E.A. Aquarium. Watch the Wings of Time multi-sensory laser and light show at night." },
      { day: 5, title: "Departure", description: "Morning free for duty-free shopping. Transfer to Changi Airport. Explore the Jewel Changi waterfall before departure." }
    ],
    includes: ["4 Nights in 4-star hotel", "Daily breakfast", "All entry tickets (Gardens, USS, Night Safari, Sentosa)", "Airport transfers by coach"],
    excludes: ["Flights", "Lunch & Dinner", "Visa fee", "Personal expenses"],
    cancellation: [
      { range: "More than 20 days before departure", details: "Full refund minus 10% booking value." },
      { range: "Less than 20 days", details: "100% cancellation penalty." }
    ],
    trending: true,
    packagesCount: 26,
    difficulty: "Easy",
    season: "Year-Round",
    tourType: "Family Vacation"
  }
];

const DEFAULT_HOTELS = [
  {
    id: "h-palm-resort",
    name: "The Palm Resort",
    location: "Dubai, UAE",
    destination: "Dubai",
    rating: 4.8,
    reviewsCount: 312,
    price: 8500,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free Wifi", "Infinity Pool", "Private Beach", "Spa & Wellness"],
    description: "Located on the iconic Palm Jumeirah island, The Palm Resort offers unmatched luxury with stunning views of the Dubai skyline and the Arabian Gulf. Indulge in world-class restaurants, a private white-sand beach, and a holistic wellness spa.",
    rooms: [
      { name: "Deluxe Ocean Room", price: 8500, description: "King bed, balcony with sea views, marble bathroom.", maxGuests: 2 },
      { name: "Executive Suite", price: 15000, description: "Separate living area, access to executive lounge, private jacuzzi.", maxGuests: 3 },
      { name: "Royal Beach Villa", price: 35000, description: "Private pool, direct beach access, dedicated butler service.", maxGuests: 6 }
    ]
  },
  {
    id: "h-goa-beach",
    name: "Goa Beach Resort",
    location: "Goa, India",
    destination: "Goa",
    rating: 4.6,
    reviewsCount: 245,
    price: 5500,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free Wifi", "Swimming Pool", "Beach Access", "Bar & Restro"],
    description: "A tranquil paradise nestled right on Calangute beach, Goa Beach Resort features lush tropical gardens, a massive lagoon-style swimming pool, and vibrant beachfront shacks offering delicious local fish curry and cocktails.",
    rooms: [
      { name: "Garden View Room", price: 5500, description: "Queen bed, terrace opening to tropical gardens, AC.", maxGuests: 2 },
      { name: "Beachfront Premium", price: 8500, description: "Direct beach view, private balcony, complimentary minibar.", maxGuests: 2 },
      { name: "Portuguese Suite", price: 12000, description: "Heritage wooden decor, spacious living room, deep soaking tub.", maxGuests: 4 }
    ]
  },
  {
    id: "h-bali-paradiso",
    name: "Bali Paradiso Resort",
    location: "Bali, Indonesia",
    destination: "Bali",
    rating: 4.8,
    reviewsCount: 198,
    price: 9500,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free Wifi", "Infinity Pool", "Yoga Shala", "Gym & Fitness"],
    description: "Overlooking the lush Ayung River valley in Ubud, Bali Paradiso Resort is an oasis of calm. Built using sustainable local bamboo and stone, this eco-luxury resort offers infinity pools facing rice paddies, daily yoga classes, and organic farm-to-table dining.",
    rooms: [
      { name: "Deluxe Valley Suite", price: 9500, description: "Views of the river valley, outdoor shower, private terrace.", maxGuests: 2 },
      { name: "Pool Villa", price: 16000, description: "Private plunge pool, lounge pavilion, king-sized poster bed.", maxGuests: 2 }
    ]
  },
  {
    id: "h-maldives-lagoon",
    name: "Maldives Lagoon Resort",
    location: "Maldives",
    destination: "Maldives",
    rating: 4.9,
    reviewsCount: 154,
    price: 21500,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free Wifi", "Overwater Pool", "Snorkeling gear", "Private Island"],
    description: "Accessible only by seaplane, this private island luxury resort is surrounded by a crystal-clear blue lagoon. View beautiful coral reefs right through the glass floors of your private overwater villa.",
    rooms: [
      { name: "Sunrise Overwater Villa", price: 21500, description: "Glass floor viewing panel, direct ocean ladder, sunset deck.", maxGuests: 2 },
      { name: "Sunset Pool Villa", price: 32000, description: "Private infinity pool, outdoor circular bath, sunset view.", maxGuests: 3 }
    ]
  },
  {
    id: "h-dubai-marina",
    name: "Dubai Marina Hotel",
    location: "Dubai, UAE",
    destination: "Dubai",
    rating: 4.7,
    reviewsCount: 220,
    price: 7500,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free Wifi", "Rooftop Pool", "Sky Lounge", "Valet Parking"],
    description: "Located in the heart of the energetic Dubai Marina, this modern skyscraper hotel features a stunning rooftop swimming pool, sleek designer rooms, and direct access to the Marina Walk promenade with dozens of restaurants and retail shops.",
    rooms: [
      { name: "Marina View King Room", price: 7500, description: "Panoramic floor-to-ceiling windows showing the marina, smart control panel.", maxGuests: 2 },
      { name: "Two Bedroom Family Suite", price: 14000, description: "Two separate bedrooms, kitchen facilities, private living area.", maxGuests: 5 }
    ]
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
    trip: "Dubai Holiday",
    rating: 5.0,
    text: "Everything was perfectly organized. From the hotels to the local experiences, the entire trip felt effortless. Traviora made our Dubai family escape absolutely memorable!"
  },
  {
    id: 2,
    name: "Neha Verma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    trip: "Bali Escape",
    rating: 4.9,
    text: "Absolutely loved the trip! The team was supportive and everything was beyond our expectations. Ubud volcano hike and luxury villa stay was the absolute highlight."
  },
  {
    id: 3,
    name: "Amit Malhotra",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    trip: "Switzerland Trip",
    rating: 4.8,
    text: "Breathtaking destinations and seamless planning. Traviora made our vacation truly memorable. Swiss rail travel pass worked like a charm."
  },
  {
    id: 4,
    name: "Pooja Iyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    trip: "Maldives Retreat",
    rating: 5.0,
    text: "The stay, the views, the service – everything was just perfect. Can't wait to travel again! The overwater villa recommended by Traviora was pure bliss."
  }
];

const DEFAULT_BLOGS = [
  {
    id: 1,
    category: "Destinations",
    title: "7 places in Kashmir you shouldn't miss",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1566837430420-9ebccd34bcb3?auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    id: 2,
    category: "Travel Guide",
    title: "Best time to visit Bali",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    id: 3,
    category: "Weekend Getaways",
    title: "Weekend escapes from Delhi",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    id: 4,
    category: "Hidden Gems",
    title: "Hidden gems of Himachal",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    url: "#"
  }
];

const DEFAULT_USER = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
  country: "India",
  memberSince: "May 2024"
};

const DEFAULT_BOOKINGS = [
  {
    id: "TRV-10245",
    type: "Tour",
    itemId: "t-dubai-escape",
    itemName: "Dubai Escape",
    date: "2026-09-12",
    amount: 91998, // For 2 Adults
    guests: "2 Adults",
    status: "Confirmed",
    paymentStatus: "Paid"
  },
  {
    id: "TRV-09841",
    type: "Hotel",
    itemId: "h-goa-beach",
    itemName: "Goa Beach Resort",
    date: "2026-04-18",
    amount: 16500, // 3 nights
    guests: "2 Guests",
    status: "Completed",
    paymentStatus: "Paid"
  }
];

// LocalStorage Helper functions
const store = {
  get: (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },
  set: (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  }
};

// Initialize State
if (!localStorage.getItem("traviora_destinations")) store.set("traviora_destinations", DEFAULT_DESTINATIONS);
if (!localStorage.getItem("traviora_tours")) store.set("traviora_tours", DEFAULT_TOURS);
if (!localStorage.getItem("traviora_hotels")) store.set("traviora_hotels", DEFAULT_HOTELS);
if (!localStorage.getItem("traviora_testimonials")) store.set("traviora_testimonials", DEFAULT_TESTIMONIALS);
if (!localStorage.getItem("traviora_blogs")) store.set("traviora_blogs", DEFAULT_BLOGS);
if (!localStorage.getItem("traviora_user")) store.set("traviora_user", DEFAULT_USER);
if (!localStorage.getItem("traviora_bookings")) store.set("traviora_bookings", DEFAULT_BOOKINGS);
if (!localStorage.getItem("traviora_wishlist")) store.set("traviora_wishlist", []);

// Expose standard getters
window.TravioraDb = {
  getDestinations: () => store.get("traviora_destinations", DEFAULT_DESTINATIONS),
  getTours: () => store.get("traviora_tours", DEFAULT_TOURS),
  getHotels: () => store.get("traviora_hotels", DEFAULT_HOTELS),
  getTestimonials: () => store.get("traviora_testimonials", DEFAULT_TESTIMONIALS),
  getBlogs: () => store.get("traviora_blogs", DEFAULT_BLOGS),
  getUser: () => store.get("traviora_user", DEFAULT_USER),
  getBookings: () => store.get("traviora_bookings", DEFAULT_BOOKINGS),
  getWishlist: () => store.get("traviora_wishlist", []),
  
  // Setters/Modifiers
  saveBooking: (booking) => {
    const bookings = store.get("traviora_bookings", DEFAULT_BOOKINGS);
    bookings.unshift(booking);
    store.set("traviora_bookings", bookings);
  },
  
  updateUser: (user) => {
    store.set("traviora_user", user);
  },
  
  addTour: (tour) => {
    const tours = store.get("traviora_tours", DEFAULT_TOURS);
    tours.unshift(tour);
    store.set("traviora_tours", tours);
  },
  
  toggleWishlist: (itemId) => {
    const wishlist = store.get("traviora_wishlist", []);
    const idx = wishlist.indexOf(itemId);
    if (idx === -1) {
      wishlist.push(itemId);
    } else {
      wishlist.splice(idx, 1);
    }
    store.set("traviora_wishlist", wishlist);
    return wishlist;
  },
  
  isInWishlist: (itemId) => {
    const wishlist = store.get("traviora_wishlist", []);
    return wishlist.includes(itemId);
  }
};
