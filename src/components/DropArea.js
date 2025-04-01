import React, { useContext } from "react";
import Icon from "./Icon";
import { Context } from "../context";

export default function MidArea() {
  const { midAreaData, setMidAreaData } = useContext(Context);
  const { multipleSprites, activeSprite } = useContext(Context);

  return (
    <div
      className="flex-1 h-full overflow-auto px-2 py-1"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const blockKeyList = e.dataTransfer.getData("text/plain");
        const blockKey = blockKeyList.split(", ")[0];
        const blockData = blockKeyList.split(", ")[1];

        // First check for block0 (Repeat)
        if (blockKey == "block0") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              Repeat{" "}
              <input
                id="repeat"
                onClick={(e) => e.stopPropagation()}
                className="mx-3 px-0.5 text-black w-10"
                value={blockData}
                disabled
                type="text"
              />{" "}
              times
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        }
        // Motion blocks
        else if (blockKey == "block1") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              Move{" "}
              <input
                id="move"
                onClick={(e) => e.stopPropagation()}
                className="mx-3 px-0.5 text-black w-10"
                value={blockData}
                disabled
                type="text"
              />{" "}
              steps
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        } else if (blockKey == "block2") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"Turn "}
              <Icon name="undo" size={15} className="text-white mx-2" />
              <input
                id="left"
                onClick={(e) => e.stopPropagation()}
                className="mx-3 px-0.5 text-black w-10"
                value={blockData}
                disabled
                type="text"
              />
              {"degrees"}
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        } else if (blockKey == "block3") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"Turn "}
              <Icon name="redo" size={15} className="text-white mx-2" />
              <input
                id="right"
                onClick={(e) => e.stopPropagation()}
                className="mx-3 px-0.5 text-black w-10"
                value={blockData}
                disabled
                type="text"
              />
              {"degrees"}
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        } else if (blockKey == "block4") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"Go to X:"}
              <input
                id="x"
                value={blockData}
                disabled
                onClick={(e) => e.stopPropagation()}
                className="mx-2 px-0.5 text-black w-10"
                type="text"
              />
              {"Y:"}
              <input
                id="y"
                value={blockKeyList.split(", ")[2]}
                disabled
                onClick={(e) => e.stopPropagation()}
                className="mx-2 px-0.5 text-black w-10"
                type="text"
              />
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        }
        // Looks blocks
        else if (blockKey == "block5") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"Show sprite"}
              <input
                id="show"
                onClick={(e) => e.stopPropagation()}
                className="hidden"
                value="true"
                disabled
                type="text"
              />
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        } else if (blockKey == "block6") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"Hide sprite"}
              <input
                id="hide"
                onClick={(e) => e.stopPropagation()}
                className="hidden"
                value="true"
                disabled
                type="text"
              />
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        } else if (blockKey == "block7") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"Say"}
              <input
                id="say"
                onClick={(e) => e.stopPropagation()}
                className="mx-2 px-0.5 text-black w-20"
                value={blockData}
                disabled
                type="text"
              />
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        } else if (blockKey == "block8") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"Change size by"}
              <input
                id="size"
                onClick={(e) => e.stopPropagation()}
                className="mx-2 px-0.5 text-black w-10"
                value={blockData}
                disabled
                type="text"
              />
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        }
        // Events blocks
        else if (blockKey == "block9") {
          let JSXElm = (
            <div
              draggable={true}
              className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"When sprite clicked"}
              <Icon
                name="mouse-pointer"
                size={15}
                className="text-white mx-2"
              />
              <input
                id="event"
                onClick={(e) => e.stopPropagation()}
                className="hidden"
                value="click"
                disabled
                type="text"
              />
            </div>
          );
          let JSXElm1 = { ...JSXElm, sprite: activeSprite };
          setMidAreaData([...midAreaData, JSXElm1]);
        }
      }}
    >
      <span className="font-bold"> {"Mid Area - "}</span>
      <span className=" text-blue-600 text-sm">
        {activeSprite} {" (x="}
        {
          multipleSprites?.find((sp) => {
            if (sp.title === activeSprite) return sp;
          }).x
        }{" "}
        {", y="}
        {
          multipleSprites?.find((sp) => {
            if (sp.title === activeSprite) return sp;
          }).y
        }{" "}
        {", angle="}
        {
          multipleSprites?.find((sp) => {
            if (sp.title === activeSprite) return sp;
          }).rotate
        }
        {")"}
      </span>
      {midAreaData
        ?.filter((elm) => elm.sprite === activeSprite)
        ?.map((elem, id) => (
          <div key={id}>{elem}</div>
        ))}
    </div>
  );
}
