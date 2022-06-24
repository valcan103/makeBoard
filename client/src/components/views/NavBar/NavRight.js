import "./NavRight.css"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../../_actions/user_action';

function NavRight() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutUser())
        .then(response => {
        if(response.payload.success) {
            alert("로그아웃 성공!")
        }
        else {
            alert(response.payload.message)
        }
        })
    }

    if(user.userData && !user.userData.isAuth) {
        return (
            <div id="guest">
                <div>
                    <a href="/login">로그인</a>
                </div>
                <div>
                    <a href="/register">회원가입</a>
                </div>
            </div>
        )
    } else if (user.userData && user.userData.isAdmin) {
        return (
            <>
                <div id="admin">
                    <a href="/">admin</a>
                </div>
                <div id="user">
                    <div>
                        <a href="/modify">정보 수정</a>
                    </div>
                </div>
                <div id="user">
                    <div>
                        <a onClick={logoutHandler} href="/">로그아웃</a>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div id="user">
                    <div>
                        <a href="/modify">정보 수정</a>
                    </div>
                </div>
                <div id="user">
                    <div>
                        <a onClick={logoutHandler} href="/">로그아웃</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NavRight