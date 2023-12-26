import axios from "axios";
import toast from "react-hot-toast";
import { IoIosStar } from "react-icons/io";
import AddEllipsis from "../../functions/addEllipsis";
import { useContext } from "react";
import { AuthContext } from "../context/connect.provider";

const AddCharacterFav = ({ character }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const handleAddCharFav = async () => {
    try {
      if (isAuthenticated) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/addfav/character`,
          { characterId: character._id, title: character.title },
          {
            withCredentials: true,
          }
        );

        toast.success(`${AddEllipsis(res.data, 10)} Added to favorites`);
      } else {
        toast.error("Login To Add Favorites");
      }
    } catch (error) {
      if (error.response.status === 406) {
        toast.error(
          `${AddEllipsis(error.response.data, 15)} already added to favorites`
        );
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <div onClick={handleAddCharFav} className="add-fav">
      <span>
        <IoIosStar />
      </span>
    </div>
  );
};

export default AddCharacterFav;
