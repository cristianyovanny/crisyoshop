// PRODUCTOS
const products = [
    // Abrigos
    {
        id: "abrigo-01",
        title: "Abrigo 01",
        image: "./img/abrigos/01.jpg",
        category: {
            name: "Abrigos",
            id: "abrigos"
        },
        price: 1000
    },
    {
        id: "abrigo-02",
        title: "Abrigo 02",
        image: "./img/abrigos/02.jpg",
        category: {
            name: "Abrigos",
            id: "abrigos"
        },
        price: 1000
    },
    {
        id: "abrigo-03",
        title: "Abrigo 03",
        image: "./img/abrigos/03.jpg",
        category: {
            name: "Abrigos",
            id: "abrigos"
        },
        price: 1000
    },
    {
        id: "abrigo-04",
        title: "Abrigo 04",
        image: "./img/abrigos/04.jpg",
        category: {
            name: "Abrigos",
            id: "abrigos"
        },
        price: 1000
    },
    {
        id: "abrigo-05",
        title: "Abrigo 05",
        image: "./img/abrigos/05.jpg",
        category: {
            name: "Abrigos",
            id: "abrigos"
        },
        price: 1000
    },
    // Camisetas
    {
        id: "camiseta-01",
        title: "Camiseta 01",
        image: "./img/camisetas/01.jpg",
        category: {
            name: "Camisetas",
            id: "camisetas"
        },
        price: 1000
    },
    {
        id: "camiseta-02",
        title: "Camiseta 02",
        image: "./img/camisetas/02.jpg",
        category: {
            name: "Camisetas",
            id: "camisetas"
        },
        price: 1000
    },
    {
        id: "camiseta-03",
        title: "Camiseta 03",
        image: "./img/camisetas/03.jpg",
        category: {
            name: "Camisetas",
            id: "camisetas"
        },
        price: 1000
    },
    {
        id: "camiseta-04",
        title: "Camiseta 04",
        image: "./img/camisetas/04.jpg",
        category: {
            name: "Camisetas",
            id: "camisetas"
        },
        price: 1000
    },
    {
        id: "camiseta-05",
        title: "Camiseta 05",
        image: "./img/camisetas/05.jpg",
        category: {
            name: "Camisetas",
            id: "camisetas"
        },
        price: 1000
    },
    {
        id: "camiseta-06",
        title: "Camiseta 06",
        image: "./img/camisetas/06.jpg",
        category: {
            name: "Camisetas",
            id: "camisetas"
        },
        price: 1000
    },
    {
        id: "camiseta-07",
        title: "Camiseta 07",
        image: "./img/camisetas/07.jpg",
        category: {
            name: "Camisetas",
            id: "camisetas"
        },
        price: 1000
    },
    {
        id: "camiseta-08",
        title: "Camiseta 08",
        image: "./img/camisetas/08.jpg",
        category: {
            name: "Camisetas",
            id: "camisetas"
        },
        price: 1000
    },
    // Pantalones
    {
        id: "pantalon-01",
        title: "Pantalón 01",
        image: "./img/pantalones/01.jpg",
        category: {
            name: "Pantalones",
            id: "pantalones"
        },
        price: 1000
    },
    {
        id: "pantalon-02",
        title: "Pantalón 02",
        image: "./img/pantalones/02.jpg",
        category: {
            name: "Pantalones",
            id: "pantalones"
        },
        price: 1000
    },
    {
        id: "pantalon-03",
        title: "Pantalón 03",
        image: "./img/pantalones/03.jpg",
        category: {
            name: "Pantalones",
            id: "pantalones"
        },
        price: 1000
    },
    {
        id: "pantalon-04",
        title: "Pantalón 04",
        image: "./img/pantalones/04.jpg",
        category: {
            name: "Pantalones",
            id: "pantalones"
        },
        price: 1000
    },
    {
        id: "pantalon-05",
        title: "Pantalón 05",
        image: "./img/pantalones/05.jpg",
        category: {
            name: "Pantalones",
            id: "pantalones"
        },
        price: 1000
    }
];

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