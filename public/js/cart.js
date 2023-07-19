window.addEventListener('load', updateQuantity);
document.getElementById('checkOut').addEventListener('click', function() {
  window.location.href = '../../payments';
});
document.getElementById('goToStore').addEventListener('click', function() {
  window.location.href = '../../store';
});

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
      toggleCart();
      updateQuantity();
      updateButtonsVisibility();
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
}

function updateButtonsVisibility() {
  const cartItems = document.querySelector('.cartItems');
  const totalPrice = document.querySelector('.totalPrice');
  const noItemsMessage = document.getElementById('noItemsMessage');
  const checkOutBtn = document.getElementById('checkOut');
  const goToStoreBtn = document.getElementById('goToStore');

  if (cartItems.children.length === 0) {
    checkOutBtn.style.display = 'none';
    goToStoreBtn.style.display = 'block';
    totalPrice.style.display = 'none';
    noItemsMessage.style.display = 'block';
  } else {
    checkOutBtn.style.display = 'block';
    goToStoreBtn.style.display = 'none';
    totalPrice.style.display = 'block';
    noItemsMessage.style.display = 'none';
  }
}

function updateQuantity() {
  // Get the span element by its class name
  const quantitySpan = document.querySelector('.quantity');
  const cartCookie = getCart();

  if (!cartCookie) {
    quantitySpan.innerText = '0';
  } else {
    // Update the content of the span element with the new quantity value
    quantitySpan.innerText = cartCookie.totalProducts;
  }
}

function openCartSlide() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('active');
}

function toggleCart() {
  const cartCookie = getCart();

  if (!cartCookie) {
    return;
  }
  document.querySelector('.totalPrice').innerText = 'סה"כ: ' + cartCookie.totalPrice + ' ש"ח';
  initApp(cartCookie);
}

function getCart() {
  const cartCookie =
    document.cookie
      .split('; ')
      .find(row => row.startsWith('cart='))
      ?.split('=')[1] || 'null';
  const cart = JSON.parse(decodeURIComponent(cartCookie));
  return cart;
}

function initApp(cart) {
  deleteAllLiElements();
  const userId = cart.userId;
  cart.items.forEach((value, key) => {
    let newLi = document.createElement('li');
    newLi.classList.add('item');
    newLi.innerHTML = `
      <img src="${value.productImage}">
      <div class="title">שם: ${value.productName}</div>
      <div class="title">כמות: ${value.quantity}</div>
      <div class="price">מחיר: ${value.price * value.quantity} ש"ח</div>
      <button onclick="deleteInCart('${userId}','${value.productId}')">מחק</button>
    `;

    document.querySelector('.cartItems').appendChild(newLi);
  });
}

function deleteAllLiElements() {
  const ulElement = document.querySelector('.cartItems');
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
}

function deleteCart(ID) {
  $.ajax({
    url: `http://127.0.0.1:4000/api/cart/${ID}`,
    type: 'DELETE',
    success: function(data) {
      if (!data) {
        window.location.reload();
      }
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
}

function deleteInCart(userId, productId) {
  $.ajax({
    url: `http://127.0.0.1:4000/api/cart/${userId}`,
    type: 'PATCH',
    contentType: 'application/json',
    data: JSON.stringify({
      productId: productId
    }),
    success: function(data) {
      if (data.status === 'success') {
        toggleCart();
        updateQuantity();
        updateButtonsVisibility();
      }
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
}
