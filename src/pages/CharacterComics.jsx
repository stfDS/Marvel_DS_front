import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterComics = () => {
  const [loading, setLoading] = useState(true);
  const [characterData, setCharacterData] = useState(null);
  const [comicsSheet, setComicsSheet] = useState([]);

  const params = useParams();
  const characterId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const characterResponse = await axios.get(
        `https://site--marvel-ds--5gjnlvwzlmps.code.run/character/${characterId}`
      );
      setCharacterData(characterResponse.data);

      if (characterResponse.data.comics) {
        const comicsPromises = characterResponse.data.comics.map((comicId) =>
          axios.get(
            `https://site--marvel-ds--5gjnlvwzlmps.code.run/comic/${comicId}`
          )
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
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
            <img
              src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1702737418/Marvel/DALL_E-hero_r7yvqr.png"
              alt={characterData.name}
            />
          ) : (
            <img
              src={
                characterData.thumbnail.path +
                "." +
                characterData.thumbnail.extension
              }
              alt={characterData.name}
            />
          )}
        </div>
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
                <h2> {comic.title} </h2>
              </div>
              <div className="solo-character-comic-pic">
                {comic.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                  <img
                    src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1702737418/Marvel/DALL_E-hero_r7yvqr.png"
                    alt={comic.name}
                  />
                ) : (
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt={comic.name}
                  />
                )}
              </div>
              {/* <div className="solo-character-comic-description">
                <p>{comic.description}</p>
              </div> */}
            </article>
          );
        })}
      </section>
    </main>
  );
};
export default CharacterComics;
