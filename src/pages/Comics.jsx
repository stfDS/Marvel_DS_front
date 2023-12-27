import axios from "axios";
import { useEffect, useState } from "react";
import ModalDescription from "../components/ModalDescription";
import AddEllipsis from "../../functions/addEllipsis";
import HadleClickPages from "../../functions/HadleClickPages";
import AddComicFav from "../components/AddComicFav";

const Comics = () => {
  const [loading, setLoading] = useState(true);
  const [comicsData, setComicsData] = useState(null);
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [countStart, setCountStart] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      if (title === "") {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics/skip/${skip}`
        );
        setComicsData(response.data);
        setCount(response.data.count);
        setCountStart(response.data.count);
        setLoading(false);
      } else if (title !== "") {
        setLoading(true);

        const response = await axios.get(
          `${
            import.meta.env.REACT_APP_SERV_URL
          }/comics/title/skip/${title}/${skip}`
        );
        setComicsData(response.data);
        setCount(response.data.count);
        setCountStart(response.data.count);
        setLoading(false);
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
          placeholder="Reshearch"
        />
      </section>
      <section className="all-comics">
        {comicsData.results.map((comic) => {
          return (
            <div key={comic._id} className="all-comics-sheet">
              <div className="all-comics-name">
                <h3>{AddEllipsis(comic.title, 14)} </h3>
              </div>
              <AddComicFav comic={comic} />

              <div className="all-comics-pic">
                {comic.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                comic.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                  <img
                    src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1703513482/Marvel/DALL_E.comics_c3stwl.png"
                    alt={comic.name}
                  />
                ) : (
                  <img
                    src={
                      comic.thumbnail.path.replace("http:", "https:") +
                      "." +
                      comic.thumbnail.extension
                    }
                    alt={comic.name}
                  />
                )}
                {comic.description && (
                  <div className="all-comics-description">
                    <ModalDescription
                      description={comic.description}
                      title={comic.title}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
      <section className="page-skip">
        <HadleClickPages
          page={page}
          setPage={setPage}
          skip={skip}
          count={count}
          setCount={setCount}
          setSkip={setSkip}
          countStart={countStart}
        />
      </section>
    </main>
  );
};

export default Comics;
