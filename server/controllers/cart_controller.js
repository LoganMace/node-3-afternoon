const swag = require('../models/swag');

module.exports = {
  addItem: (req, res, next) => {
    const {cart} = req.session.user;
    const index = cart.findIndex(swag => swag.id == req.query.id);
    if(index === -1){
      const selectedSwag = swag.find(swag => swag.id == req.query.id);
      cart.push(selectedSwag);
      req.session.user.total += selectedSwag.price;
    }
    res.status(200).json(req.session.user);
  },
  deleteItem: (req, res, next) => {
    let {cart} = req.session.user;
    const selectedSwag = swag.find(swag => swag.id == req.query.id);
    // if(selectedSwag){
    //   cart = cart.filter(item => item.id != req.params.id);
    //   req.session.user.total -= selectedSwag.price;
    // }
    if ( selectedSwag ) {
      const index = cart.findIndex( swag => swag.id == req.query.id );
      cart.splice(index, 1);
      req.session.user.total -= selectedSwag.price;
    }
    res.status(200).json(req.session.user);
  },
  checkout: (req, res, next) => {
    const {user} = req.session;
    user.cart = [];
    user.total = 0;
    res.status(200).json(req.session.user);
  }
};