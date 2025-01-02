let productsInCart = localStorage.getItem('products-in-cart');
productsInCart = JSON.parse(productsInCart);
//console.log(productsInCart);

const containerCartEmpty = document.querySelector("#cart-empty");
const containerCartProducts = document.querySelector("#cart-products");
const containerCartActions = document.querySelector("#cart-actions");
const containerCartShopping = document.querySelector("#cart-shopping");
const btnRemoveProduct = document.querySelectorAll(".cart-product-remove");
const btnEmptyCart = document.querySelector("#btn-clear-cart");
const containerTotal = document.querySelector("#total");
const btnBuy = document.querySelector("#btn-buy");

function loadProductsInCart() {
    if (productsInCart && productsInCart.length > 0) {
        containerCartEmpty.classList.add("disabled");
        containerCartProducts.classList.remove("disabled");
        containerCartActions.classList.remove("disabled");
        containerCartShopping.classList.add("disabled");

        containerCartProducts.innerHTML = "";
    
        productsInCart.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("cart-product");
            div.innerHTML = `
                <img  class="cart-product-image" src="${product.image}" alt="${product.title}">
                <div class="cart-product-title">
                    <small>Título</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="cart-product-amount">
                    <small>Cantidad</small>
                    <p>${product.amount}</p>
                </div>
                <div class="cart-product-price">
                    <small>Precio</small>
                    <h3>${product.price}</h3>
                </div>
                <div class="cart-product-subtotal">
                    <small>Sub-total</small>
                    <h3>${product.price * product.amount}</h3>
                </div>
                <div class="cart-product-btn">
                    <button id="${product.id}" class="cart-product-remove"><i class="bi bi-trash-fill"></i></button>
                </div>
            `;
    
            containerCartProducts.append(div);
        });
    } else {
        containerCartEmpty.classList.remove("disabled");
        containerCartProducts.classList.add("disabled");
        containerCartActions.classList.add("disabled");
        containerCartShopping.classList.add("disabled");
    }
    updateBtnRemove();
    updateTotal();
}

loadProductsInCart();

function updateBtnRemove() {
    btnEliminateProduct = document.querySelectorAll(".cart-product-remove");

    btnEliminateProduct.forEach(btn => {
        btn.addEventListener("click", removeProduct);
    });
}

function removeProduct(e) {
    const idBtn = e.currentTarget.id;
    const elimanateProduct = productsInCart.findIndex(product => product.id === idBtn);
    //console.log(elimanateProduct);
    //console.log(productsInCart);
    const index = productsInCart.indexOf(elimanateProduct);
    productsInCart.splice(index, 1);
    //console.log(productsInCart);
    localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));
    loadProductsInCart();
}

btnEmptyCart.addEventListener("click", emptyCart);

function emptyCart() {
    productsInCart.length = 0;
    localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));
    loadProductsInCart();
}

function updateTotal() {
    const totalCalculated = productsInCart.reduce((acc, product) => acc + (product.price * product.amount), 0);
    total.innerText = `$${totalCalculated}`;
}

btnBuy.addEventListener("click", buyInTheCart);

function buyInTheCart() {
    productsInCart.length = 0;
    localStorage.setItem('products-in-cart', JSON.stringify(productsInCart));
    containerCartEmpty.classList.add("disabled");
    containerCartProducts.classList.add("disabled");
    containerCartActions.classList.add("disabled");
    containerCartShopping.classList.remove("disabled");
}
