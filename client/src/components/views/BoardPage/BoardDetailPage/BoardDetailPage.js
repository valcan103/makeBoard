import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import "./BoardDetailPage.css"
import Comment from './Comment/Comment'

function BoardDetailPage() {
    const [BoardDetail, setBoardDetail] = useState([])
    const [writer, setwriter] = useState("")
    const [time, settime] = useState("")
    const [Favorite, setFavorite] = useState(false)
    const [CommentLists, setCommentLists] = useState([])
    const boardId = useParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const checkFavorite = () => {
        // console.log("check favorite")
        if(user.userData) {
            let body = {
                id: user.userData ? user.userData._id : "",
                boardId: boardId
            }
            axios.post("/api/users/hadFavorite", body)
            .then(response => {
                // console.log("favorite "+response.data.favorite)
                if(response.data.success && response.data.favorite)
                setFavorite(true)
            })
        }
    }

    const removeBoard = (e) => {
        e.preventDefault()
        const answer = window.confirm("정말로 삭제 하실건가요?")

        if(answer) {
            axios.get(`/api/board/removeBoard?_id=${boardId.boardId}`)
            .then(response => {
                if(response.data.success) {
                    alert("게시물을 삭제했습니다.")
                    navigate("/board")
                } else {
                    alert("게시물 삭제에 실패했습니다.")
                }
            })
        } else {
            alert("삭제를 취소 했습니다.")
        }
    }

    const makeFavorite = (e) => {
        e.preventDefault()
        if(user.userData) {
            const body = {
                id: user.userData._id,
                boardId: boardId
            }
            axios.post("/api/users/makeFavorite", body)
                .then(response => {
                    if(response.data.success) {
                        setFavorite(true)
                        alert("관심글로 등록했습니다.")
                    } else {
                        alert("관심글 등록에 실패 했습니다.")
                    }
                })
        }
    }

    const cancelFavorite = (e) => {
        e.preventDefault()
        if(user.userData) {
            let body = {
                id: user.userData._id,
                boardId: boardId
            }
            axios.post("/api/users/cancelFavorite", body)
                .then(response => {
                    if(response.data.success) {
                        setFavorite(false)
                        alert("관심글에서 삭제했습니다.")
                    } else {
                        alert("관심글 삭제에 실패 했습니다.")
                    }
                })
        }
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    useEffect(() => {
        axios.post("/api/board/getBoardDetail", boardId)
            .then(response => {
                if(response.data.success) {
                    setBoardDetail(response.data.boardDetail)
                    setwriter(response.data.boardDetail.writer.name)
                    settime(response.data.boardDetail.createdAt)
                    // console.log(response.data)
                } else {
                    alert("게시물을 불러올 수 없습니다.")
                }
            })

        axios.post("/api/comment/getComments", boardId)
            .then(response => {
                if(response.data.success) {
                    setCommentLists(response.data.comments)
                    console.log(response.data.comments)
                } else {
                    alert("댓글 불러올 수 없습니다.")
                }
            })
    }, [])


  return (
    <>
        <div id="board_detail">
            <div>
                <span className="board_display">제목</span>
                <span className="board_border">{BoardDetail.title}</span>
            </div>

            <br />
            <div>
                <span className="board_display">내용</span>
                <span className="board_border" id="desc">{BoardDetail.description}</span>
            </div>

            <br />
            <div id="detail_description">
                <div>
                    <span className="board_display">글쓴이 : </span>
                    <span>{writer}</span>
                </div>

                <hr id="hr"/>
                <div>
                    <span className="board_display">작성시간 : </span>
                    <span>{time}</span>
                </div>
            </div>
        </div>
        <hr />

        <div id='button_wrapper'>
            {(user.userData && user.userData.name === writer) || (user.userData && user.userData.isAdmin) ? 
            <button id="board_button"><a id="board_button_a" href={`/modifyBoard/${boardId.boardId}`}>수정하기</a></button>
            : null }

            {(user.userData && user.userData.name === writer) || (user.userData && user.userData.isAdmin) ? 
            <button id="board_button"><a id="board_button_a" onClick={removeBoard}>삭제하기</a></button> 
            : null }

            {checkFavorite()}

            {(user.userData && (user.userData.name !== writer)) ? 
                (Favorite === true) ? <button id="board_button" onClick={cancelFavorite}>관심글 해제</button> 
                : <button id="board_button" onClick={makeFavorite}>관심글 등록</button>
                : null }

            <button id="board_button"><a onClick={()=>navigate(-1)} id="board_button_a">목록으로</a></button>
        </div>

        <div id='div_comment'>
            <Comment CommentLists={CommentLists} boardId={boardId.boardId} refreshFunction={updateComment} />
        </div>
    </>
  )
}

export default BoardDetailPage