let bagItemObjects=[];
let CONVENIENCE_FEE = 99;

onLoad();

function onLoad(){
   loadBagItemObjects();
   displayBagItems();
   displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;

    bagItemObjects.forEach(bagItem =>{
        totalMRP += bagItem.originalPrice;
        totalDiscount += bagItem.originalPrice - bagItem.currentPrice;
    });
    
    let finalPayment = totalMRP -totalDiscount + CONVENIENCE_FEE;

        bagSummaryElement.innerHTML =`
                <div class="price-header">PRICE DETAILS(${totalItem} Items)</div>
                <div class="price-item">
                    <span class="price-item-tag">Total MRP</span>
                    <span class="price-item-value">₹${totalMRP}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Discount on MRP</span>
                    <span class="price-item-value">₹${totalDiscount}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Convenience Fee</span>
                    <span class="price-item-value">₹${CONVENIENCE_FEE}</span>
                </div>
                <hr>
                <div class="price-footer">
                    <span class="price-item-tag">Total Amount</span>
                    <span class="price-item-value">₹${finalPayment}</span>
                </div>
                <button class="btn-place-order">
                    <div class="css-xjhrni">PLACE ORDER</div>
                </button>
            </div>`
}

function loadBagItemObjects(){
   console.log(bagItems);
   bagItemObjects = bagItems.map(itemId =>{
       for(let i = 0; i < items.length; i++){
           if(itemId == items[i].id){
               return items[i];
           }    
       }
   });
}

function displayBagItems(){ 
  let  containerElement = document.querySelector('.bag-items-container');
  let innerHTML ='';
  
  bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId){
        bagItems = bagItems.filter(bagItemId => bagItemId != itemId);

        localStorage.setItem('bagItems',JSON.stringify(bagItems));
        loadBagItemObjects();
        displayBagIcon();
        displayBagItems();
}

function generateItemHTML(items){
  return`<div class="bag-item-container">
                    <div class="item-left-part">
                        <img class="bag-item-img" src="${items.Image}" alt="">
                    </div>
                    <div class="item-right-part">
                        <div class="item-name">${items.name}</div>
                        <div class="price-container">
                            <span class="current-price">₹${items.currentPrice}</span>
                            <span class="original-price">₹${items.originalPrice}</span>
                            <span class="discount-percentage">(${items.discount}% OFF)</span>
                        </div>
                        <div class="return-period">
                            <div class="return-period-days">14 days</div> return available
                        </div>
                        <div class="delivery-details">
                            Delivery By
                            <span class="delivery-details-days">10 oct 2023</span>
                        </div>
                    </div>
                    <div class="remove-from-cart" onclick="removeFromBag(${items.id})">X</div>
                </div>`;
}