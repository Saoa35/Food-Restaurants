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

    const modalAuth = document.querySelector('.modal-auth');
    const cardsRestaurants = document.querySelector('.cards-restaurants');
    const cardsMenu = document.querySelector('.cards-menu');
    const containerPromo = document.querySelector('.container-promo');
    const restaurants = document.querySelector('.restaurants');
    const menu = document.querySelector('.menu');
  // 

  let login = localStorage.getItem('deliveryFood');

  const getData = async (key) => {
      const data = await firebase.database().ref().child(key).once('value')
      return data.val();
  };


  const notAuthorised = () => {

    const logIn = (event) => {
      event.preventDefault();
    }

  }

  const toggleModalAuth = () => {
    modalAuth.classList.toggle('is-open');
  }

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

      if(!restaurant) {
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


  const init = () => {
    getData('partners').then(data => {
      cardsRestaurants.firstElementChild.remove();
      data.forEach(item => {
        createCardRestaurant(item); // data.forEach(createCardRestaurant);
      });
    });

    cardsRestaurants.addEventListener('click', openGoods);
  };


  $(document).ready(function(){
    $('.swiper-wrapper').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false
    });
  });

  init();