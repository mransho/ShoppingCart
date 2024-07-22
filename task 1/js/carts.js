let productsDOM = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");

let cartProductMenu = document.querySelector(".carts-products");
let cartProductDivDOM = document.querySelector(".carts-products div");
let badgeDOM = document.querySelector("#user_info .badge");
let totalPriceDOM = document.querySelector(
  ".shoppingList .carts-products span"
);
let shoppingList = document.querySelector(".shoppingList");

// open cart menu
shoppingList.addEventListener("click", openCartMenu);

//check if there is items in localStorage

function total() {
  cartProductDivDOM.innerHTML = "";
  badgeDOM.innerHTML = "";
  totalPriceDOM.innerHTML = "";
  let addedItem = JSON.parse(localStorage.getItem("productsInCart"))
    ? JSON.parse(localStorage.getItem("productsInCart"))
    : [];

  let totalPrice = 0;

  if (addedItem) {
    addedItem.map((item) => {
      // totalPrice += item.price;
      badgeDOM.style.display = "block";
      cartProductDivDOM.innerHTML += `<p>${item.title}: ${item.price} | ${item.qty} </p>`;
      totalPrice += item.price * item.qty;
      let cartProductsItemsLength = document.querySelectorAll(
        ".carts-products div p"
      ).length;
      badgeDOM.innerHTML = cartProductsItemsLength;
    });
  }
  totalPriceDOM.innerHTML = `Total price : ${totalPrice}`;
}
total();
function drawCartProductsUI(AllProducts = []) {
  if (
    !JSON.parse(localStorage.getItem("productsInCart")) ||
    JSON.parse(localStorage.getItem("productsInCart")).length === 0
  )
    noProductsDom.style.display = "block";
  noProductsDom.innerHTML = "There Is No Items";

  let products =
    JSON.parse(localStorage.getItem("productsInCart")) || AllProducts;
  let productsUI = products
    .map((item) => {
      return `
      <div class="product-item">
        <img
          src="${item.imageUrl}"
          alt="Fridge"
          class="product-item-img"
        />
  
        <div class="product-item-desc">
          <h2>${item.title}</h2>
          <p>Lorem ipsum dolor sit, amet consectetur a</p>
          <span> size: ${item.size} </span> <br>
          <span> quntatit: ${item.qty} </span><br>
          <span> parse: ${item.price} </span><br>
          <span> Total parse: ${item.price * item.qty} </span>

        </div>
  
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="RemovItemFromCart(${
            item.id
          })">Remov From Cart</button>
        </div>
      </div>
      `;
    })
    .join("");
  productsDOM.innerHTML = productsUI;
}
drawCartProductsUI();
// function RemovItemFromCart(id) {
//   let productsInCart = localStorage.getItem("productsInCart");
//   if (productsInCart) {
//     let items = JSON.parse(productsInCart);
//     let filteredItems = items.filter((item) => item.id !== id);
//     localStorage.setItem("productsInCart", JSON.stringify(filteredItems));

//     drawCartProductsUI(filteredItems);
//     localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
//   }
// }

function RemovItemFromCart(id) {
  let productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    let items = JSON.parse(productsInCart);

    let updatedItems = items
      .map((item) => {
        if (item.id === id) {
          if (item.qty > 1) {
            item.qty -= 1;
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    localStorage.setItem("productsInCart", JSON.stringify(updatedItems));

    drawCartProductsUI(updatedItems);
    total();
  }
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
