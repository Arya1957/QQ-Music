var jsbin = {
  'root': 'http://jsbin.com',
  'shareRoot': 'http://jsbin.com',
  'runner': 'http://null.jsbin.com/runner',
  'static': 'http://static.jsbin.com',
  'version': '4.1.4',
  user: {"name":"Arya1957","bincount":75,"created":"2018-05-25T12:20:20.000Z","pro":0,"settings":{"panels":["html","live"],"editor":{},"font":14,"addons":{"closebrackets":true,"highlight":false,"vim":false,"emacs":false,"trailingspace":false,"fold":false,"sublime":false,"tern":false,"activeline":true,"matchbrackets":false},"includejs":true,"gui":{"toppanel":false}}},
};

(function () {
  if (jsbin.user && jsbin.user.name) {
    if (window.FS) {
      FS.identify(jsbin.user.name, {
        displayName: jsbin.user.name,
        reviewsWritten_int: 14,
      });
    }
    $('.loggedout').hide();
    var menu = $('.loggedin').show();
    var html = $('#profile-template').text();
    var $html = $(html.replace(/({.*?})/g, function (all, match) {
      var key = match.slice(1, -1).trim(); // ditch the wrappers
      return jsbin.user[key] || '';
    }));
    if (jsbin.user.pro) {
      document.documentElement.className += ' pro';
      $html.find('.gopro').remove();
    } else {
      $html.find('.pro').remove();
    }
    $('#control .loggedin').append($html);
  } else {
    $('.loggedin').hide();
    $('.loggedout').show();
  }
})();
