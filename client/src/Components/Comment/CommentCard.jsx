import React, { useEffect, useState } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logic";
import { deleteComment, likeComment } from "../../Redux/Comment/Action";
import { BsEmojiSmile, BsThreeDots, BsReply } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { editComment } from "../../Redux/Comment/Action";

const CommentCard = ({ comment }) => {
  const [isCommentLiked, setIsCommentLike] = useState(false);
  const { user } = useSelector((store) => store);
  const [commentLikes, setCommentLikes] = useState(0);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const [isEditCommentInputOpen, setIsEditCommentInputOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setCommentContent(comment?.content);
  }, [comment]);

  const handleLikeComment = () => {
    dispatch(likeComment({ jwt, commentId: comment.id }));
    setIsCommentLike(true);
    setCommentLikes(commentLikes + 1);
  };

  const handleUnLikeComment = () => {
    dispatch(likeComment({ jwt, commentId: comment.id }));
    setIsCommentLike(false);
    setCommentLikes(commentLikes - 1);
  };

  useEffect(() => {
    setCommentLikes(comment?.likedByUsers?.length);
  }, [comment]);

  useEffect(() => {
    setIsCommentLike(isCommentLikedByUser(comment, user.reqUser?.id));
  }, [comment, user.reqUser]);

  const handleClickOnEditComment = () => {
    setIsEditCommentInputOpen(!isEditCommentInputOpen);
    setShowOptions(false);
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId: comment.id, jwt }));
    setShowOptions(false);
  };

  const handleEditComment = (e) => {
    if (e.key === "Enter") {
      dispatch(
        editComment({ data: { id: comment?.id, content: commentContent }, jwt })
      );
      setIsEditCommentInputOpen(false);
      setCommentContent("");
    }
  };

  return (
    <div className="relative">
      <div className="flex items-start py-2 px-3 hover:bg-gray-50 rounded-lg">
        <div className="flex-shrink-0 mr-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={
              comment?.userDto.userImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 rounded-2xl px-3 py-2">
            <div className="flex items-baseline">
              <span className="font-semibold text-sm hover:underline cursor-pointer mr-2">
                {comment.userDto.username}
              </span>
              <span className="text-xs text-gray-500">
                {timeDifference(comment?.createdAt)}
              </span>
            </div>

            {isEditCommentInputOpen ? (
              <input
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 mt-1 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Edit your comment..."
                type="text"
                onKeyPress={handleEditComment}
                onChange={handleCommnetInputChange}
                value={commentContent}
                autoFocus
              />
            ) : (
              <p className="text-sm mt-1">{comment.content}</p>
            )}
          </div>

          <div className="flex items-center text-xs text-gray-500 mt-1 ml-2 space-x-3">
            <button
              onClick={isCommentLiked ? handleUnLikeComment : handleLikeComment}
              className={`hover:underline ${
                isCommentLiked ? "text-blue-500 font-semibold" : ""
              }`}
            >
              Like
            </button>
            <button className="hover:underline">Reply</button>
            {commentLikes > 0 && (
              <span className="text-xs">
                {commentLikes} {commentLikes === 1 ? "like" : "likes"}
              </span>
            )}
          </div>
        </div>

        {user?.reqUser?.id === comment?.userDto?.id && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-500 hover:bg-gray-200 rounded-full p-1"
            >
              <BsThreeDots size={16} />
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <button
                  onClick={handleClickOnEditComment}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <MdEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  <MdDelete className="mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
