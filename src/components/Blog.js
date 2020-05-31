import React, { useState } from 'react'

const Blog = (props) => {
  const [showInfo, setShowInfo] = useState('none') 
  const toggleShow = () => {return showInfo ? setShowInfo('') : setShowInfo('none')} 
  const handleLikeClick = (event) => {
    // prevent event, call higher level comp func
    event.preventDefault()
    props.incrementLikesForBlog(props.blog.id)
  }
  const handleDeleteClick = (event) => {
    // prevent event, call higher level comp func
    event.preventDefault()
    props.deleteBlog(props.blog.id)
  }
  return (
  <div className='blogComponent'>
    <div className="blogTitle">{props.blog.title}</div> 

    <button onClick={toggleShow} className='toggleShowButton'>{`${showInfo ? 'show' : 'hide'} info`}</button> 
    <button onClick={handleDeleteClick} id='deleteBlogButton'>delete blog</button> 

    <div className='moreInfo' style={{display: showInfo}}>
      <div className='url'>{props.blog.url}</div>
      <div className='likes'>{props.blog.likes}<button onClick={handleLikeClick}>like</button></div>
      About the author
      <div>{props.blog.author.name}</div>
      <div>{props.blog.author.username}</div>
      <div>{`his user id: ${props.blog.author.id}`}</div>
    </div>
  </div>
)}

export default Blog
