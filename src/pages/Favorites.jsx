import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/connect.provider";

import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import axios from "axios";
import AddEllipsis from "../../functions/addEllipsis";
import { Link } from "react-router-dom";
import ModalDescription from "../components/ModalDescription";
import RmComicFav from "../components/RmComicFav";

const Favorites = () => {
  const { isAuthenticated, user, update } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [charactersData, setCharactersData] = useState([]);
  const [comicsData, setComicsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user.favorites.characters) {
        const characterPromises = user.favorites.characters.map((characterId) =>
          axios.get(
            `${import.meta.env.VITE_API_URL}/character/${characterId}`,
            {
              withCredentials: true,
            }
          )
        );
        const characterResponses = await Promise.all(characterPromises);
        setCharactersData(characterResponses.map((response) => response.data));
        console.log(charactersData);
      }

      if (user.favorites.comics) {
        const comicsPromises = user.favorites.comics.map((comicId) =>
          axios.get(`${import.meta.env.VITE_API_URL}/comic/${comicId}`, {
            withCredentials: true,
          })
        );
        const comicsResponses = await Promise.all(comicsPromises);
        setComicsData(comicsResponses.map((response) => response.data));
        console.log(comicsData);
      }

      setLoading(false);
    };

    if (isAuthenticated) {
      fetchData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return isAuthenticated ? (
    loading ? (
      <div className="loader-div">
        <h1>
          Loading <span className="loader"></span>
        </h1>
      </div>
    ) : (
      <section className="container">
        <div className="fav-title">
          <h1>Characters</h1>
        </div>
        <div className="characters-fav">
          {charactersData.map((character) => {
            return (
              <article
                key={character._id}
                className="home-character-sheet fav-character-sheet"
              >
                <div className="home-character-name">
                  <h3>{AddEllipsis(character.name, 10)}</h3>
                </div>

                <Link
                  to={`/character/${character._id}`}
                  className="home-character-pic fav-character-pic"
                >
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
                </Link>
                {character.description && (
                  <div className="all-comics-description">
                    <ModalDescription
                      description={character.description}
                      title={character.name}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <section className="container">
          <div className="fav-title">
            <h1>Comics</h1>
          </div>
          <div className="comics-fav">
            {comicsData.map((comic) => {
              return (
                <article
                  key={comic._id}
                  className="all-comics-sheet fav-comics-sheet"
                >
                  <div className="all-comics-name fav-comics-name">
                    <h3>{AddEllipsis(comic.title, 14)} </h3>
                  </div>
                  <div>
                    <RmComicFav comic={comic} />
                  </div>

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
                          "/portrait_uncanny." +
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
                </article>
              );
            })}
          </div>
        </section>
      </section>
    )
  ) : (
    <section className="log-fav">
      <div className="log-fav-div">
        <h1>Login</h1>
        <LoginForm />
      </div>
      <div className="log-fav-div">
        <h1>Signup</h1>
        <SignupForm />
      </div>
    </section>
  );
};

export default Favorites;
