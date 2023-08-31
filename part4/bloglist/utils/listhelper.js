const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes > item.likes
      ? max
      : item
  }

  const mostLikedBlog = blogs.reduce(reducer, 0)

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

const mostBlogsAuthor = (blogs) => {

  const blogCounts = {};
  blogs.forEach((blog) => {
    if (blogCounts[blog.author]) {
      blogCounts[blog.author]++
    } else {
      blogCounts[blog.author] = 1
    }
  })

  let mostAuthor = ''
  let mostBlogs = 0

  for (const author in blogCounts) {
    if (blogCounts[author] > mostBlogs) {
      mostAuthor = author
      mostBlogs = blogCounts[author]
    }
  }

  return { author: mostAuthor, blogs: mostBlogs };
}

const mostLikesAuthor = (blogs) => {

  const likesByAuthor = {};
  blogs.forEach((blog) => {
    if (likesByAuthor[blog.author]) {
      likesByAuthor[blog.author] += blog.likes || 0;
    } else {
      likesByAuthor[blog.author] = blog.likes || 0;
    }
  });

  let mostAuthor = '';
  let mostLikes = 0;

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > mostLikes) {
      mostAuthor = author;
      mostLikes = likesByAuthor[author];
    }
  }

  return { author: mostAuthor, likes: mostLikes };
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogsAuthor, mostLikesAuthor
  }