import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { FiEdit, FiMessageSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAction, unFollowUserAction } from "../../Redux/User/Action";

const UserDetailCard = ({ user, isRequser, isFollowing }) => {
  const token = localStorage.getItem("token");
  const { post } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollow, setIsFollow] = useState(false);

  const goToAccountEdit = () => navigate("/account/edit");

  const data = { jwt: token, userId: user?.id };

  const handleFollowUser = () => {
    dispatch(followUserAction(data));
    setIsFollow(true);
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(data));
    setIsFollow(false);
  };

  useEffect(() => {
    setIsFollow(isFollowing);
  }, [isFollowing]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow rounded-md">
      {/* Cover Photo */}
      <div className="relative h-48 bg-gray-200 rounded-t-md">
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-6">
          <img
            className="h-24 w-24 rounded-full border-4 border-white object-cover"
            src={
              user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt={user?.username}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-16 pb-6 px-6 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p className="text-gray-600">{user?.name}</p>
          <p className="text-sm text-gray-700 mt-1">{user?.bio}</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 md:mt-0 flex gap-3 flex-wrap items-center">
          {isRequser ? (
            <button
              onClick={goToAccountEdit}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
            >
              <FiEdit size={16} />
              Edit Profile
            </button>
          ) : isFollow ? (
            <button
              onClick={handleUnFollowUser}
              className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-md text-sm font-medium"
            >
              Following
            </button>
          ) : (
            <button
              onClick={handleFollowUser}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              Follow
            </button>
          )}
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">
            <FiMessageSquare size={16} />
            {isRequser ? "Tools" : "Message"}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <TbCircleDashed size={20} />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-t px-6 py-4 flex justify-around text-center">
        <div>
          <span className="font-semibold text-lg">
            {post?.reqUserPost?.length || 0}
          </span>
          <p className="text-gray-600 text-sm">Posts</p>
        </div>
        <div>
          <span className="font-semibold text-lg">
            {user?.follower?.length || 0}
          </span>
          <p className="text-gray-600 text-sm">Followers</p>
        </div>
        <div>
          <span className="font-semibold text-lg">
            {user?.following?.length || 0}
          </span>
          <p className="text-gray-600 text-sm">Following</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
