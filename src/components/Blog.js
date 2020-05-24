import React from 'react'
const Blog = (props) => (
  <div>
    {props.blog.title} {props.blog.author.name}
  </div>
)

export default Blog
