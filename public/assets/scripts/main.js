require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
    'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/backbone.wreqr',
    'marionette': 'vendor/marionette/lib/core/backbone.marionette',
    'cookies': 'vendor/jquery.cookie/jquery.cookie',
    'routefilter': 'vendor/routefilter/src/backbone.routefilter',
    'moment': 'vendor/moment/moment',
    'jquery-ui': '../theme/vendor/jquery-ui/jquery-ui.min',
    'slimscroll': '../theme/vendor/slimScroll/jquery.slimscroll.min',
    'bootstrap':  '../theme/vendor/bootstrap/dist/js/bootstrap.min',
    'icheck': '../theme/vendor/iCheck/icheck.min',
    'config': 'config',
    'app': 'app'
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
    }
  },
  deps: ['jquery', 'underscore']
});

require(['app', 'config'], function(App){
  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.xhrFields = {
      withCredentials: true
    };
  });
  App.start();
});