import menu from './src/data/data.js'
console.log(menu)

window.addEventListener("DOMContentLoaded", function () {
    diplayMenuItems(menu);
    displayMenuButtons();
  });

const section_center = document.querySelector('.section-center');
const btnContainer = document.querySelector(".btn-container");


function diplayMenuItems(menuItems) {
let displayMenu = menuItems.map(function (item) {

    return `<article class="menu-item">
                <div class = "food-img">
                    <img src=${item.img} alt=${item.title} class="photo" />
                    <span><i class = "far fa-heart" id="heartBtn"></i></span>
                </div>
                <div class="item-info">
                    <header>
                        <h4>${item.title}</h4>
                        <h4 class="price">$${item.price}</h4>
                    </header>
                    <p class="item-text">
                        ${item.desc}
                    </p>
                    <div class = "food-price-calc">
                        <h2 class = "food-total"></h2>
                        <div class = "food-quantity">
                            <div class = "order-dec center">
                                <i class = "fas fa-minus"></i>
                            </div>
                        <div class = "order-val center">0</div>
                        <div class = "order-inc center">
                            <i class = "fas fa-plus"></i>
                        </div>
                        <div class="order-order center modal">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </article>`;


  });

displayMenu = displayMenu.join("");
section_center.innerHTML = displayMenu;


const allFood = document.querySelectorAll('.menu-item');
    allFood.forEach((food, index) => {
        food.querySelector('.food-total').textContent = '$ 0.00'
    })
    allFood.forEach((food, index) => {
        food.addEventListener('click', (event) => {
            if(event.target.classList.contains('order-dec') || event.target.parentElement.classList.contains('order-dec')){
                changeOrder(food, 'dec');
            }
    
            if(event.target.classList.contains('order-inc') || event.target.parentElement.classList.contains('order-inc')){
                changeOrder(food, 'inc');
            }
        });
    });


    
  function changeOrder(food, changeType){
      let foodQuan = parseInt(food.querySelector('.order-val').textContent);
      let foodPrice = parseFloat(food.querySelector('.price').textContent.replace(/[^\d.-]/g, ''));
  
      if(changeType === 'dec' && foodQuan > 0) foodQuan--;
      if(changeType === 'inc') foodQuan++;
  
      food.querySelector('.order-val').textContent = foodQuan;
      food.querySelector('.food-total').textContent = `$ ${(foodQuan * foodPrice).toFixed(2)}`;
  }
  const modalContainer = document.getElementById('modal-container')

  const displayModal = `
                        <div id="modal">
                              <div id="first-part-block">
                                  <img src="./back_img/food-icon.png" alt="Italian Trulli" id="food-icon">
                              </div>
                              <form action="" class="modal-form">
                                  <div class="modal-selection">
                                      <label for="" class="pristatymo_budas_label">Pristatymo būdas</label>
                                      <select  class="custom-select mas" id="Pristatymo_būdas" required>
                                          <option value="" disabled selected>Pasirinkti...</option>
                                          <option value="Pristatymas į namus">Pristatymas į namus</option>
                                          <option value="Atsiėmimas vietoje">Atsiėmimas vietoje</option>
                                      </select>
                                  </div>
                                  <label for="" class="pristatymo_adresas_label">Pristatymo adresas</label>
                                  <div class="modal-input-div">
                                      <input type="text" class="modal-input">
                                  </div>
                                  <div id="close-btn">&times;</div>
                                  <div class="uzsakyti-btn-container">
                                      <button class="uzsakyti-btn">Užsakyti</button>
                                  </div>
                              </form>
                          </div>`
  
  modalContainer.innerHTML = displayModal;
  
  const openModal = document.querySelectorAll('.modal')
  const closeBtn = document.getElementById('close-btn');
  
  openModal.forEach((open) => {
      open.addEventListener('click', function(){
          modalContainer.style.display = 'block';
      })
    })
  
  closeBtn.addEventListener('click', function(){
      modalContainer.style.display = 'none';
  })
  
  
  window.addEventListener('click', function(e) {
  
      if (e.target === modalContainer) {
          modalContainer.style.display = 'none';
      }
  
  })

  //get favorites from local storage or empty array
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  // add class 'fav' to each favorite
  favorites.forEach(function(favorite) {
    document.getElementById(favorite).className = '--';
  });
  // register click event listener
  document.querySelector('--').addEventListener('click', function(e) {
    const id = e.target.id,
        item = e.target,
        index = favorites.indexOf(id);
    // return if target doesn't have an id (shouldn't happen)
    if (!id) return;
    // item is not favorite
    if (index == -1) {
      favorites.push(id);
      item.className = '--';
    // item is already favorite
    } else {
      favorites.splice(index, 1);
      item.className = '';
    }
    // store array in local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
  // local storage stores strings so we use JSON to stringify for storage and parse to get out of storage
  
  


const heartBtn = document.querySelectorAll('.far');

  heartBtn.forEach((button, index) => {
  
    button.addEventListener('click', function() {
  
      const filtered = menu.filter(item => item.id === index+1);
  
  
  
      if (localStorage.getItem('favorites')) {
  
        let favorites = JSON.parse(localStorage.getItem('favorites'));
  
  
  
        if (button.classList.contains('fas')) {
  
          const updatedFavorites = favorites.filter(item => item.id !== index+1);
  
  
  
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
  
  
          button.classList.toggle('far');
  
          button.classList.toggle('fas');
  
        } else {
  
          favorites.push(filtered);
  
  
  
          localStorage.setItem('favorites', JSON.stringify(favorites));
  
  
  
          button.classList.toggle('far');
  
          button.classList.toggle('fas');
  
        }
  
      } else {
  
        let favorites = [filtered];
  
        localStorage.setItem('favorites', JSON.stringify(favorites));
  
  
  
        button.classList.toggle('far');
  
        button.classList.toggle('fas');
  
      }
  
      console.log(JSON.parse(localStorage.getItem('favorites')));
  
    });
  
  });




// const heartBtn = document.querySelectorAll('#heartBtn');
    
//     heartBtn.forEach((button, index) => {
//         button.addEventListener('click', function() {
            
//             const filtered = menu.filter(item => item.id === index+1);
//             localStorage.setItem('favorite', JSON.stringify(filtered));
//                 console.log(filtered)
//         })
//     })




}

function displayMenuButtons() {
    const categories = menu.reduce(
      function (values, item) {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      },
      ["all"]
    );
    const categoryBtns = categories
      .map(function (category) {
        return `<button type="button" class="filter-btn" data-id=${category}>
            ${category}
          </button>`;
      })
      .join("");
  
    btnContainer.innerHTML = categoryBtns;
    const filterBtns = btnContainer.querySelectorAll(".filter-btn");
    console.log(filterBtns);
  
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const category = e.currentTarget.dataset.id;
        const menuCategory = menu.filter(function (menuItem) {
          if (menuItem.category === category) {
            return menuItem;
          }
        });
        if (category === "all") {
          diplayMenuItems(menu);
        } else {
          diplayMenuItems(menuCategory);
        }
      });
    });
  }






