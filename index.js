import {menuArray} from '/data.js'

let order = document.getElementById("order")
let cart = []
const form = document.getElementById("myForm")
const nameRegex = /^[A-Za-z\s]+$/;
const cardRegex = /^\d{16}$/;
const cvvRegex = /^\d{3}$/;




document.addEventListener('click',function(e){

   if(e.target.dataset.btn){
       console.log(e.target.dataset.btn)
      addItemOnCart(e.target.dataset.btn)

   }if(e.target.dataset.remove){

      removeItemFromCart(e.target.dataset.remove)   
   }if(e.target.dataset.complete){
      document.getElementById("modal").style.display = "block"}
  
})

form.addEventListener('submit',function(e){
   e.preventDefault();
   let fname = document.forms["myForm"]["fname"].value;
   let fcard = document.forms["myForm"]["fcard"].value;
   let fcvv = document.forms["myForm"]["fcvv"].value;

   if(!validateName()) {
      alert('Please enter a valid name')
      return ;
   } if(!validateCard()){
      alert('Please enter a valid credit card number with 16 digits')
      return;
   } if(!validateCVV()){
      alert('Please enter a valid cvv')
      return;
   }

 

  document.getElementById("modal").style.display = "none"
  customerMessage(fname)

})



//The paramether targetIdItem just brings the id of the item I selected. I need the function findItemOnMenu to know actually the content of that item.
function addItemOnCart(targetIdItem){
   const targetItem = findItemOnMenu(targetIdItem)
   
   cart.push(targetItem)
   renderCart(cart)
}


function removeItemFromCart(removedIdItem){
   const targetItem = cart.find(cartItem => cartItem.id == removedIdItem)
   const itemIndex  = cart.indexOf(targetItem)

   cart.splice(itemIndex,1)
   
   renderCart(cart)
}


//**This function will select the whole object that matched the id and returned. I chose not to storage it inside a variable. There are other ways to do this comparisson, here I'm using an arrow function.menuItem is a random name, it represents an item inside the Array MenuArray.
function findItemOnMenu(itemId){

   return menuArray.find(menuItem => menuItem.id == itemId)

}



//***By using innerHtml the function render() gets the returned data from the function getDataHtml()
function renderCart(cart){
   const htmlItens = getHtmlFromCart(cart)
   const sumPrices = calculatePrice(cart)

   let html = ""
   html = 
         `<h1 class="order-title">Your order</h1> 
            <div class="order-top">
            ${htmlItens} 
            </div>

         <hr>

         <div class="order-botton">
            <h1>Total Price</h1>
            ${sumPrices}
         </div> 

         <div class="btn">
         <button class="order-btn" id="order" data-complete="complete-order">Complete Order</button>
         </div>`

       
  renderFinalOrder(html)

}

//**This function creates a new array by usig the method map. We storage the sum of all the items into the variable sumPrices by using the method reduce. If the length of the array prices is 0 we return 0 so they array won't be empty*/
function calculatePrice(cart){
   
   let prices = cart.map(function(product){
       return product.price
   })

   if(prices.length == 0){
      return 0
   }
   
   const sumPrices = prices.reduce(function (accumulator,currentPrice) {
      return accumulator + currentPrice   
   })

  
   return sumPrices
}

//Getting the updated data from array cart and returning to the function renderCart. 
function getHtmlFromCart(cart){
   
   let html = ""
  
  cart.forEach(function(product){
     html +=`
     <div class="product-details">
        <div class="wrap-button">
           ${product.name} 
           <button class="remove-btn" id="remove-btn" data-remove ="${product.id}">(remove)</button>
        </div>
        <div>${product.price}</div>   
     </div>
     `
  })

  return html
}


//This function uses innerHtml to show all the information on the DOM
function renderFinalOrder(html){
  return order.innerHTML = html;
}

//***The function renderData uses an array to access the data and concatenate it on a variable using a html boiling plate. The boilerplate uses variables that access the data.js file.  
function getDataHtml(){
   let renderData=""

   menuArray.forEach(function(dish){
      renderData +=`
      <div class="item">
         <div class="image">
          <img src="${dish.image}" class="cloths-item">
         </div>

         <div class="description">
            <h2>${dish.name}</h2>
            <button>composition</button>
            
            <div class="price-button">
             <div class="price">$ ${dish.price}</div>
             <i class="add-btn fa-solid fa-circle-plus" data-btn ="${dish.id}"></i>
            </div> 
         </div>

         <hr>
        
         
      </div>`
   })
   
   return renderData
}

//***By using innerHtml the function render() gets the returned data from the function getDataHtml()
function render(){
   container.innerHTML = getDataHtml()
}


//***Call function render
render()



//***This function identify the data attribute from the removed button. So we know which item we should delete.The variable targetItem holds the id of the food that is connected with the remove button we created. */
function identifyRemoveItem(targetItem){
   
   let removedItem = cart.find(val => val.id == targetItem)
   
   removeItem(removedItem)  
}


//**This function delete the selected item from the array cart. It alsos call the function calculatePrice and passes the updated array info */
function removeItem(removedItem){
  
   cart.pop(removedItem)
   renderCart(cart)
}


function removeCalculatePrice(removedItem){
   
   let prices = cart.map(function(product){
       return product.price
   })

   const subtract = (accumulator,removedItem) => accumulator - removedItem;
   console.log(prices.reduce(subtract))
   
}

function customerMessage(fname){
   order.innerHTML = `<div class="customer-message">Thanks <span>${fname}</span> ! Your order is on its way !</div>`
   
}

//Regex Functions
function validateName(){
   return nameRegex.test(fname.value.trim())
}

function validateCard(){
   return cardRegex.test(fcard.value.trim())
}

function validateCVV(){
   return cvvRegex.test(fcvv.value.trim())
}



