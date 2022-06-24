import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"
import "./BoardPage.css"

function BoardPage() {
  const [Boards, setBoards] = useState([])
  const user = useSelector(state => state.user)

  useEffect(() => {
    axios.get("/api/board/getBoards")
      .then(response => {
        if(response.data.success) {
          setBoards(response.data.boards)
        } else {
          alert("게시판을 불러오는데 실패했습니다.")
        }
      })
  }, [])

  const renderBoards = Boards.map((board, index) => {
    console.log(board)
    if(board.private === 0) {
      if(board.private === 1 && (user.userData && user.userData.isAdmin)) {
      return <div key={index} id="board">
        <a href={`/board/${board._id}`} id="board_title">
          <div>{index+1}. {board.title+" <Lock>"}</div>
          <div id="writer">-{board.writer.name}-</div>
        </a>
        <hr />
      </div>
      } else {
        return <div key={index} id="board">
        <a href={`/board/${board._id}`} id="board_title">
          <div>{index+1}. {board.title}</div>
          <div id="writer">-{board.writer.name}-</div>
        </a>
        <hr />
      </div>
      }
    } else if(board.private === 1 && ((user.userData && (user.userData._id === board.writer._id)) || (user.userData && user.userData.isAdmin))) {
        return <div key={index} id="board">
          <a href={`/board/${board._id}`} id="board_title">
            <div>{index+1}. {board.title+" <Lock>"}</div>
            <div id="writer">-{board.writer.name}-</div>
          </a>
          <hr />
        </div>
      } else {
      return <div key={index} id="board">
          <div id="board_lock">{index+1}. 비공개 글 입니다.</div>
          <div id="writer">-{board.writer.name}-</div>
        <hr />
      </div>
    }
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

export default BoardPage