import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { IoIosStar } from "react-icons/io";
import { AuthContext } from "../context/connect.provider";

const RmCharacterFav = ({ character }) => {
  const { update, setUdate } = useContext(AuthContext);

  const handleRemove = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/rmfav/comic`,
        { comicId: character._id },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setUdate(!update);
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

export default RmCharacterFav;
