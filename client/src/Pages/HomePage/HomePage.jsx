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
    <div className="homepage-container">
      <div className="mt-10 flex w-full justify-center">
        {/* Main Content */}
        <div className="flex flex-col w-full max-w-2xl px-4 md:px-10 items-center">
          {/* Stories Section */}
          {storyUsers.length > 0 && (
            <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 w-full mb-6 overflow-x-auto">
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

          {/* Posts Section */}
          <div className="w-full space-y-6">
            {post.userPost?.length > 0 ? (
              post.userPost.map((item) => (
                <PostCard
                  key={item.id}
                  userProfileImage={
                    item.user.userImage ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  username={item?.user?.username}
                  location={item?.location}
                  postImage={item?.image}
                  createdAt={timeDifference(item?.createdAt)}
                  postId={item?.id}
                  post={item}
                  likes={item.likedByUsers || []}
                  comments={item.comments || []}
                  caption={item.caption}
                />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No posts to show. Follow more people to see their posts.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Navbar */}
        <div className="hidden lg:block w-80 pr-4 pl-6">
          <HomeRight suggestedUser={suggestedUser} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
