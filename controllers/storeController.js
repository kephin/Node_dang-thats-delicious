const mongoose = require('mongoose');

const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', {
    title: 'Add store',
  });
};

exports.createStore = async(req, res) => {
  const store = await Store.create(req.body);
  req.flash('success', `Successfully Created ${store.name}`);
  res.redirect('/');
  // const store = new Store(req.body);
  // try {
  //   await store.save();
  //   res.redirect('/');
  // } catch (err) {
  //   throw Error(err);
  // }
};
