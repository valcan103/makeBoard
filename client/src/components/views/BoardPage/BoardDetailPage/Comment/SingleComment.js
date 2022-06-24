import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SingleComment(props) {
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const [ModifyComment, setModifyComment] = useState("")
    const [ModifyState, setModifyState] = useState(false)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault()
        setCommentValue(e.currentTarget.value)
    }

    const modifyhandler = (e) => {
        e.preventDefault()
        setModifyComment(e.currentTarget.value)
    }

    const openReply = () => {
        if(ModifyState) setModifyState(!ModifyState)
        setOpenReply(!OpenReply)
    }

    const modifyComment = () => {
        if(OpenReply) setOpenReply(!OpenReply)
        setModifyState(!ModifyState)
        setModifyComment(props.comment.content)
    }

    const deleteComment = () => {
        const answer = window.confirm("댓글을 정말로 삭제하실건가요?")
        if(answer) {
            let id = props.comment._id
            axios.post("/api/comment/deleteComment", {id})
            .then(response => {
                if(response.data.success) {
                    alert("댓글을 삭제 했습니다.")
                    navigate(0)
                } else {
                    alert("댓글 삭제에 실패했습니다.")
                }
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

    if(user.userData && user.userData.isAuth) {
            let body = {
                content: CommentValue,
                writer: user.userData._id,
                targetBoard: props.boardId,
                responseTo: props.comment._id
            }
            
            axios.post("/api/comment/saveComment", body)
            .then(response => {
                if(response.data.success) {
                    // console.log(response.data.result)
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                    alert("대댓글을 저장했습니다.")
            } else {
                alert("대댓글을 저장하는데 실패했습니다.")
            }
        })
        } else {
            alert("로그인 후 댓글을 작성할 수 있습니다.")
        }
    }

    const onModifySubmit = (e) => {
        e.preventDefault()

        let body = {
            id: props.comment._id,
            content : ModifyComment
        }

        axios.post("/api/comment/modifyComment", body)
        .then(response => {
            if(response.data.success) {
                alert("댓글 수정에 성공했습니다.")
                setModifyState(!ModifyState)
                navigate(0)
            } else {
                alert("댓글 수정에 실패했습니다.")
            }
        })
    }

  return (
    <div>
        <div style={{margin: "20px 0"}}>
            댓글 작성자 : {props.comment.writer.name}
            <br />
            <div style={{border: "1px solid black", borderRadius: "7px", padding: "0px 10px", marginTop: "10px"}}>
                {props.comment.content} 
            </div>
        </div>
        <button style={{marginRight: "10px"}} onClick={openReply}>댓글 달기</button>

        {(((user.userData && user.userData._id) === props.comment.writer._id) || (user.userData && user.userData.role === 1)) && 
            <>
                <button style={{marginRight: "10px"}} onClick={modifyComment}>댓글 수정</button>
                <button onClick={deleteComment}>댓글 삭제</button>
            {ModifyState &&
                <form style={{display: "flex", margin: "20px 0", flexDirection: "row-reverse"}}>
                    <button style={{width: "15%", height: "40px", marginLeft: "20px", borderRadius: "5px", border: "1px solid black"}} onClick={onModifySubmit} >수정 완료</button>
                    <br />
                    <textarea style={{width: "80%", borderRadius: "5px", resize: "none"}} onChange={modifyhandler} value={ModifyComment} placeholder= "수정할 내용을 입력해 주세요" />
                </form>
            }
            </>
        }

        {OpenReply && 
            <form style={{display: "flex", margin: "20px 0", flexDirection: "row-reverse"}}>
                <button style={{width: "15%", height: "40px", marginLeft: "20px", borderRadius: "5px", border: "1px solid black"}} onClick={onSubmit} >작성 완료</button>
                <br />
                <textarea style={{width: "80%", borderRadius: "5px", resize: "none"}} onChange={handleChange} value={CommentValue} placeholder= "대댓글을 입력해 주세요" />
            </form>
        }
    </div>
  )
}

export default SingleComment