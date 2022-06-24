import "./App.css";
import React, { Suspense } from "react";
import NavBar from "./views/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import BoardPage from "./views/BoardPage/BoardPage";
import BoardDetailPage from "./views/BoardPage/BoardDetailPage/BoardDetailPage";
import UploadBoard from "./views/BoardPage/UploadBoard";
import Footer from "./views/Footer/Footer";
import MyBoardPage from "./views/BoardPage/MyBoardPage/MyBoardPage";
import ModifyBoard from "./views/BoardPage/ModifyBoard";
import ModifyIdPage from "./views/RegisterPage/ModifyIdPage";
import FavoriteBoardPage from "./views/BoardPage/FavoriteBoardPage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null)
  const AuthLoginPage = Auth(LoginPage, false)
  const AuthRegisterPage = Auth(RegisterPage, false)
  const AuthBoardPage = Auth(BoardPage, true)
  const AuthMyBoardPage = Auth(MyBoardPage, true)
  const AuthUploadBoard = Auth(UploadBoard, true)
  const AuthBoardDetailPage = Auth(BoardDetailPage, true)
  const AuthModifyBoard = Auth(ModifyBoard, true)
  const AuthModifyIdPage = Auth(ModifyIdPage, true)
  const AuthFavoriteBoardPage = Auth(FavoriteBoardPage, true)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
        <div>
          <Routes>
            <Route exact path="/" element={<AuthLandingPage />} />
            <Route exact path="/login" element={<AuthLoginPage />} />
            <Route exact path="/register" element={<AuthRegisterPage />} />
            <Route exact path="/board" element={<AuthBoardPage />} />
            <Route exact path="/myboard" element={<AuthMyBoardPage />} />
            <Route exact path="/board/upload" element={<AuthUploadBoard />} />
            <Route exact path="/board/:boardId" element={<AuthBoardDetailPage />} />
            <Route exact path="/modifyBoard/:boardId" element={<AuthModifyBoard />} />
            <Route exact path="/modify" element={<AuthModifyIdPage />} />
            <Route exact path="/favorite" element={<AuthFavoriteBoardPage />} />
          </Routes>
        </div>
      <Footer />
    </Suspense>
  );
}

export default App;