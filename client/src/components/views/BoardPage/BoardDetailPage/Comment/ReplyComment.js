import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0;
        props.CommentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    })

    const renderReplyComment = (parentCommentId) => (
        props.CommentLists && props.CommentLists.map((comment, index) => (
            <div key={index}>
                {/* {console.log(comment)}
                {console.log(index+"responseTo : " +comment.responseTo, "Parent : " +parentCommentId, "comment : "+ comment.content )} */}
                {comment.responseTo === parentCommentId && 
                    <div style={{marginLeft: "50px"}}>
                        <SingleComment comment={comment} boardId={props.boardId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} boardId={props.boardId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </div>
        ))
    )

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

  return (
    <div>
        {ChildCommentNumber > 0 && 
            <p style={{fontSize: "14px", margin: "0", color: "gray"}} onClick={handleChange}>댓글 {ChildCommentNumber}개 더 보기</p>
        }

        {OpenReplyComments && 
            renderReplyComment(props.parentCommentId)
        }
    </div>
  )
}

export default ReplyComment