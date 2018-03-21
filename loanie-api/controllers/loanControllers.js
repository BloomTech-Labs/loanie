const Post = require('../models/postModels');

const postCreate = (req, res) => {
  const { username, thumbnailUrl, imageUrl, likes, timestamp, comments } = req.body;
  const newPost = new Post({ username, thumbnailUrl, imageUrl, likes: 0, timestamp, comments: [] });
  // console.log("newPost: ", newPost);
  newPost.save(newPost, (err, savedpost) => {
    if (err) {
      console.log("err: ", err);
      res.status(500).json(err);
      return;
    }
    res.json(savedpost);
  })
};

const postsGetAll = (req, res) => {
  Post.find({})
    .then(posts => {
      res.json(posts)
    })
    .catch(err => res.status(422).json(err));
};

// const postGetById = (req, res) => {
//   const { id } = req.params;
//   Post.findById(id)
//     .populate('username comments.username', 'username')
//     .exec()
//       .then((singlePost) => {
//         if (singlePost === null) throw new Error();
//         res.json(singlePost);
//       })
//         .catch(err => res.status(422).json(err));
// };

const postAddComment = (req, res) => {
  const { id, username, text } = req.body;
  const comment = { username, text };
  // find a single post
  // grab comments array, add our comment to it.
  // save post
  Post.findById(id)
    .then(post => {
      if (post === null) throw new Error();
      const comments = post.comments;
      comments.push(comment);
      post.save(post, (err, savedpost) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json(savedpost);
      })
    }).catch(err => res.status(422).json({ error: 'No Post!' }));
};

const postAddLike = (req, res) => {
  const { id } = req.body;
  // find a post with the "id"
  // grab likes count, add 1 like to it.
  // save post
  Post.findById(id)
    .then(post => {
      if (post === null) {
        console.log("null post for " + id);
        throw new Error();
      }
      ++post.likes;
      post.save(post, (err, savedpost) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json(savedpost);
      })
    }).catch(err => res.status(422).json({ error: 'No Post!' }));
};

module.exports = {
  postCreate,
  postsGetAll,
  //postGetById,
  postAddComment,
  postAddLike,
};