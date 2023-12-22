import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddEllipsis from "../../functions/addEllipsis";
import HadleClickPages from "../../functions/HadleClickPages";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [countStart, setCountStart] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (name === "") {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters/skip/${skip}`
        );

        setHomeData(response.data);
        setCount(response.data.count);
        setCountStart(response.data.count);
        setLoading(false);
      } else if (name !== "") {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters/skip/name/${skip}/${name}`
        );

        setHomeData(response.data);
        setCount(response.data.count);
        setCountStart(response.data.count);
        setLoading(false);
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
        <HadleClickPages
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

export default Home;
