define(["marionette"], function(){
  var filterBox = Backbone.Marionette.ItemView.extend({
    template: "#js-filter-box-tmpl",

    ui: {
      listItem: '.js-list',
      searchInput: '.js-search',
      clearInput: '.js-clear',
      input: '.js-input'
    },

    events: {
      "click @ui.listItem"  : "addActiveList",
      "click @ui.searchInput"  : "addActiveInput",
      "click @ui.clearInput"  : "removeInputActive",
      "focus @ui.input"  : "addActiveParent"
    },

    addActiveList: function(event){
      this.ui.searchInput.removeClass('input_active');
      this.ui.listItem.removeClass('filter_active');
      $(event.target).addClass('filter_active');
      //App.iso.filter()
    },

    addActiveInput: function(event){
      this.ui.listItem.removeClass('filter_active');
      $(event.target).addClass('input_active');
      App.iso.filter()
    },

    removeInputActive: function(event){
      this.ui.searchInput.removeClass('input_active');
      this.ui.listItem.first().addClass('filter_active');
      event.stopImmediatePropagation();
    },

    addActiveParent: function(event){
      this.ui.listItem.removeClass('filter_active');
      $(event.target.parentElement).addClass('input_active');
    }
  });

  return filterBox;
});