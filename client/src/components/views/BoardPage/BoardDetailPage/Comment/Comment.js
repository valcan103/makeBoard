import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    const [Comment, setComment] = useState("")
    const user = useSelector(state => state.user)

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
      e.preventDefault()

  if(user.userData && user.userData.isAuth) {
          let body = {
              content: Comment,
              writer: user.userData._id,
              targetBoard: props.boardId,
          }
          
          axios.post("/api/comment/saveComment", body)
          .then(response => {
              if(response.data.success) {
                  setComment("")
                  props.refreshFunction(response.data.result)
                  alert("댓글을 저장했습니다.")
          } else {
              alert("댓글을 저장하는데 실패했습니다.")
          }
      })
      } else {
          alert("로그인 후 댓글을 작성할 수 있습니다.")
      }
  }

  return (
    <div style={{width: "100%"}}>
        <p style={{marginTop: "0px"}}>댓글</p>
        <hr />

        {props.CommentLists && props.CommentLists.map((comment, index) => (
          (!comment.responseTo && 
            <div key={index}>
              <SingleComment comment={comment} boardId={props.boardId} refreshFunction={props.refreshFunction} />
              <ReplyComment CommentLists={props.CommentLists} boardId={props.boardId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
            </div>
          )
        ))}

        <form style={{display: "flex", marginTop: "10px"}}>
            <textarea style={{width: "90%", borderRadius: "5px", resize: "none"}} onChange={handleChange} value={Comment} placeholder= "댓글을 입력해 주세요" />
            <br />
            <button style={{width: "15%", height: "70px", marginLeft: "20px", borderRadius: "5px", border: "1px solid black"}} onClick={onSubmit} >작성 완료</button>
        </form>
    </div>
  )
}

export default Comment