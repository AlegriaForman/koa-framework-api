module.exports = exports = function(err) {
  console.log(err);
  this.response.status(500);
  this.response.body = 'Internal server error.';
};
