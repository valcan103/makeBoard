import React from "react";
import "./NavBar.css";
import NavRight from "./NavRight";

function NavBar() {
  return (
    <div id="nav">
      <div id="nav_left"><a href="/">Home</a></div>

      <div id="nav_main">
        <div>
          <p><a href="/board">게시판</a></p>
        </div>

        <div>
          <p><a href={`/myboard`}>내 게시판</a></p>
        </div>

        <div id="nav_main_sub3">
          <p>Tab3</p>
            <ul id="openSub3">
                <li>option1</li>
                <li>option2</li>
                <li>option3</li>
            </ul>
        </div>

        <div id="nav_main_sub4">
          <p>Tab4</p>
            <ul id="openSub4">
                <li>option1</li>
                <li>option2</li>
                <li>option3</li>
            </ul>
        </div>

        <div>
          <p><a href="/favorite">즐겨찾기 게시판</a></p>
        </div>

      </div>

      <div id="nav_right">
        <NavRight />
      </div>
    </div>
  );
}

export default NavBar;
