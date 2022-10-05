import React, { useEffect, useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import './Post.scss'

const Post = (props) => {

  const [likes, setLikes] = useState({
    user_likes: false,
    total_likes: 0
  })
  
  const [editInput, setEditInput] = useState({
    editing: false
  });
  const [inputContent, setInputContent] = useState(props.content);

  const edit = () => {
    setEditInput({
      editing: true
    });
  };

  let viewMode = {};
  let editMode = {};

  if (editInput.editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditInput({ editing: false });
      editPost();
    }
  };
  //console.log('props.post.id', props.postID);
  
  const editPost = async() => {
   await axios.put(`/posts/${props.postID}`, { 
      content: inputContent
     })
      .then((res) => {
        console.log("axios.put post data: ", res.data[0]);
          //props.setPosts([res.data[0]]); //updates but removes older posts.
          //props.setPosts(prev => [...prev, res.data[0]]); //updates but creates duplicate.
          props.refetch();
          
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = async() => {
    await axios.delete(`/posts/${props.postID}`)
      .then((res) => {
        console.log("axios.delete data: ", res.data);
        props.refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNumberOfLikes = async () => {
    // query db for post_likes where post_id == post
    await axios.get(`/posts/postlikes/${props.postID}`)
      .then(res => {
        console.log("Post LIKES:", res.data[0]);
        console.log('Number of likes:', res.data[0].count);
        setLikes({
          total_likes: res.data[0].count
        });
      })
      .catch(e => console.log(e));
  }
  //fetchNumberOfLikes();

  useEffect(() => {
    fetchNumberOfLikes();
  }, []);

  return ( 
    <div className="post-body">
      <div className='post-title'>
        <img src={props.creator_image} alt='Creators profile' />
        <h4>{props.creator_name}</h4>
        {props.userID === props.creator && 
        <div className="edit-delete">
          <Dropdown>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              <i class="fa-solid fa-ellipsis"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item id="edit" style={viewMode} onClick={edit}><i className="fa-solid fa-pen-to-square"></i> Edit</Dropdown.Item>
              <Dropdown.Item id="delete" onClick={deletePost}><i  className="fa-solid fa-trash"></i> Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>}
      </div>
      <p><span style={viewMode} className="post-content">{inputContent ? inputContent : props.content}</span>
      <input 
        className="input-field-post"
        type="text"
        style={editMode}
        placeholder={props.content}
        value={inputContent}
        onChange = {(event) => {
          setInputContent(event.target.value)}
        }
        onKeyDown={onKeyDown}
      />
      </p>
      {props.image_url && <img className="post-image" src={props.image_url} alt='Pic' />}
      <div className='post-like-comment'>
        <span><i className="fa-solid fa-paw"></i>{likes.total_likes}</span>
        <i className="fa-solid fa-comments"></i>
      </div>
      <div className='post-footer'>
        {/* Comments will go here. Needs logged in users img and a textarea */}
        {/* User pic
        <input placeholder='Write a comment...' /> */}
      </div>
    </div>
  );
}
 
export default Post;

// <span className="dropdown-list" onClick={(e) => {e.target.style.display = 'block'}}>
// <i class="fa-solid fa-ellipsis">
//   <ul className="dropdown-content" >
//     <li>Edit</li>
//     <li>Delete</li>
//   </ul>
// </i>
// </span>