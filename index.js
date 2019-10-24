module.exports = {
  hooks: {
    "page:before": function(page) {

      var root = this.config.options.pluginsConfig.redirect_sub.root;

      if (root === '') {
        return page;
      }

      var custom = new Map([
        ['nats_server/monitoring.html', root + '/nats-server/configuration/monitoring'],
      ]);
      var redirectPath = root; // send everything to root by default
      var pagePath = page.path;
      console.log("pagepath", pagePath);

      custom.forEach((value, key) => {
        if (pagePath.endsWith(key)) {
          redirectPath = value;
        }
      });
      console.log("redirectPath", redirectPath);
      
      /* keeping this code, many things were renamed so we would have to manual checking every page for changes, just redirect to root every time
      var path = require('path');
      var dirname = path.dirname(page.path);
      var pagename = path.basename(page.rawPath).replace('.md', '.html').replace('README.html', '').replace('intro.html', '').replace('.html', '');
      var redirectPath = pagename !== '' ? root + "/" + dirname + "/" + pagename : root + "/" + dirname;
      */

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
