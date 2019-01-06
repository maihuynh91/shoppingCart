
module.exports = {
    // takes Express instance when called & mounts middleware & route needed for fake authorization endpoint.
          fakeIt(app){
        // #2
            let role, id, email; 
        // #3
            function middleware(req,res,next){
        
        // #4
              role = req.body.role || role;
              id = req.body.userId || id;
              email = req.body.email || email;
        
        // #5
              if(id && id != 0){
                req.user = {
                  "id": id,
                  "email": email,
                };
              } else if(id == 0) {
                delete req.user;
              }
              if( next ){ next() }
            }   
        // #6
            function route(req,res){
              res.redirect("/")
            }  
        // #7
            app.use(middleware)
            app.get("/auth/fake", route)
          }
    
        }