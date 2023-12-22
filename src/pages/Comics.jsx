import axios from "axios";
import { useEffect, useState } from "react";
import AddEllipsis from "../../functions/AddEllipsis";
import ScrollToTop from "../../functions/ScrollToTop";
import ModalDescription from "../components/ModalDescription";

const Comics = () => {
  const [loading, setLoading] = useState(true);
  const [comicsData, setComicsData] = useState(null);
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);

  const handleClickMinus = () => {
    if (skip > 0) {
      setSkip(skip - 100);
      setCount(count + 100);
      ScrollToTop();
    }
  };
  const handleClickPlus = () => {
    if (skip < count - 100) {
      setSkip(skip + 100);
      setCount(count - 100);
      ScrollToTop();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (title === "") {
        const response = await axios.get(
          `https://site--marvel-ds--5gjnlvwzlmps.code.run/comics/skip/${skip}`
        );
        setComicsData(response.data);
        setCount(response.data.count);
        setLoading(false);
      } else if (title) {
        const response = await axios.get(
          `https://site--marvel-ds--5gjnlvwzlmps.code.run/comics/title/skip/${title}/${skip}`
        );
        setComicsData(response.data);
        setCount(response.data.count);
      }
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
            setSkip(0);
            setTitle(event.target.value);
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
                <h3>{AddEllipsis(comics.title, 15)} </h3>
              </div>

              <div className="all-comics-pic">
                {comics.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                  <img
                    src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1702737418/Marvel/DALL_E-hero_r7yvqr.png"
                    alt={comics.name}
                  />
                ) : (
                  <img
                    src={
                      comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                    alt={comics.name}
                  />
                )}

                {comics.description && (
                  <ModalDescription
                    title={comics.title}
                    description={comics.description}
                  />
                )}
              </div>
            </div>
          );
        })}
      </section>
      <section className="page-skip">
        <div className="bottom-btn">
          <button onClick={handleClickPlus}>Previous</button>
        </div>
        <div className="bottom-btn">
          <button onClick={handleClickMinus}>Next</button>
        </div>
      </section>
    </main>
  );
};

export default Comics;
