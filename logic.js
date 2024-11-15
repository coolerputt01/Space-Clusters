// Common variables
const planetCard = document.querySelector('.planet-card');
const planetView = document.querySelector('.planet-view');
const planetModelHolder = document.querySelector('.planet-model');
const text = document.querySelector('.planet-view-text');
const cancelBtn = document.querySelector('.cancel');

// Audio setup
const SFX = new Audio('select.wav');

// Play sound effect
function playSound() {
  SFX.currentTime = 0; // Reset audio to the start
  SFX.play();
}

// Planet data
const planets = [
  {
    id: '1',
    name: 'Earth',
    description: 'Earth, our blue planet, nurtures diverse life with lush forests, vast oceans, and breathable air. Its magnetic field and perfect Sun distance make it truly unique.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_E4gfrw-53h0_umMZ8F80R3f1sCH4IZoWAUuqAr2kHA&s',
    modelFile: 'Earth1.glb',
  },
  {
    id: '2',
    name: 'Mars',
    description: 'Mars, the fourth planet from the Sun, is a cold, desert-like world with a thin atmosphere. Known as the "Red Planet," it has polar ice caps and potential signs of ancient water.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9FJxxOlJ6aMKCqaiSDZ_0mlPeQyCcbxSDgLa4aWpp3t64jnkFgl_oGY&s',
    modelFile: 'mars.glb',
  },
  {
    id: '3',
    name: 'Venus',
    description: 'Venus, the second planet from the Sun, is a hot, rocky world with thick clouds of toxic gases. Its intense greenhouse effect makes it the hottest planet in our solar system.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiDBA1cxOtMPOqLIYvjjZUY1LulenCnZY42A&s',
    modelFile: 'Venus.glb',
  },
  {
    id: '4',
    name: 'Mercury',
    description: 'Mercury, the closest planet to the Sun, is a small, rocky world with extreme temperature swings. It has no atmosphere to retain heat, making its days blistering and nights freezing.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIYmveK_xW7Dj-PXRBA7XuPGqBNE-F8r0jiZZaOKCeg&s',
    modelFile: 'Mercury.glb',
  },
  {
    id: '5',
    name: 'Jupiter',
    description: 'Jupiter, the largest planet in our solar system, is a gas giant with a thick atmosphere of hydrogen and helium. Known for its Great Red Spot, it has at least 79 moons.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTlZVqtz0Zrhgm2920sosygtNo83Cdx-6IMzM6H60Qg&s',
    modelFile: 'Jupiter.glb',
  },
  {
    id: '6',
    name: 'Saturn',
    description: 'Saturn, the sixth planet from the Sun, is a gas giant famous for its stunning ring system made of ice and rock particles. It has over 80 moons, including Titan.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jfhJcNUpjtiLBu6efE_8mwxgoab8YEG6WIGfQXzJpg&s',
    modelFile: 'Saturn.glb',
  },
  {
    id: '7',
    name: 'Uranus',
    description: 'Uranus, the seventh planet from the Sun, is an icy gas giant with a pale blue color due to methane in its atmosphere. It has a unique sideways rotation and faint rings.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqydk5sKd5VKTlc6dC6kwWWgnGXLOE0tT6xFAlwU-_KQ&s',
    modelFile: 'Uranus.glb',
  },
  {
    id: '8',
    name: 'Neptune',
    description: 'Neptune, the eighth and farthest planet from the Sun, is a deep blue gas giant with powerful storms and strong winds. It has faint rings and 14 known moons, including Triton.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRXtP6Z2xk3W-ckju8PEEs9XB-V4Xmke6EvSykomYXUQ&s',
    modelFile: 'Neptune.glb',
  },
  // Add more planets as needed...
];

// Update planet view
function updatePlanetView(planet) {
  playSound();
  text.innerText = planet.name;
  planetCard.innerHTML = `
    <img src="${planet.image}" alt="${planet.name}" class="planet-img">
    <div class="planet-info">${planet.description}</div>
  `;

  planetCard.addEventListener('click', () => loadModel(planet.modelFile));
}

// Load 3D model
function loadModel(file) {
  playSound();
  planetView.style.display = 'flex';

  // Clear existing content
  planetModelHolder.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 700, 5000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(200, 330);
  planetModelHolder.appendChild(renderer.domElement);
  camera.position.z = 2200;

  // Light setup
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(50, 5, 50).normalize();
  scene.add(directionalLight);

  let model;
  const loader = new THREE.GLTFLoader();
  loader.load(
    file,
    (gltf) => {
      model = gltf.scene;
      scene.add(model);
      model.position.set(0, 0, 0);
      model.traverse((node) => {
        if (node.isMesh) node.material.side = THREE.DoubleSide;
      });
    },
    (xhr) => console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`),
    (error) => console.error('An error happened:', error.message)
  );

  function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}

// Cancel button functionality
cancelBtn.addEventListener('click', () => {
  planetView.style.display = 'none';
});

// Add event listeners for planet buttons
const leftBtn = document.querySelector('.ll')
const rightBtn = document.querySelector('.rr')
// Track the currently displayed planet index
let currentIndex = 0;

// Update planet view based on the current index
function showCurrentPlanet() {
  const planet = planets[currentIndex];
  updatePlanetView(planet);
}

// Add event listeners for navigation buttons
leftBtn.addEventListener('click', () => {
  playSound();
  currentIndex = (currentIndex - 1 + planets.length) % planets.length; // Loop back to the last planet if at the first
  showCurrentPlanet();
});

rightBtn.addEventListener('click', () => {
  playSound();
  currentIndex = (currentIndex + 1) % planets.length; // Loop back to the first planet if at the last
  showCurrentPlanet();
});

// Initialize with the first planet
showCurrentPlanet();