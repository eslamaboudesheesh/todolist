import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Index, MinimongoEngine } from 'meteor/easy:search'


 todo = new Mongo.Collection('todo');
const myCollection = new Index({
  collection: todo,
  fields: ['name'],
  engine: new MinimongoEngine(),
})








Meteor.startup(() => {
  // code to run on server at startup

  if(Meteor.isServer){  
  Meteor.methods({
    addTodo : function(text){
      var currentUserId = Meteor.userId();
      if(currentUserId){
          todo.insert({
              text: text,
              createdAt: new Date(),
              userId : Meteor.userId(),
              username:Meteor.user().username,
              createdBy: currentUserId
          });
      }
  
  /*
       if(!Meteor.userId()){
         throw new Meteor.Error('not-authorized');
       }
       todo.insert({
         text:text,
         createdAt : new Date(),
         userId : Meteor.userId(),
         username: Meteor.user().username
   });
  
  
   */
     }, 
    deleteTodo : function(todoId){
      var todox =todo.findOne(todoId);

      if(todox.userId != Meteor.userId())
      {
        throw new Meteor.Error("not-auth");
      }
       todo.remove(todoId);;
   
     },
     setChecked : function(todoId,setChecked){
       var todox =todo.findOne(todoId);

       if(todox.userId != Meteor.userId())
       {
         throw new Meteor.Error("not-auth");
       }
       todo.update(todoId,{$set:{checked:  setChecked}} );
   




     }
   });

Meteor.publish('todo',function(){
  if (!this.userId ){
return todo.find();
  }else{
return todo.find({userId:this.userId});
  }
});
  

  } });




