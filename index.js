module.exports = {
  hooks: {
    "page:before": function(page) {

      var root = this.config.options.pluginsConfig.redirect_sub.root;

      if (root === '') {
        return page;
      }
      
      var path = require('path');

      var dirname = path.dirname(page.path);
      var pagename = path.basename(page.rawPath).replace('README.md', '').replace('md', 'html');

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
      var redirectPath = root + "/" + dirname + "/" + pagename;
      page.content = redirectPageContent(redirectPath) + page.content;
      return page;
    }
  }
};
