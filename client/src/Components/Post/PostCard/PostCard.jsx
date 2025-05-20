import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import {
  FaRegComment,
  FaShare,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { BsThreeDots, BsEmojiSmile } from "react-icons/bs";
import { createNotificationAction } from "../../../Redux/Notification/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
  timeDifference,
} from "../../../Config/Logic";
import { createComment } from "../../../Redux/Comment/Action";
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../../Redux/Post/Action";
import CommentModal from "../../Comment/CommentModal";
import "./PostCard.css";
import EditPostModal from "../Create/EditPostModal";

const PostCard = ({
  userProfileImage,
  username,
  location,
  post,
  createdAt,
}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openEditPostModal, setOpenEditPostModal] = useState(false);

  const handleCommentInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const [numberOfLikes, setNumberOfLike] = useState(0);

  const data = {
    jwt: token,
    postId: post.id,
  };

  const handleAddComment = () => {
    const data = {
      jwt: token,
      postId: post.id,
      data: {
        content: commentContent,
      },
    };
    dispatch(createComment(data));
    setCommentContent("");

    if (post.user.id !== user.reqUser.id) {
      const notification = {
        message: `${user.reqUser.username} commented: ${commentContent}`,
        type: "COMMENT",
        postId: post.id,
      };
      dispatch(createNotificationAction(notification, token));
    }
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  const handleLikePost = () => {
    dispatch(likePostAction(data));
    setIsPostLiked(true);
    setNumberOfLike(numberOfLikes + 1);

    if (post.user.id !== user.reqUser.id) {
      const notification = {
        message: `${user.reqUser.username} liked your post`,
        type: "LIKE",
        postId: post.id,
      };
      dispatch(createNotificationAction(notification, token));
    }
  };

  const handleUnLikePost = () => {
    dispatch(unLikePostAction(data));
    setIsPostLiked(false);
    setNumberOfLike(numberOfLikes - 1);
  };

  const handleSavePost = () => {
    dispatch(savePostAction(data));
    setIsSaved(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === post.mediaUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? post.mediaUrls.length - 1 : prev - 1
    );
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  useEffect(() => {
    setIsSaved(isSavedPost(user.reqUser, post.id));
    setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
    setNumberOfLike(post?.likedByUsers?.length);
  }, [user.reqUser, post]);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleWindowClick = (event) => {
    if (!event.target.matches(".dots")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    const data = {
      jwt: token,
      postId,
    };
    dispatch(deletePostAction(data));
  };

  const isOwnPost = isReqUserPost(post, user.reqUser);

  const handleOpenCommentModal = () => {
    navigate(`/p/${post.id}`);
    onOpen();
  };

  const handleCloseEditPostModal = () => {
    setOpenEditPostModal(false);
  };

  const handleOpenEditPostModal = () => {
    setOpenEditPostModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={
              post.user.userImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
          />
          <div className="ml-2">
            <div
              className="font-semibold text-sm hover:underline cursor-pointer"
              onClick={() => handleNavigate(username)}
            >
              {post?.user?.username}
            </div>
            <div className="text-xs text-gray-500">
              {timeDifference(post?.createdAt)} • {location}
            </div>
          </div>
        </div>
        {isOwnPost && (
          <div className="relative">
            <BsThreeDots
              onClick={handleClick}
              className="dots text-gray-500 cursor-pointer hover:bg-gray-100 rounded-full p-1"
              size={20}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={handleOpenEditPostModal}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Post
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-3">
        <p className="mb-2">{post.caption}</p>
      </div>

      {/* Media Section */}
      <div className="relative">
        {post.mediaUrls?.map((url, index) => (
          <div
            key={index}
            className={`${index === currentMediaIndex ? "block" : "hidden"}`}
          >
            {isVideo(url) ? (
              <video src={url} controls className="w-full" />
            ) : (
              <img
                src={url}
                alt={`Post media ${index + 1}`}
                className="w-full"
              />
            )}
          </div>
        ))}

        {post.mediaUrls?.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {post.mediaUrls?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentMediaIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                aria-label={`Go to media ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Likes and Comments Count */}
      <div className="px-4 py-2 border-b border-t text-sm text-gray-500">
        <div className="flex justify-between">
          <div className="flex items-center">
            {numberOfLikes > 0 && (
              <>
                <div className="bg-blue-500 text-white rounded-full p-1 mr-1">
                  <AiFillLike size={12} />
                </div>
                <span>{numberOfLikes}</span>
              </>
            )}
          </div>
          <div>
            {post?.comments?.length > 0 && (
              <span
                className="hover:underline cursor-pointer"
                onClick={handleOpenCommentModal}
              >
                {post?.comments?.length} comments
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 flex justify-between text-gray-500">
        <button
          onClick={isPostLiked ? handleUnLikePost : handleLikePost}
          className={`flex items-center justify-center w-full py-1 rounded hover:bg-gray-100 ${
            isPostLiked ? "text-blue-500" : ""
          }`}
        >
          <AiOutlineLike className="mr-1" size={18} />
          <span>Like</span>
        </button>
        <button
          onClick={handleOpenCommentModal}
          className="flex items-center justify-center w-full py-1 rounded hover:bg-gray-100"
        >
          <FaRegComment className="mr-1" size={16} />
          <span>Comment</span>
        </button>
        <button className="flex items-center justify-center w-full py-1 rounded hover:bg-gray-100">
          <FaShare className="mr-1" size={16} />
          <span>Share</span>
        </button>
        <button
          onClick={isSaved ? handleUnSavePost : handleSavePost}
          className="flex items-center justify-center w-full py-1 rounded hover:bg-gray-100"
        >
          {isSaved ? (
            <FaBookmark className="mr-1" size={16} />
          ) : (
            <FaRegBookmark className="mr-1" size={16} />
          )}
          <span>Save</span>
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex items-center p-3 border-t">
        <img
          className="w-8 h-8 rounded-full object-cover mr-2"
          src={
            user.reqUser?.userImage ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
        />
        <div className="flex-1 relative">
          <input
            onKeyPress={handleOnEnterPress}
            onChange={handleCommentInputChange}
            value={commentContent}
            className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <BsEmojiSmile className="absolute right-3 top-2 text-gray-400" />
        </div>
      </div>

      <EditPostModal
        onClose={handleCloseEditPostModal}
        isOpen={openEditPostModal}
        onOpen={handleOpenEditPostModal}
        post={post}
      />

      <CommentModal
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleUnSavePost={handleUnSavePost}
        handleUnLikePost={handleUnLikePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default PostCard;
