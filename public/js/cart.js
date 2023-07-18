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