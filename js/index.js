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
      const data = await firebase.database().ref().child(key).once('value').val()
      return data;
  }

  const init = () => {

  }


  $('.swiper-wrapper').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  });