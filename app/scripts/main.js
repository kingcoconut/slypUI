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
    'slimscroll': 'lib/jquery.slimscroll',
    'bootstrap':  '../theme/vendor/bootstrap/dist/js/bootstrap.min',
    'icheck': '../theme/vendor/iCheck/icheck.min',
    'sticky': 'vendor/jquery.stick/jquery.sticky',
    'waypoints': 'vendor/waypoints/lib/jquery.waypoints.min',
    'toastr':'vendor/toastr/toastr.min',
    'facebook': 'lib/facebook',
    'config': 'config',
    'app': 'app',
    'globals': 'globals',
    'socket.io': 'lib/socket.io'
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

require(['app', 'config', 'globals'], function(App){
  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.xhrFields = {
      withCredentials: true
    };
  });
  App.start();

  // function statusChangeCallback(response) {
  //   console.log('statusChangeCallback');
  //   console.log(response);
  //   // The response object is returned with a status field that lets the
  //   // app know the current login status of the person.
  //   // Full docs on the response object can be found in the documentation
  //   // for FB.getLoginStatus().
  //   if (response.status === 'connected') {
  //     // Logged into your app and Facebook.
  //     testAPI();
  //   } else if (response.status === 'not_authorized') {
  //     // The person is logged into Facebook, but not your app.
  //     document.getElementById('status').innerHTML = 'Please log ' +
  //       'into this app.';
  //   } else {
  //     // The person is not logged into Facebook, so we're not sure if
  //     // they are logged into this app or not.
  //     document.getElementById('status').innerHTML = 'Please log ' +
  //       'into Facebook.';
  //   }
  // }

  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '833470213397379',
  //     cookie     : true,  // enable cookies to allow the server to access
  //                         // the session
  //     xfbml      : true,  // parse social plugins on this page
  //     version    : 'v2.2' // use version 2.2
  //   });

  //   FB.getLoginStatus(function(response) {
  //     App.start({facebook_status: response.status});
  //     statusChangeCallback(response);
  //   });

  // };

  // // Load the SDK asynchronously
  // (function(d, s, id) {
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) return;
  //   js = d.createElement(s); js.id = id;
  //   js.src = "http://connect.facebook.net/en_US/sdk.js";
  //   fjs.parentNode.insertBefore(js, fjs);
  // }(document, 'script', 'facebook-jssdk'));

  // // Here we run a very simple test of the Graph API after login is
  // // successful.  See statusChangeCallback() for when this call is made.
  // function testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //     console.log('Successful login for: ' + response.name);
  //     document.getElementById('status').innerHTML =
  //       'Thanks for logging in, ' + response.name + '!';
  //   });
  // }
});