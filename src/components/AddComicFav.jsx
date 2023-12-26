import axios from "axios";
import toast from "react-hot-toast";
import { IoIosStar } from "react-icons/io";
import AddEllipsis from "../../functions/addEllipsis";
import { useContext } from "react";
import { AuthContext } from "../context/connect.provider";

const AddComicFav = ({ comic }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const handleAddComFav = async () => {
    try {
      if (isAuthenticated) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/addfav/comic`,
          { comicId: comic._id, title: comic.title },
          {
            withCredentials: true,
          }
        );
        if (res.status === 201) {
          toast.success(`${AddEllipsis(res.data, 10)} Added to favorites`);
        }

        toast.error(`${AddEllipsis(res.data, 10)} already added to favorites`);
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
    <div onClick={handleAddComFav} className="add-fav">
      <span>
        <IoIosStar />
      </span>
    </div>
  );
};

export default AddComicFav;
