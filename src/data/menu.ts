export interface MenuItem {
  id: string;
  name: string;
  description: string;
  tags: string[];
  price: string;
  priceNumeric: string;
  outlet: string;
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isJain: boolean;
  isGlutenFree: boolean;
  image?: string;
}

export const menuItems: MenuItem[] = [
  {
    "id": "continental-breakfast-buffet",
    "name": "Continental Breakfast Buffet",
    "description": "Live counters: eggs to order, pastries, cereals, fresh fruit, breads.",
    "tags": [
      "V",
      "GFA"
    ],
    "price": "INR 1,200",
    "priceNumeric": "1200",
    "outlet": "azure-terrace",
    "category": "Breakfast",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "south-indian-breakfast-buffet",
    "name": "South Indian Breakfast Buffet",
    "description": "Idli, vada, dosa, upma, sambar and chutneys.",
    "tags": [
      "V",
      "VG-A",
      "GF"
    ],
    "price": "INR 1,200",
    "priceNumeric": "1200",
    "outlet": "azure-terrace",
    "category": "Breakfast",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "masala-dosa",
    "name": "Masala Dosa",
    "description": "Crisp rice-lentil crepe, spiced potato filling, sambar, coconut chutney.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 650",
    "priceNumeric": "650",
    "outlet": "azure-terrace",
    "category": "Breakfast",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true,
    "image": "/Images/Dining/DIN-05_Masala_Dosa_-_signature_dish_photo.jpg"
  },
  {
    "id": "idli-vada-combo",
    "name": "Idli-Vada Combo",
    "description": "Steamed rice cakes and lentil doughnuts with sambar and chutney.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 550",
    "priceNumeric": "550",
    "outlet": "azure-terrace",
    "category": "Breakfast",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "classic-eggs-benedict",
    "name": "Classic Eggs Benedict",
    "description": "Poached eggs, hollandaise, English muffin, choice of ham or spinach.",
    "tags": [
      "NV/V",
      "E",
      "D",
      "G"
    ],
    "price": "INR 750",
    "priceNumeric": "750",
    "outlet": "azure-terrace",
    "category": "Breakfast",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "avocado-toast",
    "name": "Avocado Toast",
    "description": "Multigrain sourdough, smashed avocado, cherry tomato, chilli flakes.",
    "tags": [
      "V",
      "VG-A",
      "G"
    ],
    "price": "INR 700",
    "priceNumeric": "700",
    "outlet": "azure-terrace",
    "category": "Breakfast",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "fresh-juice-smoothie-bar",
    "name": "Fresh Juice & Smoothie Bar",
    "description": "Seasonal fruit or vegetable juice / smoothie, made to order.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 350",
    "priceNumeric": "350",
    "outlet": "azure-terrace",
    "category": "Breakfast",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "artisanal-pancake-stack",
    "name": "Artisanal Pancake Stack",
    "description": "Buttermilk pancakes, maple syrup, seasonal berries.",
    "tags": [
      "V",
      "E",
      "D",
      "G"
    ],
    "price": "INR 600",
    "priceNumeric": "600",
    "outlet": "azure-terrace",
    "category": "Breakfast",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "butter-chicken",
    "name": "Butter Chicken",
    "description": "Tandoor-roasted chicken in a tomato-butter gravy, served with naan.",
    "tags": [
      "NV",
      "D",
      "G",
      "Medium"
    ],
    "price": "INR 1,100",
    "priceNumeric": "1100",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false,
    "image": "/Images/Dining/DIN-06_Butter_Chicken_-_signature_dish_photo.jpg"
  },
  {
    "id": "paneer-tikka-masala",
    "name": "Paneer Tikka Masala",
    "description": "Chargrilled cottage cheese in a spiced tomato-cashew gravy.",
    "tags": [
      "V",
      "J",
      "D",
      "N",
      "Medium"
    ],
    "price": "INR 950",
    "priceNumeric": "950",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": true,
    "isGlutenFree": false
  },
  {
    "id": "dal-makhani",
    "name": "Dal Makhani",
    "description": "Slow-cooked black lentils, butter and cream. Vegan version available without butter/cream.",
    "tags": [
      "V",
      "VG-A",
      "D"
    ],
    "price": "INR 650",
    "priceNumeric": "650",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "hakka-noodles-vegetable",
    "name": "Hakka Noodles - Vegetable",
    "description": "Wok-tossed noodles with seasonal vegetables, soy and garlic.",
    "tags": [
      "V",
      "VG",
      "G",
      "S"
    ],
    "price": "INR 750",
    "priceNumeric": "750",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "hakka-noodles-chicken",
    "name": "Hakka Noodles - Chicken",
    "description": "Wok-tossed noodles with chicken, soy and garlic.",
    "tags": [
      "NV",
      "G",
      "S"
    ],
    "price": "INR 900",
    "priceNumeric": "900",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "margherita-pizza",
    "name": "Margherita Pizza",
    "description": "Wood-fired, San Marzano tomato, buffalo mozzarella, basil.",
    "tags": [
      "V",
      "D",
      "G"
    ],
    "price": "INR 850",
    "priceNumeric": "850",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "grilled-salmon",
    "name": "Grilled Salmon",
    "description": "Herb-butter grilled salmon, seasonal vegetables, lemon beurre blanc.",
    "tags": [
      "NV",
      "F",
      "D",
      "Mild"
    ],
    "price": "INR 1,650",
    "priceNumeric": "1650",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "vegan-buddha-bowl",
    "name": "Vegan Buddha Bowl",
    "description": "Quinoa, roasted vegetables, chickpeas, tahini dressing.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 800",
    "priceNumeric": "800",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "tandoori-platter-mixed-grill",
    "name": "Tandoori Platter (Mixed Grill)",
    "description": "Chicken tikka, seekh kebab, tandoori prawns, mint chutney.",
    "tags": [
      "NV",
      "D",
      "Sh",
      "Spicy"
    ],
    "price": "INR 1,450",
    "priceNumeric": "1450",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false,
    "image": "/Images/Dining/DIN-07_Tandoori_Platter_-_signature_dish_photo.jpg"
  },
  {
    "id": "jain-thali",
    "name": "Jain Thali",
    "description": "Seasonal Jain-style vegetable curries, dal, rice, roti, salad - no onion or garlic.",
    "tags": [
      "V",
      "J",
      "VG-A"
    ],
    "price": "INR 1,050",
    "priceNumeric": "1050",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": true,
    "isGlutenFree": false
  },
  {
    "id": "kids-menu-combo",
    "name": "Kids' Menu Combo",
    "description": "Choice of mini pizza, pasta or chicken fingers with fries and juice.",
    "tags": [
      "V/NV",
      "G",
      "D"
    ],
    "price": "INR 600",
    "priceNumeric": "600",
    "outlet": "azure-terrace",
    "category": "A La Carte",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "tandoori-platter-trio",
    "name": "Tandoori Platter Trio",
    "description": "Chicken tikka, paneer tikka and tandoori prawns on a sizzling plate.",
    "tags": [
      "NV",
      "D",
      "Sh",
      "Spicy"
    ],
    "price": "INR 1,650",
    "priceNumeric": "1650",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "awadhi-galouti-kebab",
    "name": "Awadhi Galouti Kebab",
    "description": "Minced lamb kebab with 20+ spices, warqi paratha.",
    "tags": [
      "NV",
      "D",
      "G",
      "Medium"
    ],
    "price": "INR 1,300",
    "priceNumeric": "1300",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "rogan-josh",
    "name": "Rogan Josh",
    "description": "Slow-braised lamb curry in a Kashmiri chilli and yoghurt gravy.",
    "tags": [
      "NV",
      "D",
      "Spicy"
    ],
    "price": "INR 1,400",
    "priceNumeric": "1400",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "dal-bukhara",
    "name": "Dal Bukhara",
    "description": "Overnight slow-cooked black lentils finished with cream.",
    "tags": [
      "V",
      "D"
    ],
    "price": "INR 700",
    "priceNumeric": "700",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "hyderabadi-biryani-vegetable",
    "name": "Hyderabadi Biryani - Vegetable",
    "description": "Layered basmati rice, seasonal vegetables, saffron, mint raita.",
    "tags": [
      "V",
      "VG-A",
      "Medium"
    ],
    "price": "INR 950",
    "priceNumeric": "950",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "hyderabadi-biryani-chicken",
    "name": "Hyderabadi Biryani - Chicken",
    "description": "Layered basmati rice, marinated chicken, saffron, mint raita.",
    "tags": [
      "NV",
      "D",
      "Medium"
    ],
    "price": "INR 1,150",
    "priceNumeric": "1150",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "hyderabadi-biryani-mutton",
    "name": "Hyderabadi Biryani - Mutton",
    "description": "Layered basmati rice, slow-cooked mutton, saffron, mint raita.",
    "tags": [
      "NV",
      "D",
      "Spicy"
    ],
    "price": "INR 1,450",
    "priceNumeric": "1450",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "kerala-fish-curry",
    "name": "Kerala Fish Curry",
    "description": "Coconut-based curry with local river fish and curry leaf tempering.",
    "tags": [
      "NV",
      "GF",
      "F",
      "Spicy"
    ],
    "price": "INR 1,350",
    "priceNumeric": "1350",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "sarson-ka-saag-with-makki-roti",
    "name": "Sarson ka Saag with Makki Roti",
    "description": "Mustard-greens curry with maize flatbread and white butter.",
    "tags": [
      "V",
      "GF",
      "D"
    ],
    "price": "INR 800",
    "priceNumeric": "800",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "tandoori-vegetable-skewers",
    "name": "Tandoori Vegetable Skewers",
    "description": "Chargrilled seasonal vegetables marinated in yoghurt and spices.",
    "tags": [
      "V",
      "J-A",
      "GF",
      "D",
      "Medium"
    ],
    "price": "INR 750",
    "priceNumeric": "750",
    "outlet": "ember-spice",
    "category": "Dinner Grills & Tandoor",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "rkpr-signature-high-tea",
    "name": "RKPR Signature High Tea (for two)",
    "description": "Assorted finger sandwiches, scones, pastries, choice of tea or coffee.",
    "tags": [
      "V",
      "D",
      "G",
      "E"
    ],
    "price": "INR 1,800",
    "priceNumeric": "1800",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "assorted-loose-leaf-teas",
    "name": "Assorted Loose-Leaf Teas",
    "description": "Darjeeling, Assam, Nilgiri, chamomile, peppermint, green tea.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 400",
    "priceNumeric": "400",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "artisanal-coffee",
    "name": "Artisanal Coffee",
    "description": "Espresso-based coffee from the capsule/barista counter.",
    "tags": [
      "V",
      "GF",
      "D on request"
    ],
    "price": "INR 350-450",
    "priceNumeric": "350",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "club-sandwich",
    "name": "Club Sandwich",
    "description": "Triple-decker chicken or vegetable club with fries.",
    "tags": [
      "NV/V",
      "G",
      "D",
      "E"
    ],
    "price": "INR 700",
    "priceNumeric": "700",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "soup-of-the-day",
    "name": "Soup of the Day",
    "description": "Chef's seasonal soup with artisanal bread.",
    "tags": [
      "V",
      "VG-A",
      "G on request"
    ],
    "price": "INR 450",
    "priceNumeric": "450",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "new-york-cheesecake",
    "name": "New York Cheesecake",
    "description": "Classic baked cheesecake with berry compote.",
    "tags": [
      "V",
      "D",
      "E",
      "G"
    ],
    "price": "INR 550",
    "priceNumeric": "550",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "tiramisu",
    "name": "Tiramisu",
    "description": "Espresso-soaked sponge, mascarpone, cocoa.",
    "tags": [
      "V",
      "D",
      "E",
      "G"
    ],
    "price": "INR 550",
    "priceNumeric": "550",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "mango-cream-delice",
    "name": "Mango Cream Delice",
    "description": "Seasonal mango mousse, sponge, tropical fruit.",
    "tags": [
      "V",
      "GFA",
      "D",
      "E"
    ],
    "price": "INR 550",
    "priceNumeric": "550",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "assorted-pastry-basket",
    "name": "Assorted Pastry Basket",
    "description": "Chef's daily selection of pastries and cookies.",
    "tags": [
      "V",
      "D",
      "E",
      "G",
      "N"
    ],
    "price": "INR 650",
    "priceNumeric": "650",
    "outlet": "the-cedar-lounge",
    "category": "Tea, Coffee & Desserts",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "valley-sunset",
    "name": "Valley Sunset",
    "description": "Bourbon, honey, orange bitters, smoked garnish.",
    "tags": [
      "Contains alcohol"
    ],
    "price": "INR 950",
    "priceNumeric": "950",
    "outlet": "summit-bar",
    "category": "Signature Cocktails",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "br-hills-mule",
    "name": "BR Hills Mule",
    "description": "Vodka, house ginger beer, lime, mint.",
    "tags": [
      "Contains alcohol"
    ],
    "price": "INR 850",
    "priceNumeric": "850",
    "outlet": "summit-bar",
    "category": "Signature Cocktails",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "cedar-smoke-old-fashioned",
    "name": "Cedar Smoke Old Fashioned",
    "description": "Whisky, demerara, aromatic bitters, cedar smoke.",
    "tags": [
      "Contains alcohol"
    ],
    "price": "INR 1,000",
    "priceNumeric": "1000",
    "outlet": "summit-bar",
    "category": "Signature Cocktails",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "forest-berry-fizz",
    "name": "Forest Berry Fizz",
    "description": "Gin, mixed berry shrub, soda, lemon.",
    "tags": [
      "Contains alcohol"
    ],
    "price": "INR 900",
    "priceNumeric": "900",
    "outlet": "summit-bar",
    "category": "Signature Cocktails",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "aranya-espresso-martini",
    "name": "Aranya Espresso Martini",
    "description": "Vodka, coffee liqueur, fresh espresso.",
    "tags": [
      "Contains alcohol",
      "D optional"
    ],
    "price": "INR 950",
    "priceNumeric": "950",
    "outlet": "summit-bar",
    "category": "Signature Cocktails",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "virgin-valley-cooler",
    "name": "Virgin Valley Cooler",
    "description": "Fresh cucumber, mint, lime, soda.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 450",
    "priceNumeric": "450",
    "outlet": "summit-bar",
    "category": "Mocktails",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "sunrise-spritz",
    "name": "Sunrise Spritz",
    "description": "Orange, passionfruit, ginger ale.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 450",
    "priceNumeric": "450",
    "outlet": "summit-bar",
    "category": "Mocktails",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "berry-basil-smash",
    "name": "Berry Basil Smash",
    "description": "Mixed berries, basil, lemonade.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 450",
    "priceNumeric": "450",
    "outlet": "summit-bar",
    "category": "Mocktails",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true
  },
  {
    "id": "single-malt-whisky",
    "name": "Single Malt Whisky (30 ml)",
    "description": "Selection from India, Scotland and Japan.",
    "tags": [
      "Contains alcohol"
    ],
    "price": "INR 650-1,800",
    "priceNumeric": "650",
    "outlet": "summit-bar",
    "category": "Spirits, Wine & Bar Snacks",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "house-wine",
    "name": "House Wine (glass / bottle)",
    "description": "Curated red, white and sparkling by the glass or bottle.",
    "tags": [
      "Contains alcohol"
    ],
    "price": "INR 650 / 3,200",
    "priceNumeric": "650",
    "outlet": "summit-bar",
    "category": "Spirits, Wine & Bar Snacks",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "craft-beer",
    "name": "Craft Beer",
    "description": "Local and imported bottled and draught beer.",
    "tags": [
      "Contains alcohol",
      "G"
    ],
    "price": "INR 450-650",
    "priceNumeric": "450",
    "outlet": "summit-bar",
    "category": "Spirits, Wine & Bar Snacks",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "loaded-nachos",
    "name": "Loaded Nachos",
    "description": "Corn chips, cheese sauce, jalapeno, salsa, sour cream.",
    "tags": [
      "V",
      "D",
      "G"
    ],
    "price": "INR 650",
    "priceNumeric": "650",
    "outlet": "summit-bar",
    "category": "Spirits, Wine & Bar Snacks",
    "isVegetarian": true,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "chicken-wings",
    "name": "Chicken Wings (6 pc)",
    "description": "Choice of tandoori dry-rub or spicy buffalo glaze.",
    "tags": [
      "NV",
      "Spicy"
    ],
    "price": "INR 750",
    "priceNumeric": "750",
    "outlet": "summit-bar",
    "category": "Spirits, Wine & Bar Snacks",
    "isVegetarian": false,
    "isVegan": false,
    "isJain": false,
    "isGlutenFree": false
  },
  {
    "id": "peri-peri-fries",
    "name": "Peri-Peri Fries",
    "description": "Crisp fries tossed in peri-peri seasoning.",
    "tags": [
      "V",
      "VG",
      "GF"
    ],
    "price": "INR 400",
    "priceNumeric": "400",
    "outlet": "summit-bar",
    "category": "Spirits, Wine & Bar Snacks",
    "isVegetarian": true,
    "isVegan": true,
    "isJain": false,
    "isGlutenFree": true
  }
];
