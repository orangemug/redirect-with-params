# redirect-with-params
A helper for [express.js](expressjs.com) to redirect with url params intact


## Example
So configured with the following

    req.get("/users/:id", redirectWithParams("/foo/:id"));

The url `/users/12` will redirect to `/foo/12`


## License
MIT
