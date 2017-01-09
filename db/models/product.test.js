// /* eslint-disable no-unused-expressions */
// 'use strict';

// var expect = require('chai').expect;
// var Bluebird = require('bluebird');

// const bcrypt = require('bcrypt');
// var db = require('APP/db');
// var Product = require('./product');

// describe('Product', function() {
//   before(function() {
//     return db.sync({force: true});
//   });
//   afterEach(function() {
//     return db.sync({force: true});
//   });

//   beforeEach(function(){
//     return Bluebird.all([
//       Product.create({
//       title: 'CHEERIO, SINGULAR',
//       summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
//       price: 123,
//       inventory: 80,
//       calories: 1,
//       sugar: 5,
//       fiber: 1,
//       protein: 800,
//       }),
//       Product.create({
//         summary: 'i am a bad short summary',
//       })
//     ]);
//   });


//   it('has the valid test', function() {
//     return Product.findOne({
//       where: {
//         id: 1
//       }
//     })
//     .then(function(foundProduct) {
//       expect(foundProduct.title).to.equal('CHEERIO, SINGULAR');
//       expect(foundProduct.summary).to.be.a('string');
//       expect(foundProduct.price).to.be.a('integer');
//     })
//   });

// });
