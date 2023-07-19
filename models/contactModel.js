const mognoose = require('mongoose');

const contactSchema = new mognoose.Schema({
  name: {
    type: String,
    required: [true, 'You must enter name!']
  },
  email: {
    type: String,
    required: [true, 'You must enter email!']
  },
  description: {
    type: String,
    required: [true, 'You must enter description!']
  }
});

const Contact = mognoose.model('Contact', contactSchema);

module.exports = Contact;