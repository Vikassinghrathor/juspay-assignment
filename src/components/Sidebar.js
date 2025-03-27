import React, { useState } from "react";
import Icon from "./Icon";

export default function Sidebar() {
  const [repeat, setRepeat] = useState(2);
  const [move, setMove] = useState(10);
  const [leftTurn, setLeftTurn] = useState(15);
  const [rightTurn, setRightTurn] = useState(15);
  const [xCoordinate, setXCoordinate] = useState(0);
  const [yCoordinate, setYCoordinate] = useState(0);

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
    </div>
  );
}
