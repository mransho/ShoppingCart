// Define Product
let productsDOM = document.querySelector(".products");
let cartProductMenu = document.querySelector(".carts-products");
let cartProductDivDOM = document.querySelector(".carts-products div");
let badgeDOM = document.querySelector("#user_info .badge");
let totalPriceDOM = document.querySelector(
  ".shoppingList .carts-products span"
);
let shoppingList = document.querySelector(".shoppingList");

// open cart menu
shoppingList.addEventListener("click", openCartMenu);

//display products
(function drawProductsUI() {
  let productsUI = products
    .map((item) => {
      return `
    <div class="product-item card">
      <img
        src="${item.imageUrl}"
        alt="Fridge"
        class="product-item-img img"
      />

      <div class="product-item-desc">
        <a onclick="saveItemData(${item.id})">${item.title}</a>
        <p>Lorem ipsum dolor sit, amet consectetur a</p>
        <span> size: ${item.size} </span>
        <hr>
        <spam>price :${item.price}</spam>
      </div>

      <div class="product-item-actions">
        <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
      </div>
    </div>
    `;
    })
    .join("");
  if (productsDOM) {
    productsDOM.innerHTML += productsUI;
  }
})();

//check if there is items in localStorage
let addedItem = JSON.parse(localStorage.getItem("productsInCart"))
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

let totalPrice = 0;
if (addedItem) {
  addedItem.map((item) => {
    totalPrice += item.price * item.qty;
    badgeDOM.style.display = "block";
    cartProductDivDOM.innerHTML += `<p>${item.title}: ${item.price} | ${item.qty}</p>`;

    let cartProductsItemsLength = document.querySelectorAll(
      ".carts-products div p"
    ).length;
    badgeDOM.innerHTML = cartProductsItemsLength;
  });
  totalPriceDOM.innerHTML = `Total price : ${totalPrice}`;
}

//add To Cart
// let allItems = [];
function addedToCart(id) {
  if (localStorage.getItem("username")) {
    totalPrice = 0;
    let product = products.find((item) => item.id === id);
    badgeDOM.style.display = "block";
    let isProductInCart = addedItem.some((i) => i.id === product.id);
    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItem.push(product);
    }
    cartProductDivDOM.innerHTML = "";
    addedItem.forEach((item) => {
      cartProductDivDOM.innerHTML += `<p>${item.title}: ${item.price} | ${item.qty} </p>`;
      totalPrice += item.price * item.qty;
    });

    // let parts = Number(totalPriceDOM.innerHTML.split(":")[1].trim());
    totalPriceDOM.innerHTML = `Total price : ${totalPrice}`;

    // addedItem = [...addedItem, addedItem];

    let uniqueProducts = getUniqueArr(addedItem, "id");
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
    let cartProductsItemsLength = document.querySelectorAll(
      ".carts-products div p"
    ).length;
    badgeDOM.innerHTML = cartProductsItemsLength;
  } else {
    window.location = "login.html";
  }
}

function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
  return unique;
}

//open cart menu
function openCartMenu() {
  if (cartProductDivDOM.innerHTML != "") {
    if (cartProductMenu.style.display == "block") {
      cartProductMenu.style.display = "none";
    } else {
      cartProductMenu.style.display = "block";
    }
  }
}
