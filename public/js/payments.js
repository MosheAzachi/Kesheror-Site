const paymentForm = document.querySelector('.form--payment');

if (paymentForm) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const fullName = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('selectPayment').value;
    const userId = document.querySelector('#sendOrder').value;
    paymentFunc(userId, fullName, address, phone, payment);
  });
}
paymentFunc = async (userId, fullName, address, phone, payment) => {
  // Phone number validation using regular expression
  const phonePattern = /^\d+$/; // Only allow digits (0-9)

  if (!phonePattern.test(phone)) {
    alert('Please enter a valid phone number with only digits (0-9).');
    return;
  }

  $.ajax({
    url: 'http://127.0.0.1:4000/api/payment',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      userId: userId,
      fullName: fullName,
      address: address,
      phone: phone,
      payment: payment
    }),
    success: function(data) {
      if (data.message === 'success') {
        alert('ההזמנה התקבלה בהצלחה');
        window.setTimeout(function() {
          location.assign('/');
        }, 1000);
      }
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};
