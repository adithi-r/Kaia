// Define an array to store user-specified allergens
let userAllergens = [];

// Function to update user allergens based on user input
function updateUserAllergens() {
    const userInput = prompt("Enter your allergens separated by commas (e.g., peanuts, shellfish):");
    if (userInput) {
        userAllergens = userInput.split(",").map(keyword => keyword.trim().toLowerCase());
        // Refresh badges after updating allergens
        refreshBadges();
    }
}

// Function to check if a product contains any user-specified allergens
function containsAllergyFoods(product) {
    const allergyKeywords = userAllergens;
    const productNameElement = product.querySelector('.a-size-base-plus.a-color-base.a-text-normal');
    const productDescriptionElement = product.querySelector('.a-row.a-size-small .a-size-base');
    if (!productNameElement || !productDescriptionElement) return false;

    const productName = productNameElement.innerText.toLowerCase();
    const productDescription = productDescriptionElement.innerText.toLowerCase();

    for (const keyword of allergyKeywords) {
        if (productName.includes(keyword) || productDescription.includes(keyword)) {
            return true;
        }
    }
    return false;
}

// Function to calculate eco score of a product
function calculateEcoScore(product) {
    const productNameElement = product.querySelector('.a-size-base-plus.a-color-base.a-text-normal');
    const productDescriptionElement = product.querySelector('.a-row.a-size-small .a-size-base');
    if (!productNameElement || !productDescriptionElement) return 0;

    const productName = productNameElement.innerText.toLowerCase();
    const productDescription = productDescriptionElement.innerText.toLowerCase();

    const ecoKeywords = [
        // Foods
        'organic', 'local', 'sustainable agriculture', 'fair trade', 'non-GMO',
        'natural', 'plant-based', 'grass-fed', 'free-range', 'cage-free',
        'locally sourced', 'biodynamic', 'permaculture', 'no pesticides', 'sustainable',
        // Clothing
        'eco-friendly', 'sustainable', 'recycled', 'biodegradable', 'upcycled',
        'organic cotton', 'hemp', 'bamboo', 'linen', 'fair trade',
        'low impact dye', 'vegan leather', 'reclaimed materials',
        // General
        'renewable energy', 'carbon neutral', 'energy efficient', 'zero waste',
        'recyclable', 'compostable', 'water efficient', 'low emissions',
        'reusable', 'repairable', 'locally made', 'ethically sourced',
        //Materials
        'tencel', 'lyocell', 'recycled polyster'
    ];

    const ecoScoreMap = {
        // Foods
        'organic': 2,
        'local': 1,
        'sustainable agriculture': 2,
        'fair trade': 2,
        'non-GMO': 1,
        'natural': 2,
        'plant-based': 1,
        'grass-fed': 1,
        'free-range': 1,
        'cage-free': 1,
        'locally sourced': 1,
        'biodynamic': 2,
        'permaculture': 2,
        'no pesticides': 1,
        // Clothing
        'eco-friendly': 2,
        'sustainable': 2,
        'recycled': 1,
        'biodegradable': 1,
        'upcycled': 1,
        'organic cotton': 2,
        'hemp': 2,
        'bamboo': 1,
        'linen': 1,
        'fair trade': 2,
        'low impact dye': 1,
        'vegan leather': 1,
        'reclaimed materials': 1,
        // General
        'renewable energy': 2,
        'carbon neutral': 2,
        'energy efficient': 2,
        'zero waste': 2,
        'recyclable': 1,
        'compostable': 1,
        'water efficient': 1,
        'low emissions': 1,
        'reusable': 1,
        'repairable': 1,
        'locally made': 1,
        'ethically sourced': 2,
        'tencel': 2,
        'lyocell': 2,
        'polyster': 1
    };
    let ecoScore = 0;

    for (const keyword of ecoKeywords) {
        if (productName.includes(keyword) || productDescription.includes(keyword)) {
            ecoScore += ecoScoreMap[keyword] || 1; // Default score is 1 if not specified
        }
    }
    return ecoScore;
}

// Function to check if a product is resource intensive
function isResourceIntensive(product) {
    const productNameElement = product.querySelector('.a-size-base-plus.a-color-base.a-text-normal');
    const productDescriptionElement = product.querySelector('.a-row.a-size-small .a-size-base');
    if (!productNameElement || !productDescriptionElement) return false;

    const productName = productNameElement.innerText.toLowerCase();
    const productDescription = productDescriptionElement.innerText.toLowerCase();

    // Check if product name or description contains keywords indicating resource-intensive products
    const resourceIntensiveKeywords = ['formal wear', 'delicates', 'luxury', 'couture', 'handmade'];
    for (const keyword of resourceIntensiveKeywords) {
        if (productName.includes(keyword) || productDescription.includes(keyword)) {
            return true;
        }
    }
    return false;
}

// Function to add badges on hover with updated allergen check
function addBadgesOnHover(product) {
    product.addEventListener('mouseenter', function () {
        const badges = [];

        const ecoScore = calculateEcoScore(product);
        if (ecoScore > 0) {
            const ecoBadge = document.createElement('span');
            ecoBadge.textContent = 'Eco Score: ' + ecoScore;
            ecoBadge.classList.add('eco-score-badge');
            badges.push(ecoBadge);
        }

        if (containsAllergyFoods(product)) {
            const allergyBadge = document.createElement('span');
            allergyBadge.textContent = 'Contains Allergens';
            allergyBadge.classList.add('allergy-badge');
            badges.push(allergyBadge);
        }

        if (isResourceIntensive(product)) {
            const resourceIntensiveBadge = document.createElement('span');
            resourceIntensiveBadge.textContent = 'Resource Intensive';
            resourceIntensiveBadge.classList.add('resource-intensive-badge');
            badges.push(resourceIntensiveBadge);
        }

        for (const badge of badges) {
            product.appendChild(badge);
        }
    });

    product.addEventListener('mouseleave', function () {
        const existingBadges = product.querySelectorAll('.eco-score-badge, .allergy-badge, .resource-intensive-badge');
        existingBadges.forEach(badge => {
            badge.remove();
        });
    });
}

// Refresh badges on all products
function refreshBadges() {
    document.querySelectorAll('.s-result-item').forEach(product => {
        addBadgesOnHover(product);
    });
}

// Call function to update user allergens when the extension is loaded
updateUserAllergens();