import axios from "axios";
import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [charactersData, setCharactersData] = useState(null);
  const [comicsData, setComicsData] = useState(null);
  let skip = Math.floor(Math.random() * 5);
  const [index, setIndex] = useState({ a: 0, b: 0 });

  useEffect(() => {
    const fetchCharData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/characters/skip/limit/${skip}/40`,
        { withCredentials: false }
      );
      return response.data.results;
    };

    const fetchComData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comics/skip/limit/${skip}/40`,
        { withCredentials: false }
      );
      console.log(response.data.results);
      return response.data.results;
    };

    const fetchData = async () => {
      try {
        const [charData, comData] = await Promise.all([
          fetchCharData(),
          fetchComData(),
        ]);
        setCharactersData(charData);
        setComicsData(comData);
        console.log(comData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);

        setLoading(false);
      }
    };
    const intervalA = setInterval(() => {
      setIndex((prevIndex) => ({
        ...prevIndex,
        a: prevIndex.a < 39 ? prevIndex.a + 1 : 0,
      }));
    }, 6000);

    const intervalB = setInterval(() => {
      setIndex((prevIndex) => ({
        ...prevIndex,
        b: prevIndex.b < 39 ? prevIndex.b + 1 : 0,
      }));
    }, 5000);

    fetchData();
    return () => {
      clearInterval(intervalA);
      clearInterval(intervalB);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div className="loader-div">
      <h1>
        Loading <span className="loader"></span>
      </h1>
    </div>
  ) : (
    <main className="main-container">
      <section className="home-section">
        <div className="home-div">
          <Link to={"/characters"}>
            <h1>All Characters</h1>
          </Link>
          <Zoom
            key={charactersData[index.b]._id}
            cascade
            duration={1000}
            delay={1000}
          >
            <Link to={"/characters"}>
              {charactersData[index.b].thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
              charactersData[index.b].thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                <img
                  src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1703702551/Marvel/DALL_E_2023-12-27_19.41.06_-_A_dynamic_full-body_portrait_of_a_superhero_inspired_by_Marvel_Comics_style._The_superhero_stands_in_a_powerful_pose_showcasing_strength_and_determi_yh6w9c.png"
                  alt={charactersData[index.b].name}
                />
              ) : (
                <img
                  src={
                    charactersData[index.b].thumbnail.path.replace(
                      "http:",
                      "https:"
                    ) +
                    "/portrait_uncanny." +
                    charactersData[index.b].thumbnail.extension
                  }
                  alt={charactersData[index.b].name}
                />
              )}
            </Link>
          </Zoom>
        </div>

        <div className="home-div">
          <Link to={"/comics"}>
            <h1>All Comics</h1>
          </Link>
          <Zoom
            key={comicsData[index.a]._id}
            cascade
            duration={1000}
            delay={500}
          >
            <Link to={"/comics"}>
              {comicsData[index.a].thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
              comicsData[index.a].thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                <img
                  src="https://res.cloudinary.com/drhdqhrbn/image/upload/v1703513482/Marvel/DALL_E.comics_c3stwl.png"
                  alt={comicsData[index.a].title}
                />
              ) : (
                <img
                  src={
                    comicsData[index.a].thumbnail.path.replace(
                      "http:",
                      "https:"
                    ) +
                    "/portrait_uncanny." +
                    comicsData[index.a].thumbnail.extension
                  }
                  alt={comicsData[index.a].title}
                />
              )}{" "}
            </Link>
          </Zoom>
        </div>
      </section>
    </main>
  );
};

export default Home;
