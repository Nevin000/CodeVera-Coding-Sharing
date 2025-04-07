// HomePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard/PostCard";
import StoryCircle from "../../Components/Story/StoryCircle/StoryCircle";
import { hasStory, suggetions, timeDifference } from "../../Config/Logic";
import { findUserPost } from "../../Redux/Post/Action";
import {
  findByUserIdsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const [userIds, setUserIds] = useState([]);
  const token = localStorage.getItem("token");
  const reqUser = useSelector((store) => store.user.reqUser);
  const { user, post } = useSelector((store) => store);
  const [suggestedUser, setSuggestedUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    if (reqUser) {
      const newIds = reqUser?.following?.map((user) => user.id);
      setUserIds([reqUser?.id, ...newIds]);
      setSuggestedUser(suggetions(reqUser));
    }
  }, [reqUser]);

  useEffect(() => {
    const data = {
      userIds: [userIds].join(","),
      jwt: token,
    };
    if (userIds.length > 0) {
      dispatch(findUserPost(data));
      dispatch(findByUserIdsAction(data));
    }
  }, [userIds, post.createdPost, post.deletedPost, post.updatedPost]);

  const storyUsers = hasStory(user.userByIds);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="flex w-[90%] mx-auto gap-8">
        {/* Left - Stories and Posts */}
        <div className="flex flex-col w-[60%]">
          {storyUsers.length > 0 && (
            <div className="flex space-x-3 bg-white p-4 rounded-md shadow-sm mb-6">
              {storyUsers.map((item, index) => (
                <StoryCircle
                  key={index}
                  image={
                    item?.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  username={item?.username}
                  userId={item?.id}
                />
              ))}
            </div>
          )}
          <div className="space-y-6">
            {post.userPost?.length > 0 &&
              post?.userPost?.map((item) => (
                <PostCard
                  userProfileImage={
                    item.user.userImage
                      ? item.user.userImage
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  username={item?.user?.username}
                  location={item?.location}
                  postImage={item?.image}
                  createdAt={timeDifference(item?.createdAt)}
                  postId={item?.id}
                  post={item}
                />
              ))}
          </div>
        </div>

        {/* Right - Suggestions */}
        <div className="w-[30%]">
          <HomeRight suggestedUser={suggestedUser} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
