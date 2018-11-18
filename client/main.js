import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Index, MinimongoEngine } from 'meteor/easy:search'

import './main.html';

Meteor.subscribe("todo");
    todo = new Mongo.Collection('todo');
  const myCollections = new Index({
    collection: todo,
    fields: ['text'],
    engine: new MinimongoEngine(),
  })
  



Template.search.rendered = function () {
   AutoCompletion.init("input#searchBox");
 }

 Template.search.events = {
   'keyup input#searchBox': function () {
     AutoCompletion.autocomplete({
       element: 'input#searchBox',       // DOM identifier for the element
       collection: todo,              // MeteorJS collection object
       field: 'text',                    // Document field name to search for
       limit: 0,                         // Max number of elements to show
       sort: { name: 1 }});              // Sort object to filter results with
       //filter: { 'gender': 'female' }}); // Additional filtering
   }
 }


 Template.search.helpers({
  myCollections: () => myCollections,
});




Template.todo.onCreated(function helloOnCreated() {

});

Template.todo.helpers({

   todo: function(){
      // make  todolist revers
      return todo.find({},{sort: {createdAt: -1}});
   }
});

Template.todo.events({
"submit .todo-form": function(event){
   event.preventDefault();
    var textDoto = $("input").val();
console.log(textDoto, "you insert data now");
   Meteor.call("addTodo",textDoto);


    $(".todo-form input").val("");



  return false;

  
  },

  "click .toggle-checked" :function(){
  Meteor.call("setChecked",this._id, !this.checked);
    console.log(this._id);
  },
  "click .delete-todo":function(){
    if(confirm('Are you sure ?')){
  Meteor.call('deleteTodo',this._id);
    }
  }
});

Accounts.ui.config({
  passwordSignupFields : "USERNAME_ONLY"
});






