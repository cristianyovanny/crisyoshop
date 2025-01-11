let products = [];

fetch('./js/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        loadProducts(products);
    });

const productsContainer = document.querySelector("#products-container");
const btnCategory = document.querySelectorAll(".btn-category");
const mainTitle = document.querySelector("#main-title");
let btnAddToCart = document.querySelectorAll(".btn-add-to-cart");
const cartAmount = document.querySelector("#number");

function loadProducts(selectedProducts) {
    productsContainer.innerHTML = "";
    selectedProducts.forEach(products => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-image" src="${products.image}" alt="${products.title}">
            <div class="product-details">
                <h3 class="product-title">${products.title}</h3>
                <p class="product-price">$${products.price}</p>
                <div class="quantity-control">
                    <button class="btn-input btn-decrease" data-id="${products.id}">-</button>
                    <input type="number" class="quantity-input" id="quantity-${products.id}" data-id="${products.id}" value="1" min="1">
                    <button class="btn-input btn-increase" data-id="${products.id}">+</button>
                </div>
                <button class="btn-add-to-cart" id="${products.id}">Comprar</button>
            </div>
        `
        productsContainer.append(div);
    })
    setupQuantityControls();
    addProductToCart();
}

loadProducts(products);

btnCategory.forEach(btn => {
    btn.addEventListener("click", (e) => {

        btnCategory.forEach(btn => btn.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "all") {
            const productsCategory = products.find(products => products.category.id === e.currentTarget.id);
            mainTitle.innerText = productsCategory.category.name;

            const btnProducts = products.filter(products => products.category.id === e.currentTarget.id);
            loadProducts(btnProducts);
        } else {
            mainTitle.innerText = "Todos los productos";
            loadProducts(products);
        }
        
    })
});

function setupQuantityControls() {
    // Botones de aumentar
    document.querySelectorAll(".btn-increase").forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.dataset.id;
            const input = document.getElementById(`quantity-${productId}`);
            input.value = parseInt(input.value) + 1;
        });
    });

    // Botones de disminuir
    document.querySelectorAll(".btn-decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.dataset.id;
            const input = document.getElementById(`quantity-${productId}`);
            if (parseInt(input.value) > 1) { // No permitir cantidades menores a 1
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    // Campo de entrada de cantidad
    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("input", () => {
            if (parseInt(input.value) < 1 || isNaN(input.value)) {
                input.value = 1; // Restaurar a 1 si el valor es inválido
            }
        });
    });
}

function addProductToCart() {
    btnAddToCart = document.querySelectorAll(".btn-add-to-cart");

    btnAddToCart.forEach(btn => {
        btn.addEventListener("click", addToCart);
    });
}

let productsInCart;

let productsInCartLS = localStorage.getItem("products-in-cart");

if (productsInCartLS) {
    productsInCart = JSON.parse(productsInCartLS);
    updateAmountInCart();
} else {
    productsInCart = [];
}


function addToCart(e) {
    const productId = e.currentTarget.id;
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityInput.value);

    // Validar que la cantidad sea un número mayor que 0
    if (isNaN(quantity) || quantity <= 0) {
        alert("Por favor ingrese una cantidad válida mayor a 0.");
        quantityInput.value = 1; // Restablecer a 1 si la cantidad es inválida
        quantity = 1;
    }

    // Buscar el producto en la lista de productos
    const AddedProduct = products.find(product => product.id === productId);
    
    if (!AddedProduct) {
        console.log("Producto no encontrado");
        return; // Salir si el producto no existe
    }

    // Comprobar si el producto ya está en el carrito
    const productInCart = productsInCart.find(product => product.id === productId);
    
    if (productInCart) {
        // Si ya está, solo actualizamos la cantidad
        productInCart.quantity += quantity;
    } else {
        // Si no está, agregamos el producto al carrito con la cantidad seleccionada
        AddedProduct.quantity = quantity;
        productsInCart.push(AddedProduct);
    }

    // Actualizar el carrito en el localStorage si es necesario
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));

    console.log(productsInCart); // Ver el estado actual del carrito
    updateAmountInCart(); // Función para actualizar la interfaz del carrito
    quantityInput.value = 1;
}

//console.log(productsInCart);

function updateAmountInCart() {
    let quantity = productsInCart.reduce((acc, product) => acc + product.quantity, 0);
    //console.log(cartAmount);
    cartAmount.innerText = quantity;
}