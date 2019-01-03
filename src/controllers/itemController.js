const itemQueries = require("../db/queries.items");

module.exports = {

    index(req, res, next){

      itemQueries.getAllItems((err, items) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("items/index", {items});
        }
      })
    }

  }