import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalDescription from "../components/ModalDescription";
import AddEllipsis from "../../functions/addEllipsis";
import AddCharacterFav from "../components/AddCharacterFav";

const CharacterComics = () => {
  const [loading, setLoading] = useState(true);
  const [characterData, setCharacterData] = useState(null);
  const [comicsSheet, setComicsSheet] = useState([]);

  const params = useParams();
  const characterId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const characterResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/character/${characterId}`,
        { withCredentials: true }
      );
      setCharacterData(characterResponse.data);

      if (characterResponse.data.comics) {
        const comicsPromises = characterResponse.data.comics.map((comicId) =>
          axios.get(`${import.meta.env.VITE_API_URL}/comic/${comicId}`, {
            withCredentials: true,
          })
        );

        const comicsResponses = await Promise.all(comicsPromises);
        setComicsSheet(comicsResponses.map((response) => response.data));
      }

      setLoading(false);
    };

    fetchData();
  }, [characterId]);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <main className="main-container">
      <section className="solo-character">
        <div className="solo-character-title">
          <h1> {characterData.name} </h1>
        </div>
        <div className="solo-character-pic">
          {characterData.thumbnail.path ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
          characterData.thumbnail.path ===
            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
            <img
              src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1703702551/Marvel/DALL_E_2023-12-27_19.41.06_-_A_dynamic_full-body_portrait_of_a_superhero_inspired_by_Marvel_Comics_style._The_superhero_stands_in_a_powerful_pose_showcasing_strength_and_determi_yh6w9c.png"
              alt={characterData.name}
            />
          ) : (
            <img
              src={
                characterData.thumbnail.path.replace("http:", "https:") +
                "/portrait_uncanny." +
                characterData.thumbnail.extension
              }
              alt={characterData.name}
            />
          )}
        </div>
        <AddCharacterFav character={characterData} />
        {characterData.description && (
          <div className="character-com-character-description">
            <p>{characterData.description}</p>
          </div>
        )}
      </section>
      <section className="solo-character-comics">
        {comicsSheet.map((comic) => {
          return (
            <article className="solo-comic-sheet" key={comic.title}>
              <div className="solo-character-comic-title">
                <h2> {AddEllipsis(comic.title, 30)} </h2>
              </div>
              <div className="solo-character-comic-pic">
                {comic.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                comic.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                  <img
                    src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1702737418/Marvel/DALL_E-hero_r7yvqr.png"
                    alt={comic.name}
                  />
                ) : (
                  <img
                    src={
                      comic.thumbnail.path.replace("http", "https") +
                      "/portrait_uncanny." +
                      comic.thumbnail.extension
                    }
                    alt={comic.name}
                  />
                )}
              </div>

              <ModalDescription
                title={comic.title}
                description={comic.description}
              />
            </article>
          );
        })}
      </section>
    </main>
  );
};
export default CharacterComics;
