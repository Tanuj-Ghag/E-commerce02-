// module.exports = makearray;

let cartIcon = document.querySelector("#cart_icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close_cart");

var transarray = [];
var transjson = {};


if(document.readyState=="loading"){
  document.addEventListener("DOMContentLoaded", ready);
}
else{
  ready();
}
function ready(){

  // document.getElementById("logornot").addEventListener("click", function(){
  //   if(document.getElementsByClassName("prof")[0].innerText=="profile"){
  //     alert("login first");
  //   }
  // })

  document.getElementById("cartbut").addEventListener("click", function() {
    document.getElementsByClassName("cart")[0].style.display="block";
    document.getElementsByClassName("opac")[0].style.opacity="0.5";
    document.getElementsByClassName("cart")[0].classList.add("active");
  });
  document.getElementById("close_cart").addEventListener("click", function() {
    document.getElementsByClassName("cart")[0].style.display="none";
    document.getElementsByClassName("opac")[0].style.opacity="1";
    document.getElementsByClassName("cart")[0].classList.remove("active");
  });
  var addCart = document.getElementsByClassName("atcb");
  for(var i=0; i<addCart.length; i++)
  {
    var atc=addCart[i];
    atc.addEventListener("click",addCartClicked);
  }
  document.getElementsByClassName("buybtn")[0].addEventListener("click", function() {
    document.getElementsByClassName("paymentwindow")[0].style.display="block";
    document.getElementsByClassName("amounttag")[0].innerHTML=`<b>Amount Payable</b>(Inc of all taxes): <b>Rs${total}</b>`
    document.getElementsByClassName("opac")[0].style.opacity="0.5";
    var cartContent = document.getElementsByClassName("cart_content")[0];
    while(cartContent.hasChildNodes()){
      cartContent.removeChild(cartContent.firstChild);
    }
  });
  document.getElementsByClassName("placebtn")[0].addEventListener("click", function() {
    document.getElementsByClassName("paymentwindow")[0].style.display="none";
    document.getElementsByClassName("viewbill")[0].style.display="block";
    makearray();
  });
}
function removeCartItem(event){
  console.log(event.target.parentElement);
  event.target.parentElement.remove();
  updateTotal();
}
function quantityChanged(event){
  var input=event.target;
  if(isNaN(input.value) || input.value<=0){
    input.value=1;
  }
  else {
    updateTotal();
  }
}
function addCartClicked(event) {
  if(document.getElementsByClassName("prof")[0].innerText=="profile"){
    alert("login first");
  }
  else{
    var title = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].innerText;
    var price = event.target.parentElement.previousElementSibling.innerText;
    var productImg = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.src;
    addProducttoCart(title, price, productImg);
  }
  
}
function addProducttoCart(title, price, productImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart_box");
  var cartBoxContent = `<img src="${productImg}" class="cart_img" alt="">
  <div class="detail_box">
    <div class="cart_product_title">${title}</div>
    <span class="cart_p"><p>Rs </p><div class="cart_price">${price}</div></span>
  </div>
  <input type="number" value="1" min="1" class="cart_quantity">
  <i class="fa-solid fa-trash cart_remove"></i>`;
  var CartItemName = document.getElementsByClassName("cart_product_title");
  for(var i=0;i<CartItemName.length;i++){
    if(CartItemName[i].innerText==title){
      alert("Item Already Added, Increase the quantity in cart");
      return
    }
  }
  cartShopBox.innerHTML= cartBoxContent;
  const cart = document.getElementsByClassName('cart')[0];
  const total = document.querySelector('.total');
  cart.insertBefore(cartShopBox, total);
  var quantityinputs = document.getElementsByClassName("cart_quantity");
  for(var i=0; i<quantityinputs.length; i++)
  {
    var inputq=quantityinputs[i];
    inputq.addEventListener("click",quantityChanged);
  }
  var removeCartButtons = document.getElementsByClassName("cart_remove");
  for(var i=0; i<removeCartButtons.length; i++)
  {
    var button=removeCartButtons[i];
    button.addEventListener("click",removeCartItem);
  }
  document.getElementsByClassName("cart_box")[0].classList.add("bordertop");
  var borderbelow = document.getElementsByClassName("cart_box").length - 1;
  document.getElementsByClassName("cart_box")[borderbelow].classList.add("borderniche");
  updateTotal();
}

var arrofitems = [];
var jsonofitems = {};

function makearray() {
  var nameof = document.getElementById("coh2").innerText;
  var cartBoxes2= document.getElementsByClassName("cart_box");
  for(var i=0; i<cartBoxes2.length; i++) {
    var cartBox2=cartBoxes2[i];
    var priceElement2 = cartBox2.children[1].children[1].children[1];
    var quantityElement2 = cartBox2.children[2];
    var price2 = parseFloat(priceElement2.innerText);
    var quantity2 = quantityElement2.value;
    var productnameElement2 = cartBox2.children[1].children[0];

    arrofitems.push({Product:productnameElement2.innerText, Price:price2, Quantity:quantity2});
  }
  var tot = document.getElementsByClassName("total_price")[0].innerText;
  var tax = document.getElementsByClassName("tax13")[0].innerText;
  jsonofitems = {Nameofcust:nameof, Items: arrofitems, totalam: tot, totaltax: tax}

  $.post("/request", jsonofitems,
     function (data, status) {
        // console.log(data);
     });
}
// var total=0;
function updateTotal(){
  var total=0;
  var cartBoxes= document.getElementsByClassName("cart_box");
  for(var i=0; i<cartBoxes.length; i++) {
    var cartBox=cartBoxes[i];
    var priceElement = cartBox.children[1].children[1].children[1];
    var quantityElement = cartBox.children[2];
    var price= parseFloat(priceElement.innerText);
    var quantity = quantityElement.value;
    total=total+price*quantity;
  }
  document.getElementsByClassName("tax13")[0].innerText=(total*1.13.toFixed(2));
  document.getElementsByClassName("total_price")[0].innerText="₹" + total;
  document.getElementsByClassName("amounttag")[0].innerHTML=`<b>Amount Payable</b>(Inc of all taxes): <b>Rs${total}</b>`;

}
