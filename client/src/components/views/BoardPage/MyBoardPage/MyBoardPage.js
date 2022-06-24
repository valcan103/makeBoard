import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../BoardPage.css"
import { useSelector } from 'react-redux'

function MyBoardPage() {
    const [Boards, setBoards] = useState([])
    const user = useSelector(state => state.user)
    const myId = user.userData ? user.userData._id : ""
    
    useEffect(() => {
        if(myId !== "") {
            axios.post(`/api/board/getMyBoards`, {myId})
            .then(response => {
                if(response.data.success) {
                    setBoards(response.data.boards)
                } else {
                    alert("게시판을 불러오는데 실패했습니다.")
                }
            })
        }
    }, [myId])

    const renderBoards = Boards.map((board, index) => {
    // console.log(board)
    if(board.private === 0) {
        return <div key={index} id="board">
        <a href={`/board/${board._id}`} id="board_title">
            <div>{index+1}. {board.title}</div>
            <div id="writer">-{board.writer.name}-</div>
        </a>
        <hr />
    </div>
    } else {
        return <div key={index} id="board">
            <a href={`/board/${board._id}`} id="board_title">
                <div>{index+1}. {board.title+" <Lock>"}</div>
                <div id="writer">-{board.writer.name}-</div>
            </a>
            <hr />
        </div>
        }
    })

    return (
        <div style={{margin: "30px 50px", minHeight: "759px"}}>
            <h1>내가 쓴 글 목록</h1>
            <hr />
            <br />
            {renderBoards}
            <br />
            <hr />
        </div>
    )
}

export default MyBoardPage