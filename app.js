const products = [
  { id: 1, name: 'Aurora Lamp', category: 'Home', price: 89, badge: 'Best Seller', image: 'assets/lamp.svg' },
  { id: 2, name: 'Nova Watch', category: 'Wearables', price: 149, badge: 'New Drop', image: 'assets/watch.svg' },
  { id: 3, name: 'Pulse Speaker', category: 'Audio', price: 129, badge: 'Trending', image: 'assets/speaker.svg' },
  { id: 4, name: 'Orbit Bag', category: 'Travel', price: 79, badge: 'Eco Pick', image: 'assets/bag.svg' }
];

const state = {
  route: window.location.hash || '#/',
  cartCount: 0
};

const app = document.getElementById('app');
const cartBadge = document.getElementById('cart-badge');

function renderHome() {
  return `
    <section class="hero">
      <div>
        <span class="badge">Curated essentials for modern living</span>
        <h1>Discover design-first products that feel premium.</h1>
        <p>NovaCart brings together stylish home, audio, and wearable picks with clear pricing and a fast, fluid experience.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" data-route="#/products">Browse Products</button>
          <button class="btn btn-secondary" data-route="#/about">Learn More</button>
        </div>
        <div class="stats">
          <div class="stat"><strong>4.9/5</strong><span>Customer love</span></div>
          <div class="stat"><strong>24h</strong><span>Dispatch promise</span></div>
          <div class="stat"><strong>Free</strong><span>Express shipping</span></div>
        </div>
      </div>
      <img src="assets/hero.svg" alt="Featured collection illustration" />
    </section>

    <h2 class="section-title">Featured picks</h2>
    <div class="grid products-grid">
      ${products.slice(0, 3).map(product => `
        <article class="card">
          <img src="${product.image}" alt="${product.name}" />
          <span class="badge">${product.badge}</span>
          <h3>${product.name}</h3>
          <p class="meta">${product.category}</p>
          <div class="price-row">
            <span class="price">$${product.price}</span>
            <button class="btn btn-primary" data-add="${product.id}">Add to Cart</button>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderProducts() {
  return `
    <h2 class="section-title">Full catalog</h2>
    <div class="grid products-grid">
      ${products.map(product => `
        <article class="card">
          <img src="${product.image}" alt="${product.name}" />
          <span class="badge">${product.badge}</span>
          <h3>${product.name}</h3>
          <p class="meta">${product.category}</p>
          <div class="price-row">
            <span class="price">$${product.price}</span>
            <button class="btn btn-primary" data-add="${product.id}">Add to Cart</button>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderAbout() {
  return `
    <section class="info-panel">
      <h2 class="section-title">Why NovaCart stands out</h2>
      <div class="info-grid">
        <div><h3>Fast discovery</h3><p>Simple navigation and clear product stories make browsing effortless.</p></div>
        <div><h3>Premium quality</h3><p>Every product is handpicked for aesthetics, durability, and everyday value.</p></div>
        <div><h3>Reliable delivery</h3><p>Orders ship quickly with transparent updates and support from day one.</p></div>
      </div>
    </section>
  `;
}

function renderContact() {
  return `
    <section class="contact-panel">
      <h2 class="section-title">Contact our team</h2>
      <p>Need help choosing the right product or want a tailored recommendation?</p>
      <form>
        <input type="text" placeholder="Your name" />
        <input type="email" placeholder="Your email" />
        <textarea placeholder="Tell us what you need"></textarea>
        <button class="btn btn-primary" type="button">Send Message</button>
      </form>
    </section>
  `;
}

function render() {
  const route = state.route;
  let html = '';

  if (route === '#/products') html = renderProducts();
  else if (route === '#/about') html = renderAbout();
  else if (route === '#/contact') html = renderContact();
  else html = renderHome();

  app.innerHTML = html;
  cartBadge.textContent = `${state.cartCount} item${state.cartCount === 1 ? '' : 's'} in cart`;
  document.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-route');
      if (target) {
        state.route = target;
        window.location.hash = target;
        render();
      }
    });
  });

  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.cartCount += 1;
      render();
    });
  });
}

window.addEventListener('hashchange', () => {
  state.route = window.location.hash || '#/';
  render();
});

window.addEventListener('DOMContentLoaded', () => {
  render();
});
