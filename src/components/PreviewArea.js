import React, { useContext, useEffect, useRef, useState } from "react";
import CatSprite from "./CatSprite";
import { Context } from "../context";
import Icon from "./Icon";
import ButterflySprite from "./ButterflySprite";
import BeetalSprite from "./BeetalSprite";

export default function PreviewArea() {
  const { midAreaData, setMidAreaData } = useContext(Context);
  const {
    multipleSprites,
    setMultipleSprites,
    setActiveSprite,
    collision,
    setCollision,
  } = useContext(Context);
  const [isCollision, setIsCollision] = useState(false);
  const spriteDivRef = useRef();

  const [sprites, setSprites] = useState([
    {
      id: 1,
      title: "cat_sprite",
      component: <CatSprite width="50" height="50" />,
      isActive: "gray",
    },
    {
      id: 2,
      title: "beetal_sprite",
      component: <BeetalSprite width="50" height="50" />,
      isActive: "gray",
    },
    {
      id: 3,
      title: "butterfly_sprite",
      component: <ButterflySprite width="50" height="50" />,
      isActive: "gray",
    },
  ]);

  const handlePlayAnimation = () => {
    // If midAreaData is empty, return early
    if (!midAreaData || midAreaData.length === 0) {
      console.log("No animation instructions to play");
      return;
    }

    const spriteInstructions = {};

    midAreaData.forEach((midElm) => {
      // Add null/undefined checks
      const sprite = midElm?.sprite;
      if (!sprite) return;

      if (!spriteInstructions[sprite]) {
        spriteInstructions[sprite] = [];
      }
      spriteInstructions[sprite].push(midElm);
    });

    Object.keys(spriteInstructions).forEach((sprite) => {
      const instructions = spriteInstructions[sprite];

      // Safe access to repeat count
      const repeatCount =
        instructions[0]?.props?.children?.[1]?.props?.id === "repeat"
          ? parseInt(instructions[0].props.children[1].props.value || 1)
          : 1;

      let currentRepeat = 0;

      const intervalId = setInterval(() => {
        if (currentRepeat >= repeatCount) {
          clearInterval(intervalId);
          return;
        }

        instructions.forEach((midElm, index) => {
          setTimeout(() => {
            processElement(midElm, sprite);
          }, index * 1000);
        });

        currentRepeat++;
      }, instructions.length * 1000);
    });

    setIsCollision(false);
  };

  const processElement = (midElm, spriteTitle) => {
    setMultipleSprites((prevSprites) =>
      prevSprites.map((sp) => {
        if (sp.title === spriteTitle) {
          let { rotate: rotatePos, x: xPos, y: yPos } = sp;

          // Safe access to instruction type and value
          let type = midElm?.props?.children?.[1]?.props?.id;
          let val = parseInt(midElm?.props?.children?.[1]?.props?.value || 0);

          // Alternate way to get type and value if first attempt fails
          if (type == undefined || val == undefined) {
            type = midElm?.props?.children?.[2]?.props?.id;
            val = parseInt(midElm?.props?.children?.[2]?.props?.value || 0);
          }

          if (type === "x") {
            // Safe access to x and y coordinates
            const type2 = midElm?.props?.children?.[3]?.props?.id;
            const val2 = parseInt(
              midElm?.props?.children?.[3]?.props?.value || 0
            );
            xPos = val;
            yPos = val2;
          }

          if (type === "move") {
            const dist = val;
            xPos += dist * Math.cos((rotatePos * Math.PI) / 180);
            yPos += dist * Math.sin((rotatePos * Math.PI) / 180);
          }
          if (type === "left") {
            rotatePos -= val;
          }
          if (type === "right") {
            rotatePos += val;
          }

          return { ...sp, rotate: rotatePos, x: xPos, y: yPos };
        }
        return sp;
      })
    );
  };

  function handleAddSpriteFunc() {
    let obj1 = sprites.find((sp) => {
      if (sp.isActive === "blue") return sp;
    });
    obj1 = {
      ...obj1,
      title: `${obj1.title}_${multipleSprites.length + 1}`,
      isActive: "gray",
      x: multipleSprites.length * 100,
      y: 0,
      rotate: 0,
    };
    setMultipleSprites([...multipleSprites, obj1]);
    spriteDivRef.current.style.display = "none";
  }

  function checkCollision() {
    for (let sprite1 of multipleSprites) {
      for (let sprite2 of multipleSprites) {
        if (sprite1.title !== sprite2.title) {
          let distance = Math.sqrt(
            (sprite1.x - sprite2.x) ** 2 + (sprite1.y - sprite2.y) ** 2
          );
          if (distance < 50) {
            setCollision([sprite1, sprite2]);
          }
        }
      }
    }
  }

  async function swapAnimation() {
    let collisionSprite = [];
    collision.map((elm) => {
      collisionSprite.push(elm.title);
    });

    await setMidAreaData(() =>
      midAreaData.map((midElm) => {
        if (collisionSprite.find((elm) => elm === midElm.sprite)) {
          if (midElm.sprite == collisionSprite[0]) {
            return { ...midElm, sprite: collisionSprite[1] };
          }
          return { ...midElm, sprite: collisionSprite[0] };
        }
        return midElm;
      })
    );
    setIsCollision(true);
  }

  useEffect(() => {
    if (collision.length === 0) {
      checkCollision();
    }
  }, [multipleSprites]);

  useEffect(() => {
    if (isCollision) {
      setTimeout(() => {
        handlePlayAnimation();
      }, 1000);
    }
  }, [isCollision]);

  useEffect(() => {
    if (collision.length !== 0) {
      swapAnimation();
    }
  }, [collision]);

  return (
    <>
      <button
        className="z-50 fixed flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        style={{
          alignItems: "center",
          top: 5,
          right: 5,
          border: "1px solid black",
          padding: "2px 6px",
          borderRadius: "5px",
        }}
        onClick={handlePlayAnimation}
      >
        Play <Icon name="flag" size={15} className="text-green-600 mx-2" />
      </button>

      <div className="flex relative h-full overflow-y-auto px-2 py-6 w-full">
        {multipleSprites?.map((sp, id) => (
          <span
            key={id}
            className=" absolute w-min"
            style={{
              transition: "all 1s linear",
              left: `${sp.x}px`,
              top: `${sp.y}px`,
            }}
          >
            <div
              style={{
                transform: `rotate(${sp.rotate}deg)`,
                width: "fit-content",
              }}
            >
              {sp.component}
            </div>
          </span>
        ))}
      </div>
      <div className="flex items-center absolute text-black bottom-2 right-0">
        <div className="flex mx-2">
          <div
            onClick={() => {
              spriteDivRef.current.style.display = "block";
            }}
          >
            <Icon name="plus" className="cursor-pointer" />
          </div>
        </div>
        <div className=" flex">
          {multipleSprites?.map((elm, id) => (
            <div
              key={id}
              onClick={() => {
                setMultipleSprites(
                  multipleSprites?.map((sp) =>
                    sp.title === elm.title
                      ? { ...sp, isActive: "blue" }
                      : { ...sp, isActive: "gray" }
                  )
                );
                setActiveSprite(elm.title);
              }}
              style={{
                border: `2px solid ${
                  elm.isActive === "blue"
                    ? "rgba(147, 197, 253, 1)"
                    : "rgba(209, 213, 219, 1)"
                }`,
              }}
              className={`cursor-pointer border-2 border-${elm.isActive}-300 p-2 rounded-md m-1`}
            >
              {elm.component}
              <div className="text-xs">{elm.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={spriteDivRef}
        style={{ display: "none" }}
        className="px-3 w-screen h-screen fixed top-0 left-0 bg-white"
      >
        <div className="text-lg font-bold my-3">Add New Sprite</div>
        <div className=" flex">
          {sprites.map((elm) => (
            <div
              onClick={() => {
                setSprites(
                  sprites.map((sp) =>
                    sp.id === elm.id
                      ? { ...sp, isActive: "blue" }
                      : { ...sp, isActive: "gray" }
                  )
                );
              }}
              key={elm.id}
              style={{
                border: `2px solid ${
                  elm.isActive === "blue"
                    ? "rgba(147, 197, 253, 1)"
                    : "rgba(209, 213, 219, 1)"
                }`,
              }}
              className={`cursor-pointer border-2 border-${elm.isActive}-300 p-2 rounded-md m-1`}
            >
              {elm.component}
              <div className="mt-1 text-center text-sm">{elm.title}</div>
            </div>
          ))}
        </div>
        <div className="my-3 mx-2">
          <button
            className="bg-yellow-400 px-4 py-2 text-sm font-bold rounded-md"
            onClick={handleAddSpriteFunc}
          >
            Add
          </button>
          <button
            className="bg-gray-200 mx-3 px-4 py-2 text-sm font-bold rounded-md"
            onClick={() => {
              spriteDivRef.current.style.display = "none";
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
