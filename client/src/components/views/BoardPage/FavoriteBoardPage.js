import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./BoardPage.css"
import { useSelector } from 'react-redux'

function FavoriteBoardPage() {
  const [Boards, setBoards] = useState([])
  const user = useSelector(state => state.user)
  const myId = user.userData ? user.userData._id : ""
  
  useEffect(() => {
    if(myId !== "") {
        console.log(myId)
        axios.post("/api/users/getFavoriteBoards", {myId})
            .then(response => {
                if(response.data.success) {
                    setBoards(response.data.boards)
                    // console.log(response.data.boards)
                } else {
                    alert("게시판을 불러오는데 실패했습니다.")
                }
            })
    }
  }, [myId])

const renderBoards = Boards.map((board, index) => {
    console.log(board)
    return (<div key={index} id="board">
    <a href={`/board/${board._id}`} id="board_title">
        <div>{index+1}. {board.title}</div>
        <div id="writer">-{board.writer.name}-</div>
    </a>
    <hr />
    </div>)
})

  return (
    <div style={{margin: "30px 50px", minHeight: "759px"}}>
        <h1>글 목록</h1>
        <hr />
        <br />
        {renderBoards}
        <br />
        <hr />
        <button id="write_button"><a href="/board/upload">글 쓰기</a></button>
    </div>
  )
}

export default FavoriteBoardPage