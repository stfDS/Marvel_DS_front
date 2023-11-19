import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [loading, setLoading] = useState(true);
  const [comicsData, setComicsData] = useState(null);
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState(0);

  const addEllipsis = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleClickMinus = () => {
    if (skip > 0) {
      setSkip(skip - 100);
    }
  };
  const handleClickPlus = () => {
    setSkip(skip + 100);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https:site--marvel-ds--5gjnlvwzlmps.code.run/comics/${skip}/${title}`
      );
      console.log(response.data);
      setComicsData(response.data);
      setLoading(false);
    };
    fetchData();
  }, [title, skip]);

  return loading === true ? (
    <h1>Loading</h1>
  ) : (
    <main className="main-container">
      <section className="serch">
        <input
          onChange={(event) => {
            setTitle(event.target.value);
            setSkip(0);
          }}
          type="search"
          id="serch-character"
        />
      </section>
      <section className="all-comics">
        {comicsData.results.map((comics) => {
          return (
            <div key={comics._id} className="all-comics-sheet">
              <div className="all-comics-name">
                <h3>{comics.title} </h3>
              </div>

              <div className="all-comics-pic">
                <img
                  src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                  alt={comics.name}
                />
                {comics.description && (
                  <div className="all-comics-description">
                    <p>{comics.description}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
      <section className="page-skip">
        <div className="bottom-btn">
          <button onClick={handleClickMinus}>Page précédente</button>
          <button onClick={handleClickPlus}>Page suivante</button>
        </div>
      </section>
    </main>
  );
};

export default Comics;
