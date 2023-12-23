import React, { useContext } from "react";
import { AuthContext } from "../src/context/connect.provider";

const HadleClickPages = ({ skip, count, setCount, setSkip, countStart }) => {
  const { setUpdate } = useContext(AuthContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClickMinus = () => {
    if (skip > 0) {
      setSkip(skip - 100);
      setCount(count + 100);
      scrollToTop();
    }
  };
  const handleClickPlus = () => {
    if (skip < count - 100) {
      setSkip(skip + 100);
      setCount(count - 100);
      scrollToTop();
    }
  };
  const handleClickStart = () => {
    setSkip(0);
    setCount(countStart);
    scrollToTop();
  };
  const handleUpdate = () => {
    setUpdate(false);
  };

  return (
    <div className="bottom-btn">
      <button onClick={handleClickMinus}>Previous</button>
      <button onClick={handleClickStart}>First Page</button>
      <button onClick={handleClickPlus}>Next</button>
      <button onClick={handleUpdate}> update </button>
    </div>
  );
};

export default HadleClickPages;
