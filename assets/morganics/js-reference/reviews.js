const testimonialStories = [
  {
    name: "Ayesha Malik",
    role: "Home Cook",
    city: "Lahore",
    product: "Maghaz Akhrot",
    rating: 5,
    language: "Roman Urdu",
    image: "/images/reviews/ayesha-kitchen.jpg",
    productUrl: "/products/maghaz-akhrot",
    shortReview: "Fresh walnuts for daily kitchen use.",
    fullReview: "Kitchen mein daily use ke liye walnuts bohat fresh thay. Packing bhi clean thi aur taste bilkul natural laga."
  },
  {
    name: "Ali Raza",
    role: "Track Athlete",
    city: "Lahore",
    product: "Pista Maghaz",
    rating: 5,
    language: "English",
    image: "/images/reviews/ali-athlete.jpg",
    productUrl: "/products/pista-maghaz",
    shortReview: "Clean crunch after practice.",
    fullReview: "I keep this in my training bag now. Fresh crunch, clean taste, and it feels much better than random snacks after practice."
  },
  {
    name: "Sara & Hamza",
    role: "Mother & Son",
    city: "Islamabad",
    product: "Badam Sabat",
    rating: 5,
    language: "Urdu",
    image: "/images/reviews/mother-son-tv-lounge.jpg",
    productUrl: "/products/badam-sabat",
    shortReview: "Family-friendly daily almonds.",
    fullReview: "میرے بیٹے کو بادام بہت پسند آئے۔ صاف پیکنگ، اچھی خوشبو، اور روزانہ استعمال کے لیے بہترین۔"
  },
  {
    name: "Mr. & Mrs. Khan",
    role: "Elder Wellness",
    city: "Rawalpindi",
    product: "Black Munaqqa",
    rating: 4.8,
    language: "Urdu",
    image: "/images/reviews/elder-couple-sofa.jpg",
    productUrl: "/products/black-munaqqa",
    shortReview: "Tea-time wellness routine.",
    fullReview: "شام کی چائے کے ساتھ منقہ استعمال کرتے ہیں۔ ذائقہ تازہ ہے اور پیکنگ بھی بہت نفیس لگی۔"
  },
  {
    name: "Dr. Hira",
    role: "Herbal Nutritionist",
    city: "Karachi",
    product: "Moringa",
    rating: 5,
    language: "English",
    image: "/images/reviews/dr-hira-nutritionist.jpg",
    productUrl: "/products/moringa",
    shortReview: "Simple wellness habit recommendation.",
    fullReview: "For clients who want simple wellness habits, this is easy to recommend. The product feels clean, familiar, and well presented."
  },
  {
    name: "Zain Ahmed",
    role: "Gym Enthusiast",
    city: "Lahore",
    product: "Kajo Roasted",
    rating: 4.9,
    language: "Roman Urdu",
    image: "/images/reviews/zain-gym.jpg",
    productUrl: "/products/kajo-roasted",
    shortReview: "Better than post-gym junk.",
    fullReview: "Gym ke baad heavy junk ki jagah roasted kaju best lagay. Fresh, crunchy aur portion control ke liye perfect."
  },
  {
    name: "Mahnoor Shah",
    role: "Lifestyle Creator",
    city: "Karachi",
    product: "Chia Seeds",
    rating: 4.8,
    language: "Roman Urdu",
    image: "/images/reviews/mahnoor-influencer-camera.jpg",
    productUrl: "/products/chia-seeds",
    shortReview: "Premium on camera and in smoothies.",
    fullReview: "Camera par bhi packaging premium lagti hai, aur smoothie bowl ke sath chia seeds ka texture bhi acha tha."
  },
  {
    name: "Iqra Noor",
    role: "Tennis Player",
    city: "Lahore",
    product: "Pumpkin Seeds",
    rating: 5,
    language: "English",
    image: "/images/reviews/iqra-tennis.jpg",
    productUrl: "/products/pumpkin-seeds",
    shortReview: "Light snack between tennis sessions.",
    fullReview: "I use these between tennis sessions. Light, clean, and easy to carry without feeling like a processed snack."
  },
  {
    name: "Saad",
    role: "School Student",
    city: "Lahore",
    product: "Sogi Small Mewa",
    rating: 4.9,
    language: "Roman Urdu",
    image: "/images/reviews/saad-school-boy.jpg",
    productUrl: "/products/sogi-small-mewa",
    shortReview: "Perfect for school lunch box.",
    fullReview: "School lunch box ke liye mix mewa perfect hai. Mama roz thora pack kar deti hain aur mujhe taste bhi pasand hai."
  },
  {
    name: "Umar Farooq",
    role: "Office Professional",
    city: "Islamabad",
    product: "Maghaz American",
    rating: 4.8,
    language: "Urdu",
    image: "/images/reviews/umar-office.jpg",
    productUrl: "/products/maghaz-american",
    shortReview: "Office tea-time essential.",
    fullReview: "دفتر میں چائے کے ساتھ بادام رکھتا ہوں۔ صاف پیک، اچھا ذائقہ، اور روزمرہ کے لیے مناسب۔"
  }
];

