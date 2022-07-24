  const firebaseConfig = {
    apiKey: "AIzaSyC9HqG6NteqYoqrcz46rOxBWdhwSc1UJD4",
    authDomain: "food-rest-d52ab.firebaseapp.com",
    databaseURL: "https://food-rest-d52ab-default-rtdb.firebaseio.com",
    projectId: "food-rest-d52ab",
    storageBucket: "food-rest-d52ab.appspot.com",
    messagingSenderId: "146693459983",
    appId: "1:146693459983:web:89da6077bbf1e20204537a"
  };

  firebase.initializeApp(firebaseConfig);

  //

    const modal = document.querySelector('.modal');
    const cartButton = document.querySelector('#cart-button');
    const modalAuth = document.querySelector('.modal-auth');
    const loginInput = document.querySelector('#login');
    const loginForm = document.querySelector('#logInForm');
    const buttonAuth = document.querySelector('.button-auth');
    const buttonOut = document.querySelector('.button-out');
    const closeAuth = document.querySelector('.close-auth');

    const closeBasket = document.querySelector('.close');
    const clearBasket = document.querySelector('.clear-cart');

    const userName = document.querySelector('.user-name');
    const modalBody = document.querySelector('.modal-body');

    const cardsRestaurants = document.querySelector('.cards-restaurants');
    const cardsMenu = document.querySelector('.cards-menu');
    const containerPromo = document.querySelector('.container-promo');
    const restaurants = document.querySelector('.restaurants');
    const menu = document.querySelector('.menu');
    const modalPrice = document.querySelector('.modal-pricetag');

    const restaurantTitle = document.querySelector('.restaurant-title');
    const restaurantRating = document.querySelector('.rating');
    const restaurantAverPrice = document.querySelector('.price');
    const restaurantCategory = document.querySelector('.category');

    // const cardTitle = document.querySelector('.card-heading');

    // console.log(cardTitle);

  // 

  let login = localStorage.getItem('deliveryFood');


  const cart = [];  // food basket

  const loadCart = () => {
    if(localStorage.getItem(login)) {
      JSON.parse(localStorage.getItem(login)).forEach(item => {
        cart.push(item);
      })
    }
  };

  const saveCart = () => {
    localStorage.setItem(login, JSON.stringify(cart));
  }

  const getData = async (key) => {
      const data = await firebase.database().ref().child(key).once('value')
      return data.val();
  };

  const valid = (str) => {
    return str.length > 5;
  };

  const returnMain = () => {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  }


  const authorised = () => {

    const logOut = () => {
      login = null;
      cart.length = 0;
      localStorage.removeItem('deliveryFood');
      buttonAuth.style.display = '';
      userName.style.display = '';
      buttonOut.style.display = '';
      cartButton.style.display = '';

      buttonOut.removeEventListener('click', logOut);

      checkAuth();
      returnMain();
    };

    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';
    cartButton.style.display = 'flex';
    buttonOut.addEventListener('click', logOut);

    loadCart();

  };


  const notAuthorised = () => {

    const logIn = (event) => {
      event.preventDefault();
      
      if(valid(loginInput.value)) {

        login = loginInput.value;
        localStorage.setItem('deliveryFood', login);
        toggleModalAuth();
        buttonAuth.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        loginForm.removeEventListener('click', toggleModalAuth);
        loginForm.reset();
        checkAuth();

      } else {
        loginInput.style.borderColor = 'red';
      }
    };

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    loginForm.addEventListener('submit', logIn);

  };


  const checkAuth = () => login ? authorised() : notAuthorised();

  const toggleModalAuth = () => {
    modalAuth.classList.toggle('is-open');
  };

  const toggleModal = () => {
    modal.classList.toggle('is-open');
  };

  const createCardRestaurant = (restaurant) => {

    const { image, name, price, stars, products, kitchen, time_of_delivery } = restaurant;

    const card = `
        <a class="card card-restaurant" data-products="${products}">
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title"> ${name} </h3>
            <span class="card-tag tag"> ${time_of_delivery} </span>
          </div>
          <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
            <div class="price">Oт $${price} </div>
            <div class="category"> ${kitchen} </div>
          </div>
        </div>
      </a>
    `;

    cardsRestaurants.insertAdjacentHTML('beforeend', card);
  };


  const createCardGood = ({ description, image, name, price, id }) => {
    const card = document.createElement('div');
    card.className = 'card';

    const good = `
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg"> ${name} </h3>
        </div>
        <div class="card-info">
          <div class="ingredients"> ${description} </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart" id="${id}">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold card-price"> $${price} </strong>
        </div>
      </div>
    `;

    card.insertAdjacentHTML('beforeend', good);
    cardsMenu.insertAdjacentElement('beforeend', card);

  };


  const openGoods = (event) => {
    const target = event.target;

    if(login) {
      const restaurant = target.closest('.card-restaurant');

      const cardText = restaurant.lastElementChild;
      const cardHeading = cardText.firstElementChild;
      const cardTitle = cardHeading.firstElementChild.textContent;

      const cardInfo = cardText.lastElementChild;
      const rating = cardInfo.firstElementChild;

      const price = rating.nextElementSibling;

      const category = cardInfo.lastElementChild;



      // console.log(price);

      if(restaurant) {
        cardsMenu.textContent = '';
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');

        restaurantTitle.textContent = cardTitle;
        restaurantRating.textContent = rating.textContent;
        restaurantAverPrice.textContent = price.textContent
        restaurantCategory.textContent = category.textContent

        // const restaurantCategory = document.querySelector('.category');
       
        getData(restaurant.dataset.products).then(data => data.forEach(createCardGood));
      } 
    } else {
        toggleModalAuth();
    }
  };

  const addToCart = (event) => {
    const target = event.target;

    const buttonAddToCart = target.closest('.button-add-cart');
    if(buttonAddToCart) {
      const card = target.closest('.card');
      const title = card.querySelector('.card-title-reg').textContent;
      const cost = card.querySelector('.card-price').textContent;
      const id = buttonAddToCart.id;

      const food = cart.find(item => item.id === id);

      if(food) {
        food.count += 1;
      } else {
        cart.push({
          id, 
          title, 
          cost: +cost.replace('$', ''),
          count: 1
        })
      }
    }

    saveCart();
  }

  const renderCart = () => {
    modalBody.textContent = '';

    cart.forEach(item => {
      const { id, title, cost, count } = item;
      const itemCart = `
        <div class='food-row'>
          <span class="food-name">${title}</span>
          <strong class="food-price">${cost}</strong>
          <div class="food-counter">
            <button class="counter-button counter-minus" data-id=${id}>-</button>
            <span class="counter">${count}</span>
            <button class="counter-button counter-plus" data-id=${id}>+</button>
          </div>
        </div>`
      modalBody.insertAdjacentHTML('afterbegin', itemCart);
    });
    const totalPrice = cart.reduce((result, item) => {
      return +result + (+item.cost * +item.count) 
    }, 0);
    modalPrice.textContent = '$' + totalPrice;
  }

  const changeCount =(event) => {
    const target = event.target;

    if(target.classList.contains('counter-button')) {
      const food = cart.find(item => item.id === target.dataset.id);

      if(target.classList.contains('counter-minus')) {
        food.count--;
        if(food.count == 0) {
          cart.splice(cart.indexOf(food), 1);
        }
      }
      if(target.classList.contains('counter-plus')) food.count++;
      renderCart();
    }
    saveCart();
  }

  function cleanBasket() {
    localStorage.removeItem(login);
    cart.length = 0;
    renderCart();
  }


  const init = () => {
    getData('partners').then(data => {
      cardsRestaurants.firstElementChild.remove();
      data.forEach(item => {
        createCardRestaurant(item); // data.forEach(createCardRestaurant);
      });
    });

    cartButton.addEventListener('click', () => {
      renderCart();
      toggleModal();
    })

    modalBody.addEventListener('click', changeCount);
    cardsRestaurants.addEventListener('click', openGoods);
    closeBasket.addEventListener('click', toggleModal);
    clearBasket.addEventListener('click', cleanBasket);
    cardsMenu.addEventListener('click', addToCart);
    
  };

  checkAuth();

  $(document).ready(function(){
    $('.swiper-wrapper').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false
    });
  });

  init();