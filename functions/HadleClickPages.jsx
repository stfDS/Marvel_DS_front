import React from "react";

const HadleClickPages = ({ skip, count, setCount, setSkip, countStart }) => {
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

  return (
    <div className="bottom-btn">
      <button onClick={handleClickMinus}>Previous</button>
      <button onClick={handleClickStart}>First Page</button>
      <button onClick={handleClickPlus}>Next</button>
    </div>
  );
};

export default HadleClickPages;
