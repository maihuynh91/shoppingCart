module.exports = class ApplicationPolicy {

    // #1
     constructor(user, record) {
       this.user = user;
       this.record = record;
     }
   
    // #2
     _isOwner() {
       return this.record && (this.record.userId == this.user.id);
     }
   
     new() {
        return this.user != null;
      }

      create() {
        return this.new();
      }

      show(){
          return this.new();
      }
     
      edit() {
        return this.show();
      }
     
      update() {
        return this.edit();
      }
     
      destroy() {
        return this.update();
      }
   }