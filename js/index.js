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

    const cartButton = document.querySelector('#cart-button');
    const modalAuth = document.querySelector('.modal-auth');
    const loginInput = document.querySelector('#login');
    const loginForm = document.querySelector('#logInForm');
    const buttonAuth = document.querySelector('.button-auth');
    const buttonOut = document.querySelector('.button-out');
    const closeAuth = document.querySelector('.close-auth');

    const userName = document.querySelector('.user-name');
    const modalBody = document.querySelector('.modal-body');

    const cardsRestaurants = document.querySelector('.cards-restaurants');
    const cardsMenu = document.querySelector('.cards-menu');
    const containerPromo = document.querySelector('.container-promo');
    const restaurants = document.querySelector('.restaurants');
    const menu = document.querySelector('.menu');

  // 

  let login = localStorage.getItem('deliveryFood');


  const cart = [];  // корзина

  const loadCart = () => {
    if(localStorage.getItem(login)) {
      JSON.parse(localStorage.getItem(login)).forEach(item => {
        cart.push();
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

      if(restaurant) {
        cardsMenu.textContent = '';
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');

        // console.log(restaurant.dataset.products);
        getData(restaurant.dataset.products).then(data => data.forEach(createCardGood));
      } 
    } else {
        toggleModalAuth();
    }
  };

  const renderCart = () => {
    modalBody.textContent = '';
  }

  const init = () => {
    getData('partners').then(data => {
      cardsRestaurants.firstElementChild.remove();
      data.forEach(item => {
        createCardRestaurant(item); // data.forEach(createCardRestaurant);
      });
    });

    cartButton.addEventListener('click', () => {
      // renderCart();();
        // toggleModal();
    })

    cardsRestaurants.addEventListener('click', openGoods);
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