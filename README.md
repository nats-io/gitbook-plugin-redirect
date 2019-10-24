# gitbook-plugin-redirect-sub

This GitBook plugin can redirect gitbook page.

## Usage

Add to your `book.json` plugin list:
```json
{
    "plugins" : [ "redirect-sub@https://github.com/nats-io/gitbook-plugin-redirect-sub.git" ],
    "pluginsConfig": {
        "redirect_sub" : {
            "root" : "your-redirect-url-root",
            "bookname" : "your-book-name"
        }
    }
}
```

For example, when you write below config in `book.json`,

```json
"redirect_sub" : {
    "root" : "https://books.example.com",
}
```

and you access to `https://example.gitbook.io/xxx/yyy.html` , you will be redirected to `https://books.example.com/xxx/yyy.html`.


## Credits
This plugin reuses many codes of [gitbook-plugin-redirect](https://github.com/ketan/gitbook-plugin-redirect) Plugin. Many thanks to ketan.

