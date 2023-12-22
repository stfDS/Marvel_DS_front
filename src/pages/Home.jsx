import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddEllipsis from "../../functions/AddEllipsis";
import ScrollToTop from "../../functions/ScrollToTop";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const [name, setName] = useState("");
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
      if (name === "") {
        const response = await axios.get(
          `https://site--marvel-ds--5gjnlvwzlmps.code.run/characters/skip/${skip}`
        );

        setHomeData(response.data);
        setCount(response.data.count);

        setLoading(false);
      } else if (name) {
        const response = await axios.get(
          `https://site--marvel-ds--5gjnlvwzlmps.code.run/characters/skip/name/${skip}/${name}`
        );

        setHomeData(response.data);
      }
    };
    fetchData();
  }, [skip, name]);

  return loading === true ? (
    <h1>Loading</h1>
  ) : (
    <main className="main-container">
      <section className="serch">
        <input
          onChange={(event) => {
            setSkip(0);
            setName(event.target.value);
          }}
          type="search"
          id="serch-character"
        />
      </section>
      <section className="character-home">
        {homeData.results.map((character) => {
          return (
            <Link
              //
              to={`/character/${character._id}`}
              key={character._id}
              className="home-character-sheet"
            >
              <div className="home-character-name">
                <h3>{AddEllipsis(character.name, 10)}</h3>
              </div>

              <div className="home-character-pic">
                {character.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                  <img
                    src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1702737418/Marvel/DALL_E-hero_r7yvqr.png"
                    alt={character.name}
                  />
                ) : (
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt={character.name}
                  />
                )}
              </div>
              {/* {character.description && (
                <div className="home-character-description">
                  <p>{character.description}</p>
                </div>
              )} */}
            </Link>
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

export default Home;
