import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { IoIosStar } from "react-icons/io";
import { AuthContext } from "../context/connect.provider";
import AddEllipsis from "../../functions/addEllipsis";

const RmComicFav = ({ comic }) => {
  const { setUpdate, update } = useContext(AuthContext);

  const handleRemove = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/rmfav/comic`,
        { comicId: comic._id, title: comic.title },
        {
          withCredentials: true,
        }
      );
      toast.success(`${AddEllipsis(res.data, 10)} Added to favorites`);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div onClick={handleRemove} className="rm-fav">
      <span>
        <IoIosStar />
      </span>
    </div>
  );
};

export default RmComicFav;
