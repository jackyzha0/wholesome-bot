var express = require('express');
var router = express.Router();
const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'wholesome bot by /u/circleguy12 v1.0',
  clientId: 'someID',
  clientSecret: 'someSecret',
  refreshToken: 'refreshToken'
});

router.get('/', function(req, res, next) {
  return res.sendFile('index.html', {
    root: __dirname
  })
});

router.post('/', function(req, res, next) {
  var subreddits = subreddits = ['aww', 'eyebleach', 'wholesomememes']
  var s = subreddits.join('+')
  var p = Promise.resolve(r.getSubreddit(s).getTop({
    limit: 100,
    time: 'day'
  }));

  p.then(function(posts) {
    var post = posts[Math.floor(Math.random() * posts.length)]
    if (post.url.includes("v.redd")) {
      var ret = {
        'title': post.title,
        'url': post.url,
        'is_video': true,
        'plink': post.permalink,
        'v_url': post.media.reddit_video.fallback_url
      }
    } else if (post.url.includes("gfycat")) {
      var ret = {
        'title': post.title,
        'url': post.url,
        'plink': post.permalink,
        'gfy': post.media.oembed.html,
        'is_video': false
      }
    } else {
      var ret = {
        'title': post.title,
        'url': post.url,
        'plink': post.permalink,
        'is_video': false
      }
    }
    console.log(ret)
    return res.json(ret)
  })
})

module.exports = router;
