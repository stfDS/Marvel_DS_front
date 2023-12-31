import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddEllipsis from "../../functions/addEllipsis";
import HadleClickPages from "../../functions/HadleClickPages";
import AddCharacterFav from "../components/AddCharacterFav";
import ModalDescription from "../components/ModalDescription";
import { Fade } from "react-awesome-reveal";

const Characters = () => {
  const [loading, setLoading] = useState(true);
  const [charactersData, setCharactersData] = useState(null);
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [countStart, setCountStart] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (name === "") {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters/skip/${skip}`,
          { withCredentials: false }
        );

        setCharactersData(response.data);
        setCount(response.data.count);
        setCountStart(response.data.count);
        setLoading(false);
      } else if (name !== "") {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/characters/skip/name/${skip}/${name}`,
          { withCredentials: false }
        );

        setCharactersData(response.data);
        setCount(response.data.count);
        setCountStart(response.data.count);
        setLoading(false);
      }
    };
    fetchData();
  }, [skip, name]);

  return loading ? (
    <div className="loader-div">
      <h1>
        Loading <span className="loader"></span>
      </h1>
    </div>
  ) : (
    <main className="main-container">
      <section className="search">
        <input
          onChange={(event) => {
            setSkip(0);
            setName(event.target.value);
          }}
          type="search"
          id="search-character"
          placeholder="Reshearch"
        />
      </section>
      <section className="character-characters">
        {charactersData.results.map((character) => {
          return (
            <article key={character._id} className="characters-character-sheet">
              <Link to={`/character/${character._id}`}>
                <h3>{AddEllipsis(character.name, 10)}</h3>
              </Link>
              <AddCharacterFav character={character} />
              <Link
                to={`/character/${character._id}`}
                className="characters-character-pic"
              >
                <Fade>
                  {character.thumbnail.path ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                  character.thumbnail.path ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                    <img
                      src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1703702551/Marvel/DALL_E_2023-12-27_19.41.06_-_A_dynamic_full-body_portrait_of_a_superhero_inspired_by_Marvel_Comics_style._The_superhero_stands_in_a_powerful_pose_showcasing_strength_and_determi_yh6w9c.png"
                      alt={character.name}
                    />
                  ) : (
                    <img
                      src={
                        character.thumbnail.path.replace("http:", "https:") +
                        "/portrait_uncanny." +
                        character.thumbnail.extension
                      }
                      alt={character.name}
                    />
                  )}
                </Fade>
              </Link>
              {character.description && (
                <ModalDescription
                  title={character.name}
                  description={character.description}
                />
              )}
            </article>
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

export default Characters;
