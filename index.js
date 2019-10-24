module.exports = {
  hooks: {
    "page:before": function(page) {

      var root = this.config.options.pluginsConfig.redirect_sub.root;

      if (root === '') {
        return page;
      }
      var path = require('path');
      
      /* this will require manually checking every page for changes, just redirect to root every time

      var dirname = path.dirname(page.path);
      var pagename = path.basename(page.rawPath).replace('.md', '.html').replace('README.html', '').replace('intro.html', '').replace('.html', '');

      var renames = new Map([
        ['developer', 'developing-with-nats'],
        ['nats_server', 'nats-server'],
        ['nats_streaming', 'nats-streaming-concepts']
      ]);

      renames.forEach((value, key) => {
        dirname = dirname.replace(key, value);
      })

      var redirectPath = pagename !== '' ? root + "/" + dirname + "/" + pagename : root + "/" + dirname;
      */
      
      var redirectPath = root; // send everything to root

      var redirectPageContent = function(path){
        return '' +
          '<link rel="canonical" href="' +  path + '">\n' +
          '<meta http-equiv=refresh content="0; url=' + encodeURI(path) + '">\n' +
          '<h1>Redirecting...</h1>\n' +
          '<p>\n' +
          '  This page has moved to \n' +
          '  <a href="' + path + '">' + path +'</a>.\n' +
          '</p>\n' +
          '<p>\n' +
          '  <a href="' + path + '">Click here</a> if you are not redirected.\n' +
          '</p>\n' +
          '<script>window.location.href="' + path + '";</script>\n';
      };
      page.content = redirectPageContent(redirectPath) + page.content;
      return page;
    }
  }
};
