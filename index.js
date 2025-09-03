function fetchAndRenderProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      const grid = document.getElementById('productGrid');
      console.log(products)
      grid.innerHTML = products.map(product => `
        <div class="product-card">
          ${product.image ? `<img src="${product.image}" alt="${product.title}" class="product-image">` : ''}
          <div class="product-title">${product.title}</div>
          <div class="product-price">$${product.price}</div>
          <div class="product-description">${product.description}</div>
        </div>
      `).join('');
    });
}
 
 
fetchAndRenderProducts();