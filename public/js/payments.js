const paymentForm = document.querySelector('.form--payment');

if (paymentForm) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.ready(function() {
      '.dropdown-item'.click(function() {
        var selectedOption = this.text();
        '#dropdownMenuButton'.text(selectedOption);
      });
    });
    paymentFunc(locals.user._id, address, phone, payment);
  });
}
paymentFunc = async (userId, address, phone, payment) => {
  $.ajax({
    url: 'http://127.0.0.1:4000/api/payment',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      userId: userId,
      address: address,
      phone: phone,
      payment: payment
    }),
    success: function(data) {
      if (data.status === 'success') {
        alert('ההזמנה התקבלה בהצלחה');
        window.setTimeout(function() {
          location.assign('/');
        }, 1000);
      }
      console.log(data.status);
    },
    error: function(xhr, status, error) {
      alert(xhr.responseJSON.message);
    }
  });
};
