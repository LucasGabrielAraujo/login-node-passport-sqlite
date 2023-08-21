const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

let products = [];

productForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);

    if (name && price) {
        const newProduct = {
            name,
            price
        };

        products.push(newProduct);
        renderProducts();
        resetForm();
    }
});

function renderProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price}</span>
            <button onclick="deleteProduct(${index})">Eliminar</button>
        `;
        productList.appendChild(li);
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
}

renderProducts();
