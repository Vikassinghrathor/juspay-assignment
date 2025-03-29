import React, { useState } from "react";
import Icon from "./Icon";

export default function Sidebar() {
  const [repeat, setRepeat] = useState(2);
  const [move, setMove] = useState(10);
  const [leftTurn, setLeftTurn] = useState(15);
  const [rightTurn, setRightTurn] = useState(15);
  const [xCoordinate, setXCoordinate] = useState(0);
  const [yCoordinate, setYCoordinate] = useState(0);
  const [sayText, setSayText] = useState("Hello!");
  const [sizeChange, setSizeChange] = useState(10);

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Controls"} </div>
      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block0, ${repeat}`);
        }}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Repeat"}
        <input
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          className="mx-2 px-0.5 text-black w-10"
          type="text"
        />
        {"times"}
      </div>

      <div className="font-bold"> {"Motion"} </div>
      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block1, ${move}`);
        }}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Move"}
        <input
          value={move}
          onChange={(e) => setMove(e.target.value)}
          className="mx-2 px-0.5 text-black w-10"
          type="text"
        />
        {"Steps"}
      </div>

      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block2, ${leftTurn}`);
        }}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        <input
          value={leftTurn}
          onChange={(e) => setLeftTurn(e.target.value)}
          className="mx-2 px-0.5 text-black w-10"
          type="text"
        />
        {"degrees"}
      </div>

      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block3, ${rightTurn}`);
        }}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        <input
          value={rightTurn}
          onChange={(e) => setRightTurn(e.target.value)}
          className="mx-2 px-0.5 text-black w-10"
          type="text"
        />
        {"degrees"}
      </div>

      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "text/plain",
            `block4, ${xCoordinate}, ${yCoordinate}`
          );
        }}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Go to X:"}
        <input
          value={xCoordinate}
          onChange={(e) => setXCoordinate(e.target.value)}
          className="mx-2 px-0.5 text-black w-10"
          type="text"
        />
        {"Y:"}
        <input
          value={yCoordinate}
          onChange={(e) => setYCoordinate(e.target.value)}
          className="mx-2 px-0.5 text-black w-10"
          type="text"
        />
      </div>

      <div className="font-bold mt-4"> {"Looks"} </div>
      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block5, show`);
        }}
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Show sprite"}
      </div>

      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block6, hide`);
        }}
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Hide sprite"}
      </div>

      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block7, ${sayText}`);
        }}
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Say"}
        <input
          value={sayText}
          onChange={(e) => setSayText(e.target.value)}
          className="mx-2 px-0.5 text-black w-20"
          type="text"
        />
      </div>

      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block8, ${sizeChange}`);
        }}
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Change size by"}
        <input
          value={sizeChange}
          onChange={(e) => setSizeChange(e.target.value)}
          className="mx-2 px-0.5 text-black w-10"
          type="text"
        />
      </div>

      <div className="font-bold mt-4"> {"Events"} </div>
      <div
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `block9, click`);
        }}
        className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"When sprite clicked"}
        <Icon name="mouse-pointer" size={15} className="text-white mx-2" />
      </div>
    </div>
  );
}
