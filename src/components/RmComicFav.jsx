import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { IoIosStar } from "react-icons/io";
import { AuthContext } from "../context/connect.provider";

const RmComicFav = ({ comic }) => {
  const { update, setUpdate } = useContext(AuthContext);

  const handleRemove = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/rmfav/comic`,
        { comicId: comic._id },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      toast.success(res.data.message);
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
