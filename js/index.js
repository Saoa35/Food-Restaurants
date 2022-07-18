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

  let login = localStorage.getItem('deliveryFood');

  const getData = async (key) => {
      const data = await firebase.database().ref().child(key).once('value')
      return data.val();
  }

  const createCardRestaurant = (restaurant) => {

    const { image, name, price, stars, products, kitchen, time_of_delivery } = restaurant;

    const card = `
        <a class="card card-restaurant" data-products="//">
        <img src="" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title"> /// </h3>
            <span class="card-tag tag"> /// </span>
          </div>
          <div class="card-info">
            <div class="rating">
              ///
            </div>
            <div class="price">Oт /// </div>
            <div class="category"> /// </div>
          </div>
        </div>
      </a>
    `

  }

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