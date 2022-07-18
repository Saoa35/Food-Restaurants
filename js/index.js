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
    const cardsRestaurants = document.querySelector('.cards-restaurants');
  // 

  let login = localStorage.getItem('deliveryFood');

  const getData = async (key) => {
      const data = await firebase.database().ref().child(key).once('value')
      return data.val();
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

  };

  const init = () => {
    getData('partners').then(data => {
      console.log(data);
    })
  }


  $('.swiper-wrapper').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  });