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
                <button class="btn-add-to-cart" id="${products.id}">Comprar</button>
            </div>
        `
        productsContainer.append(div);
    })
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
    const idBtn = e.currentTarget.id;
    const AddedProduct = products.find(product => product.id === idBtn)
    if (productsInCart.some(product => product.id === idBtn)) {
        const index = productsInCart.findIndex(product => product.id === idBtn);
        productsInCart[index].amount++;
    } else {
        AddedProduct.amount = 1; 
        productsInCart.push(AddedProduct);
    }

    //console.log(productsInCart);
    updateAmountInCart();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

//console.log(productsInCart);

function updateAmountInCart() {
    let amount = productsInCart.reduce((acc, product) => acc + product.amount, 0);
    //console.log(cartAmount);
    cartAmount.innerText = amount;
}