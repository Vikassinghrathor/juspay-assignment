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
  const containerRef = useRef();
  const [containerBounds, setContainerBounds] = useState({
    width: 0,
    height: 0,
  });
  const [eventListeners, setEventListeners] = useState({});

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

  // Get container bounds when component mounts
  useEffect(() => {
    if (containerRef.current) {
      const bounds = containerRef.current.getBoundingClientRect();
      setContainerBounds({
        width: bounds.width,
        height: bounds.height,
      });
    }

    // Set up a resize observer to update bounds when window resizes
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerBounds({ width, height });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

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
      const repeatIndex = instructions.findIndex(
        (instruction) =>
          instruction?.props?.children?.[1]?.props?.id === "repeat"
      );

      let repeatCount = 1;
      if (repeatIndex !== -1) {
        repeatCount = parseInt(
          instructions[repeatIndex].props.children[1].props.value || 1
        );
        // Remove repeat instruction from processing
        instructions.splice(repeatIndex, 1);
      }

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
      }, instructions.length * 1000 || 1000); // Ensure at least 1000ms interval
    });

    setIsCollision(false);
    setCollision([]);
  };

  const processElement = (midElm, spriteTitle) => {
    if (!midElm || !midElm.props || !midElm.props.children) {
      console.log("Invalid element", midElm);
      return;
    }

    // Find input element and its ID
    let inputElement = null;
    let inputId = null;
    let inputValue = null;

    // Search for the input element among children
    const findInput = (children) => {
      if (!children) return;
      if (Array.isArray(children)) {
        for (let child of children) {
          if (child && child.props && child.props.id) {
            inputElement = child;
            inputId = child.props.id;
            inputValue = child.props.value;
            return true;
          } else if (child && child.props && child.props.children) {
            if (findInput(child.props.children)) {
              return true;
            }
          }
        }
      } else if (children.props && children.props.id) {
        inputElement = children;
        inputId = children.props.id;
        inputValue = children.props.value;
        return true;
      } else if (children.props && children.props.children) {
        return findInput(children.props.children);
      }
      return false;
    };

    findInput(midElm.props.children);

    if (!inputId) {
      console.log("No input found in element", midElm);
      return;
    }

    setMultipleSprites((prevSprites) =>
      prevSprites.map((sp) => {
        if (sp.title === spriteTitle) {
          let {
            rotate: rotatePos,
            x: xPos,
            y: yPos,
            visible,
            size,
            message,
          } = sp;
          let updatedSprite = { ...sp };

          switch (inputId) {
            case "move":
              const dist = parseInt(inputValue || 0);
              xPos += dist * Math.cos((rotatePos * Math.PI) / 180);
              yPos += dist * Math.sin((rotatePos * Math.PI) / 180);

              // Keep sprite within bounds
              if (containerBounds.width && containerBounds.height) {
                xPos = Math.max(0, Math.min(xPos, containerBounds.width - 50));
                yPos = Math.max(0, Math.min(yPos, containerBounds.height - 50));
              }

              updatedSprite = { ...updatedSprite, x: xPos, y: yPos };
              break;

            case "left":
              rotatePos -= parseInt(inputValue || 0);
              updatedSprite = { ...updatedSprite, rotate: rotatePos };
              break;

            case "right":
              rotatePos += parseInt(inputValue || 0);
              updatedSprite = { ...updatedSprite, rotate: rotatePos };
              break;

            case "x":
              // Handle goto x, y
              const xInput = midElm.props.children.find(
                (child) => child?.props?.id === "x"
              );
              const yInput = midElm.props.children.find(
                (child) => child?.props?.id === "y"
              );

              if (xInput && yInput) {
                xPos = parseInt(xInput.props.value || 0);
                yPos = parseInt(yInput.props.value || 0);

                // Keep within bounds
                if (containerBounds.width && containerBounds.height) {
                  xPos = Math.max(
                    0,
                    Math.min(xPos, containerBounds.width - 50)
                  );
                  yPos = Math.max(
                    0,
                    Math.min(yPos, containerBounds.height - 50)
                  );
                }

                updatedSprite = { ...updatedSprite, x: xPos, y: yPos };
              }
              break;

            // Implement Looks blocks
            case "show":
              updatedSprite = { ...updatedSprite, visible: true };
              break;

            case "hide":
              updatedSprite = { ...updatedSprite, visible: false };
              break;

            case "say":
              updatedSprite = { ...updatedSprite, message: inputValue || "" };
              // Clear message after 2 seconds
              setTimeout(() => {
                setMultipleSprites((prevSprites) =>
                  prevSprites.map((s) =>
                    s.title === spriteTitle ? { ...s, message: "" } : s
                  )
                );
              }, 2000);
              break;

            case "size":
              const newSize = (sp.size || 100) + parseInt(inputValue || 0);
              updatedSprite = {
                ...updatedSprite,
                size: Math.max(10, Math.min(200, newSize)),
              };
              break;

            // Handle Events
            case "event":
              // This is just a trigger, no state change needed
              break;

            default:
              console.log("Unknown input type:", inputId);
          }

          return updatedSprite;
        }
        return sp;
      })
    );
  };

  function handleAddSpriteFunc() {
    let obj1 = sprites.find((sp) => {
      if (sp.isActive === "blue") return sp;
    });

    if (!obj1) {
      // If no sprite is selected, use the first one
      obj1 = sprites[0];
    }

    obj1 = {
      ...obj1,
      title: `${obj1.title}_${multipleSprites.length + 1}`,
      isActive: "gray",
      x: Math.min(
        (multipleSprites.length * 100) % (containerBounds.width - 100),
        containerBounds.width - 100
      ),
      y:
        Math.floor(
          (multipleSprites.length * 100) / (containerBounds.width - 100)
        ) * 100,
      rotate: 0,
      visible: true,
      size: 100,
      message: "",
    };

    setMultipleSprites([...multipleSprites, obj1]);
    spriteDivRef.current.style.display = "none";
  }

  function checkCollision() {
    const collidedSprites = [];

    for (let i = 0; i < multipleSprites.length; i++) {
      for (let j = i + 1; j < multipleSprites.length; j++) {
        const sprite1 = multipleSprites[i];
        const sprite2 = multipleSprites[j];

        // Skip hidden sprites
        if (!sprite1.visible || !sprite2.visible) continue;

        // Calculate distance between sprites
        const distance = Math.sqrt(
          Math.pow(sprite1.x - sprite2.x, 2) +
            Math.pow(sprite1.y - sprite2.y, 2)
        );

        // Adjust collision threshold based on sprite sizes
        const sprite1Size = ((sprite1.size || 100) / 100) * 50;
        const sprite2Size = ((sprite2.size || 100) / 100) * 50;
        const collisionThreshold = sprite1Size + sprite2Size - 20; // Adjust for some overlap

        if (distance < collisionThreshold) {
          collidedSprites.push(sprite1);
          collidedSprites.push(sprite2);

          // Only handle first collision for simplicity
          if (collidedSprites.length === 2) {
            setCollision(collidedSprites);
            return;
          }
        }
      }
    }
  }

  async function swapAnimation() {
    if (collision.length !== 2) return;

    const sprite1 = collision[0];
    const sprite2 = collision[1];

    // Get all instructions for both sprites
    const sprite1Instructions = midAreaData.filter(
      (midElm) => midElm.sprite === sprite1.title
    );

    const sprite2Instructions = midAreaData.filter(
      (midElm) => midElm.sprite === sprite2.title
    );

    // Swap instructions between sprites
    await setMidAreaData(
      midAreaData.map((midElm) => {
        if (midElm.sprite === sprite1.title) {
          return { ...midElm, sprite: sprite2.title };
        }
        if (midElm.sprite === sprite2.title) {
          return { ...midElm, sprite: sprite1.title };
        }
        return midElm;
      })
    );

    setIsCollision(true);
  }

  // Setup event listeners for sprites
  useEffect(() => {
    const newEventListeners = {};

    multipleSprites.forEach((sprite) => {
      // Create a listener function for each sprite
      newEventListeners[sprite.title] = () => {
        // Execute all "When sprite clicked" events for this sprite
        const clickEvents = midAreaData.filter(
          (midElm) =>
            midElm.sprite === sprite.title &&
            midElm.props?.children?.some(
              (child) =>
                child?.props?.id === "event" && child?.props?.value === "click"
            )
        );

        if (clickEvents.length > 0) {
          // Process all instructions after the event block
          const spriteInstructions = midAreaData.filter(
            (midElm) =>
              midElm.sprite === sprite.title &&
              !midElm.props?.children?.some(
                (child) => child?.props?.id === "event"
              )
          );

          spriteInstructions.forEach((instruction, index) => {
            setTimeout(() => {
              processElement(instruction, sprite.title);
            }, index * 500);
          });
        }
      };
    });

    setEventListeners(newEventListeners);
  }, [multipleSprites, midAreaData]);

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

      <div
        ref={containerRef}
        className="flex relative h-full overflow-hidden px-2 py-6 w-full border-2 border-gray-300 rounded-md"
        style={{ minHeight: "400px" }}
      >
        {multipleSprites?.map((sp, id) => (
          <div
            key={id}
            className="absolute"
            style={{
              transition: "all 1s linear",
              left: `${sp.x}px`,
              top: `${sp.y}px`,
              display: sp.visible === false ? "none" : "block",
              transform: `scale(${(sp.size || 100) / 100})`,
              transformOrigin: "center",
              cursor: "pointer",
            }}
            onClick={eventListeners[sp.title]}
          >
            <div
              style={{
                transform: `rotate(${sp.rotate}deg)`,
                width: "fit-content",
                position: "relative",
              }}
            >
              {sp.component}
              {sp.message && (
                <div
                  className="absolute bg-white p-2 rounded-md border border-gray-300"
                  style={{
                    top: "-40px",
                    left: "30px",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                  }}
                >
                  {sp.message}
                </div>
              )}
            </div>
          </div>
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
        <div className="flex">
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
                opacity: elm.visible === false ? 0.5 : 1,
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
        className="px-3 w-screen h-screen fixed top-0 left-0 bg-white z-50"
      >
        <div className="text-lg font-bold my-3">Add New Sprite</div>
        <div className="flex flex-wrap">
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
