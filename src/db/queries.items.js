const Item = require("./models").Item;

module.exports = {

    getAllItems(userId,callback){
        return Item.findAll({
            where: {
              userId
            }
          })
        .then((items) => {
            callback(null, items);
        })
        .catch((err) => {
            callback(err)
        })
    },
    /* newItem: a plain JS object with the attributes to set for the topic, second is a callback */
    addItem(newItem, callback){
        return Item.create({
            name: newItem.name,
            description: newItem.description,
            userId: newItem.userId,
        })
        .then((item) => {
            callback(null, item);
        })
        .catch((err) => {
            callback(err)
        })
    },

    getItem(id, callback){
        return Item.findById(id)
        .then((item) => {
          callback(null, item);
        })
        .catch((err) => {
          callback(err);
        })
      },

    deleteItem(id, callback){
        return Item.destroy({ //destroy method from Item model
            where: {id}
        })
        .then((item) => {
            callback(null, item);
        })
        .catch((err) => {
            callback(err);
        })
    },

    updateItem(id, updatedItem, callback){
        return Item.findById(id)
        .then((item) => {
          if(!item){
            return callback("Item not found");
          }
   
//We specify which values to target for the update by passing an array of keys to the fields property. 
          item.update(updatedItem, {
            fields: Object.keys(updatedItem)
          })
          .then(() => {
            callback(null, item);
          })
          .catch((err) => {
            callback(err);
          });
        });
      }


}