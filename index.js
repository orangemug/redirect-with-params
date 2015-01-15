module.exports = function(path) {
  return function(req, res) {
    path = path.replace(/:[^/]+/, function(id) {
      id = id.replace(/^:/,"");
      if(!req.params[id]) {
        throw "Missing param";
      }
      return encodeURIComponent(req.params[id]);
    });

    res.redirect(path);
  };
}
