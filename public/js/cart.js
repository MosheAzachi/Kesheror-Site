function addToCart(userID, itemID) {
  $.ajax({
    url: 'http://127.0.0.1:4000/api/cart',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      userId: userID,
      productId: itemID,
      quantity: 1
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('מוצר נוצר בהצלחה!');
      }
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
}

function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('active');

  const cartCookie = document.cookie.split('; ').find(row => row.startsWith('cart='))?.split('=')[1] || 'null';
  console.log(decodeURIComponent(cartCookie));
  initApp(cartCookie);
}

let listCards = [];
function initApp(cartCookie) {
  cartCookie = JSON.stringify(cartCookie);
  console.log(cartCookie);
  cartCookie.forEach((value, key) => {
    let newLi = document.createElement('li');
    newLi.classList.add('item');
    console.log(value);
    console.log(key);
    newLi.innerHTML = `
      <img src="image/${value.image}">
      <div class="title">${value.name}</div>
      <div class="price">${value.price.toLocaleString()}</div>
      <button onclick="addToCard(${key})">Add To Card</button>
    `;

    document.querySelector('.cartItems').appendChild(newLi);
  });
}
