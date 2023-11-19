import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const [name, setName] = useState("");
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
        `https:site--marvel-ds--5gjnlvwzlmps.code.run/characters/${skip}/${name}`
      );
      console.log(response);
      setHomeData(response.data);
      console.log(homeData);
      setLoading(false);
    };
    fetchData();
  }, [name, skip]);

  return loading === true ? (
    <h1>Loading</h1>
  ) : (
    <main className="main-container">
      <section className="serch">
        <input
          onChange={(event) => {
            setName(event.target.value);
            setSkip(0);
          }}
          type="search"
          id="serch-character"
        />
      </section>
      <section className="character-home">
        {homeData.results.map((character) => {
          // console.log(character._id);
          return (
            <Link
              //
              to={`/character/${character._id}`}
              key={character._id}
              className="home-character-sheet"
            >
              <div className="home-character-name">
                <h3>{addEllipsis(character.name, 10)}</h3>
              </div>

              <div className="home-character-pic">
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt={character.name}
                />
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
          <button onClick={handleClickMinus}>Page précédente</button>
          <button onClick={handleClickPlus}>Page suivante</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
//
