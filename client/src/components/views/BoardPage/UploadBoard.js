import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UploadBoard() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const setPrivate = [
        {key: 0, label: "공개", value: 0},
        {key: 1, label: "비공개", value: 1}
    ]

    const [Range, setRange] = useState(0)
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")

    const PrivateSelector = (e) => {
        setRange(e.currentTarget.value)
    }

    const TitleHandler = (e) => {
        setTitle(e.currentTarget.value)
    }

    const DescriptionHandler = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        if(!Title || !Description)
            return alert("모든 값을 넣어주세요")

        const body = {
            writer: user.userData._id,
            title: Title,
            description: Description,
            private: Range
        }

        axios.post("/api/board/uploadBoard", body)
            .then(response => {
                if(response.data.success) {
                    alert("글 올리기에 성공했습니다.")
                    navigate("/board")
                } else {
                    alert("글 올리기에 실패했습니다.")
                }
            })
    }

  return (
    <div style={{margin: "80px 50px", padding: "30px 30px 50px 30px", border: "1px solid black"}}>
        <form>
            <div>
                <div style={{float: "left", marginRight: "20px", marginLeft: "10px"}}>제목</div>
                <input type={'text'} style={{display: "flex", width: "90%"}} value={Title} onChange={TitleHandler}></input>
                
                <br />
                <br />
                <div style={{float: "left", marginRight: "20px", marginLeft: "10px"}}>내용</div>
                <textarea style={{display: "flex", width: "90%", height: "500px", resize: "none"}} value={Description} onChange={DescriptionHandler} ></textarea>

                <select onChange={PrivateSelector} value={Range} style={{fontSize: "15px", marginTop: "20px"}}>
                    {setPrivate.map(option => (
                        <option key={option.key} value={option.value}>{option.label}</option>
                        ))}
                </select>
                
                <hr />
                <button style={{float: "right"}} onClick={onSubmitHandler}>글 올리기</button>
            </div>
        </form>
    </div>
  )
}

export default UploadBoard