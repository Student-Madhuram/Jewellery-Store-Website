let bagItems = [];
onLoad();

function onLoad() {
  let bagItemStr = localStorage.getItem('bagItems');
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];

  displayItemsOnHomePage();
  displayBagIcon();
  photoChange();
}

function photoChange() {
  let Images = [
    'Site Files/Neacklace1.jpg',
    'Site Files/NeckLace5.jpg',
    'Site Files/NeckLace4.jpg',
  ];

   let Texts = [
    'Best \n Seller',          // Text for Neacklace1.jpg
    'Featured \n Products',     // Text for Beangals1.jpg
    'Exclusive \n Collection'   // Text for Neacklace15.jpg
  ];

  let currentImageIndex = 0;

  let mainImg = document.querySelector('.hero-img');
  let preBtn = document.querySelector('.btn1');
  let nexBtn = document.querySelector('.btn2');

  let textElement = document.getElementById('fontChange');

  function updateImage() {
    mainImg.src = Images[currentImageIndex];
    textElement.innerText = Texts[currentImageIndex];
  }

  if (!preBtn && !nexBtn) {
    return
  } else {

    preBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : Images.length - 1;
      updateImage();
    });

    nexBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex < Images.length - 1) ? currentImageIndex + 1 : 0;
      updateImage();
    });
    updateImage();
  }
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));

  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if (bagItems.length > 0) {
    console.log('I am here');
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function displayItemsOnHomePage() {
  let itemContainerElement = document.querySelector('.section1')
  // console.log(itemContainerElement);
  let innerHtml = '';

  if (!itemContainerElement) {
    return
  }

  items.forEach(item => {
    innerHtml += `
        <div class=box1 class>
            <div class="box-img" id="${item.id}">
             <img class="item-image" src="${item.Image}" alt="">
            </div>
            <div class="color">
            <div class="item-name">${item.name}</div>
            <div class="price">
              <span class="current-price">₹${item.currentPrice}</span>
              <span class="original-price"><strike>₹${item.originalPrice}</strike></span>
              <span class="discount">(${item.discount}% OFF)</span>
            </div>
        <button type="button" class="btn-add-bag" onclick="addToBag(${item.id})"><i class="fa-solid fa-bag-shopping action-icon"></i> Add to Bag</button>
        </div>
        </div>`;
  })
  itemContainerElement.innerHTML = innerHtml;
}

  let menu_icon_box = document.querySelector('.menu-icon-box');
  let box = document.querySelector('.box');

  console.log(menu_icon_box);
  console.log(box);

  menu_icon_box.onclick = function(){
    menu_icon_box.classList.toggle("active");
    box.classList.toggle("active");
  }
  
  document.onclick = function(e){
     if(!menu_icon_box.contains(e.target) && !box.contains(e.target)){
      menu_icon_box.classList.remove("active");
      box.classList.remove("active");
     }
  }


  let availableKeywords = [
     'Bridal Wedding Gold Necklace Set',
     'Gold Ring',
     'Gold-Plated Stone-studded Necklace',
     'Diamond Earring',
     'Gold Bengals',
     'All Pearls Stone-studded Set',
     'Stone-studded Earrings',
     'Pearls Choker NeckLace',
  ];

  const resultBox = document.querySelector('.result-box');
  const inputBox = document.querySelector('.search_input');

  inputBox.onkeyup = function(){
      let result = [];
      let input = inputBox.value;

      if(input.length){
         result = availableKeywords.filter((keywords)=>{
            return keywords.toLowerCase().includes(input.toLowerCase());
         });
         console.log(result);
      }
      display(result);

      if(!result.length){
          resultBox.innerHTML = '';
      }
  }

  function display(result){
    const content = result.map((list)=>{
         return "<li onclick=selectInput(this)>" + list + "</li>"
    });

    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>"
  }

  function selectInput(list){
        inputBox.value = list.innerHTML;
        resultBox.innerHTML = ' ';
  }
 
    // USING SEARCH BUTTON DRAG USER TO THE PRODUCT

 // Function to handle search
function searchItem() {
  const searchInput = document.querySelector(".search_icon").value.toLowerCase(); 
  const foundItem = items.find(item => item.name.toLowerCase().includes(searchInput));
  
  if (foundItem) {
    const targetElement = document.getElementById(foundItem.id); 
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
      alert('Item not found');
  }
}

document.querySelector(".search_icon").addEventListener("click", searchItem);
