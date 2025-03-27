import React, { createContext, useState } from "react";
import CatSprite from "./components/CatSprite";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [midAreaData, setMidAreaData] = useState([]);
  const [activeSprite, setActiveSprite] = useState("cat_sprite_1");
  const [collision, setCollision] = useState([]);

  const [multipleSprites, setMultipleSprites] = useState([
    {
      id: 1,
      title: "cat_sprite_1",
      component: <CatSprite width="50" height="50" />,
      isActive: "blue",
      x: 0,
      y: 0,
      rotate: 0,
    },
  ]);

  return (
    <Context.Provider
      value={{
        midAreaData,
        setMidAreaData,
        multipleSprites,
        setMultipleSprites,
        activeSprite,
        setActiveSprite,
        collision,
        setCollision,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default AppContext;
