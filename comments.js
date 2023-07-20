// Create web server

var express = require('express');
var router = express.Router();
var fs = require('fs');

var comments = require('../data/comments');

// GET /comments
router.get('/', function(req, res, next) {
  res.json(comments);
});

// GET /comments/1
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var comment = comments[id];
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// POST /comments
router.post('/', function(req, res, next) {
  var comment = req.body;
  var id = comments.length;
  comment.id = id;
  comments.push(comment);
  res.json(comment);
});

// PUT /comments/1
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var comment = comments[id];
  if (comment) {
    comments[id] = req.body;
    res.json(comments[id]);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// DELETE /comments/1
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  var comment = comments[id];
  if (comment) {
    comments[id] = null;
    res.json({ deleted: true });
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

module.exports = router;


