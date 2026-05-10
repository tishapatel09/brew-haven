function showToast(){
    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
function addToCart(itemName){
    showToast();
}
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    if(link.href === window.location.href){
        link.classList.add("active");
    }
});
/* CART SYSTEM */

const cartButtons = document.querySelectorAll(".cart-btn");

/* Load Existing Cart */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

/* Check Existing Items on Page Load */

cartButtons.forEach(function(button){

    const name = button.dataset.name;

    const existingItem =
    cart.find(item => item.name === name);

    if(existingItem){

        updateCartUI(button,
        existingItem.quantity);

    }

});

/* Add To Cart */

cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const name = button.dataset.name;

        const price = button.dataset.price;

        const image = button.dataset.image;

        const existingItem =
        cart.find(item => item.name === name);

        if(existingItem){

            existingItem.quantity += 1;

            updateCartUI(button,
            existingItem.quantity);

        }else{

            const item = {

                name,
                price,
                image,
                quantity: 1

            };

            cart.push(item);

            updateCartUI(button, 1);

        }

        localStorage.setItem("cart",
        JSON.stringify(cart));

    });

});

/* Update UI */

function updateCartUI(button, quantity){

    const parent =
    button.parentElement;

    const productName =
    button.dataset.name;

    parent.innerHTML = `

    <div class="quantity-box">

        <button onclick=
        "changeQuantity('${productName}', -1)">
            -
        </button>

        <span id="${productName}">
            ${quantity}
        </span>

        <button onclick=
        "changeQuantity('${productName}', 1)">
            +
        </button>

    </div>

    <a href="cart.html"
    class="open-cart-btn">

    Open Cart

    </a>

    `;

}

/* Change Quantity */

function changeQuantity(productName, change){

    cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const item =
    cart.find(item => item.name === productName);

    if(item){

        item.quantity += change;

        if(item.quantity <= 0){

            cart =
            cart.filter(i => i.name !== productName);

            localStorage.setItem("cart",
            JSON.stringify(cart));

            location.reload();

            return;

        }

        document.getElementById(productName)
        .innerText = item.quantity;

    }

    localStorage.setItem("cart",
    JSON.stringify(cart));

}
/* HAMBURGER MENU */

const hamburger =
document.getElementById("hamburger");

const navLinks =
document.getElementById("navLinks");

if(hamburger){

    hamburger.addEventListener("click", function(){

        navLinks.classList.toggle("show");

    });

}