window.testimonialStories = testimonialStories;
window.MORGANICS_REVIEWS = testimonialStories.map(story => ({
  ...story,
  review: story.fullReview
}));

const customerStories = [
  {
    id: "ayesha-akhrot",
    name: "Ayesha Malik",
    city: "Lahore",
    product: "Maghaz Akhrot",
    ritual: "Daily Wellness",
    rating: 5.0,
    quote: "Clean taste. Fresh feel. Daily use.",
    image: "/images/reviews/ayesha-kitchen.jpg",
    productUrl: "/products/maghaz-akhrot",
    mood: { glow: "warm-cream", accent: "#DFA524" }
  },
  {
    id: "ali-pista",
    name: "Ali Raza",
    city: "Lahore",
    product: "Pista Maghaz",
    ritual: "Pre-Workout Fuel",
    rating: 4.9,
    quote: "A clean snack before training, without feeling heavy.",
    image: "/images/reviews/ali-athlete.jpg",
    productUrl: "/products/pista-maghaz",
    mood: { glow: "deep-gym-green", accent: "#DFA524" }
  },
  {
    id: "sara-badam",
    name: "Sara & Hamza",
    city: "Islamabad",
    product: "Badam Sabat",
    ritual: "Family Nutrition",
    rating: 4.8,
    quote: "A simple daily habit my family actually enjoys.",
    image: "/images/reviews/mother-son.jpg",
    productUrl: "/products/badam-sabat",
    mood: { glow: "family-amber", accent: "#DFA524" }
  },
  {
    id: "khan-munaqqa",
    name: "Mr. & Mrs. Khan",
    city: "Rawalpindi",
    product: "Black Munaqqa",
    ritual: "Tea-Time Vitality",
    rating: 4.8,
    quote: "Soft, sweet and perfect with our evening tea routine.",
    image: "/images/reviews/elder-couple.jpg",
    productUrl: "/products/black-munaqqa",
    mood: { glow: "tea-brown", accent: "#DFA524" }
  },
  {
    id: "zain-kajo",
    name: "Zain Ahmed",
    city: "Lahore",
    product: "Kajo Roasted",
    ritual: "Strength & Stamina",
    rating: 4.9,
    quote: "Better than random post-gym snacking.",
    image: "/images/reviews/zain-gym.jpg",
    productUrl: "/products/kajo-roasted",
    mood: { glow: "fitness-green", accent: "#DFA524" }
  },
  {
    id: "mahnoor-chia",
    name: "Mahnoor Shah",
    city: "Karachi",
    product: "Chia Seeds",
    ritual: "Gut & Wellness",
    rating: 4.8,
    quote: "Looks premium on camera and works perfectly in my smoothie bowl.",
    image: "/images/reviews/mahnoor-creator.jpg",
    productUrl: "/products/chia-seeds",
    mood: { glow: "creator-warmth", accent: "#DFA524" }
  },
  {
    id: "iqra-pumpkin",
    name: "Iqra Noor",
    city: "Lahore",
    product: "Pumpkin Seeds",
    ritual: "Clean Energy",
    rating: 5.0,
    quote: "Light, clean and easy between tennis sessions.",
    image: "/images/reviews/iqra-tennis.jpg",
    productUrl: "/products/pumpkin-seeds",
    mood: { glow: "outdoor-green", accent: "#DFA524" }
  }
];

window.customerStories = customerStories;
