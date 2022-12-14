//import {menuArray} from `./data.js`

const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: "0",
        price: 14,
        emoji: "🍕"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        id: "1"
    },
        {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        id: "2"
    }
]

const container = document.getElementById('container')
const header = document.getElementById('header')
const modalContainer = document.getElementById('modal-container')
let orderMenuContainer = document.getElementById('order-menu-container')
const orderConfirmation = document.getElementById('order-confirmation')
const customerPaymentInfo = document.getElementById('customer-payment-info')


document.addEventListener('click', function(e){ 
    
    if(e.target.dataset.add){
       handleAddItemBtn(e.target.dataset.add) 
    } 
    else if(e.target.dataset.remove){
        handleRemoveItemBtn(e.target.dataset.remove)
    }
    else if(e.target.id === 'orderBtn'){
        handleCompleteOrderBtn()
    }
    else if(e.target.id === 'pay-btn'){
        handlePaymentBtn()
    }
    
    else if(e.target.id === 'close-modal-btn'){
        handlePaymentCloseBtn()
    }

})


//Collects customer payment information on payment modal

customerPaymentInfo.addEventListener('submit', function(e){
    e.preventDefault()
    const customerFormData = new FormData(customerPaymentInfo)
    const customerName = customerFormData.get('name')
    handlePaymentBtn(customerName)
})


//Menu Page 

function handleAddItemBtn(itemId){
    
    const targetFoodItem = menuArray.filter(function(selection){
        return itemId === selection.id

    })[0]
    
    orderMenuContainer.style.display = 'flex' //opens the order review menu when an option is selected
    
    orderMenuContainer.innerHTML += //displays customer order selection
    `
        <div class="order-menu">
            <div class="selected-items">
                <p class="selected-item">${targetFoodItem.name}
                <span class="remove-btn" 
                data-remove="${targetFoodItem.id}">
                REMOVE</span></p>
                <p class="total-price">$${targetFoodItem.price}</p>
            </div> 
        </div>
    `
    
}

/*
function handleRemoveItemBtn(selectionId){
   
    console.log(selectionId)
    
    let isSelected = selectionId
    
    const removedItem = menuArray.filter(function(item){
        return isSelected === item.id     
    })[0]
             
}
*/



function handleCompleteOrderBtn(){
   
   //open payment modal when customer clicks complete order button
   modalContainer.style.display = 'flex'
   container.style.opacity = '0.2'
}



//Payment Modal

function handlePaymentBtn(customerName){
   
   //closes payment modal when customer submits payment information
   modalContainer.style.display = 'none' 
   container.style.opacity = '1'
   
   orderMenuContainer.innerHTML = 
   `
    <div class="order-confirmation" id="order-confirmation">
        <p class="confirmation-text">Thanks, ${customerName} ! Your order is on its way!</p>
    </div>
   
   `   
} 


function handlePaymentCloseBtn(){
    
    //closes payment modal when customer clicks X button 
    modalContainer.style.display = 'none'
    container.style.opacity = '1'
    
}



function getMenuHtml(){
 
        
  let menuItem = ""
  
  menuArray.forEach(function(foodItem){
      menuItem +=
      `
            <div class="menu-container">
                <p class="food-item-emoji">${foodItem.emoji}</p>
                <div class="food-item-details">
                    <p class="food-item-name">${foodItem.name}</p>
                    <p class="food-item-ingredients">${foodItem.ingredients}</p>
                    <p class="food-item-price">$${foodItem.price}</p> 
                </div>  
                
                <img class="add-btn" 
                id="add-btn" 
                src="/add-btn.png"
                data-add="${foodItem.id}"> 
            </div>
            
      `
  })
    
            return menuItem 
                 
}


function renderMenu(){
    document.getElementById('menu-feed').innerHTML = getMenuHtml()
}

renderMenu()


