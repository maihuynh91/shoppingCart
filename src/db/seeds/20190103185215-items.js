'use strict';
const faker = require("faker");

let items = [];

for(let i = 1 ; i <= 15 ; i++){
  items.push({
    name: faker.hacker.noun(),
    description: faker.hacker.phrase(),
    image: faker.image.food(),
    price:faker.random.number({min:5, max:10}),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Items", items, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */ 
   return queryInterface.bulkDelete("Items", null, {});
  }
};
