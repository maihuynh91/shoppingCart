const Item = require("./models").Item;

module.exports = {

    getAllItems(callback){
        return Item.all()
        .then((items) => {
            callback(null, items);
        })
        .catch((err) => {
            callback(err)
        })
    }


}