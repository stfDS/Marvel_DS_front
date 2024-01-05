import React from "react";

const HadleClickPages = ({
  page,
  setPage,
  skip,
  count,
  setCount,
  setSkip,
  countStart,
}) => {
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
      setPage(page - 1);
      scrollToTop();
    }
  };
  const handleClickPlus = () => {
    if (skip < count - 100) {
      setSkip(skip + 100);
      setCount(count - 100);
      setPage(page + 1);
      scrollToTop();
    }
  };
  const handleClickStart = () => {
    setSkip(0);
    setPage(1);
    setCount(countStart);
    scrollToTop();
  };

  return (
    <div className="bottom-btn">
      <button onClick={handleClickMinus}>Previous</button>
      {page !== 1 && <button onClick={handleClickStart}>First Page</button>}
      <button onClick={handleClickPlus}>Next</button>
    </div>
  );
};

export default HadleClickPages;
