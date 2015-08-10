require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
    'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/backbone.wreqr',
    'marionette': 'vendor/marionette/lib/core/backbone.marionette',
    'mockjax': 'vendor/jquery-mockjax/jquery.mockjax',
    'cookies': 'vendor/jquery.cookie/jquery.cookie',
    'routefilter': 'vendor/routefilter/src/backbone.routefilter',
    'moment': 'vendor/moment/moment',
    'slimscroll': 'lib/jquery.slimscroll',
    'bootstrap':  'vendor/bootstrap/dist/js/bootstrap.min',
    'sticky': 'vendor/jquery.stick/jquery.sticky',
    'waypoints': 'vendor/waypoints/lib/jquery.waypoints.min',
    'toastr':'vendor/toastr/toastr.min',
    'typeahead':'vendor/jquery-typeahead/dist/jquery.typeahead',
    'jquery.validate':'vendor/jquery.validate/dist/jquery.validate.min',
    'facebook': 'lib/facebook',
    'config': 'config',
    'app': 'app',
    'globals': 'globals',
    'socket.io': 'lib/socket.io',
    'isotope': 'vendor/isotope/dist/isotope.pkgd'

  },
  shim: {
    underscore: {
        exports: '_'
    },
    backbone: {
        exports: 'Backbone',
        deps: ['jquery', 'underscore']
    },
    marionette: {
        exports: 'Backbone.Marionette',
        deps: ['backbone']
    },
    mockjax: {
      deps: ['jquery']
    },
    isotope: {
      deps: ['jquery']
    }
  },
  deps: ['jquery', 'underscore']
});

require(['app', 'config', 'globals'], function(App){
  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.crossDomain = {
      crossDomain: true,
    }
    options.xhrFields = {
      withCredentials: true
    };
  });
  App.start();
});
