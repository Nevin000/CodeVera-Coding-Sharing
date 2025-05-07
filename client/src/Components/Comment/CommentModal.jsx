import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike, AiFillHeart } from "react-icons/ai"; // Updated imports
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { timeDifference } from "../../Config/Logic";
import { createComment, getAllComments } from "../../Redux/Comment/Action";
import { findPostByIdAction } from "../../Redux/Post/Action";
import CommentCard from "./CommentCard";
import "./CommentModal.css";

const CommentModal = ({
  isOpen,
  onClose,
  postData,
  handleLikePost,
  handleUnLikePost,
  handleSavePost,
  handleUnSavePost,
  isPostLiked,
  isSaved,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const { post, comments, user } = useSelector((store) => store);
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      dispatch(findPostByIdAction({ jwt, postId }));
      dispatch(getAllComments({ jwt, postId }));
    }
  }, [
    postId,
    comments?.createdComment,
    comments?.deletedComment,
    comments?.updatedComment,
  ]);

  const handleAddComment = () => {
    const data = {
      jwt,
      postId,
      data: {
        content: commentContent,
      },
    };
    dispatch(createComment(data));
    setCommentContent("");
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal size={"4xl"} onClose={handleClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <div className="flex h-[75vh]">
            {/* Left Side - Post Image */}
            <div className="w-[45%] flex flex-col justify-center bg-black">
              <img
                className="max-h-full max-w-full object-contain"
                src={post.singlePost?.image}
                alt="Post content"
              />
            </div>

            {/* Right Side - Comments Section */}
            <div className="w-[55%] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-3 border-b">
                <div className="flex items-center">
                  <img
                    className="w-8 h-8 rounded-full object-cover mr-2"
                    src={
                      post.singlePost?.user?.image ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Profile"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {post?.singlePost?.user?.username}
                    </p>
                  </div>
                </div>
                <BsThreeDots className="text-gray-500 cursor-pointer" />
              </div>

              {/* Comments Container */}
              <div className="flex-1 overflow-y-auto p-3">
                {/* Post Caption */}
                <div className="mb-4 flex">
                  <img
                    className="w-8 h-8 rounded-full object-cover mr-2"
                    src={
                      post.singlePost?.user?.image ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Profile"
                  />
                  <div>
                    <div className="bg-gray-100 rounded-2xl px-3 py-2">
                      <span className="font-semibold text-sm mr-2">
                        {post?.singlePost?.user?.username}
                      </span>
                      <span>{post?.singlePost?.caption}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-2">
                      {timeDifference(post?.singlePost?.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                {comments.comments?.length > 0 &&
                  comments.comments?.map((item) => (
                    <CommentCard key={item.id} comment={item} />
                  ))}
              </div>

              {/* Footer */}
              <div className="border-t p-3">
                {/* Action Buttons */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex space-x-4">
                    {isPostLiked ? (
                      <AiFillHeart
                        onClick={handleUnLikePost}
                        className="text-2xl text-red-500 cursor-pointer"
                      />
                    ) : (
                      <AiOutlineLike
                        onClick={handleLikePost}
                        className="text-2xl cursor-pointer"
                      />
                    )}
                    <FaRegComment className="text-xl cursor-pointer" />
                    <FaShare className="text-xl cursor-pointer" />
                  </div>
                  {isSaved ? (
                    <BsBookmarkFill
                      onClick={() => handleUnSavePost(post.singlePost?.id)}
                      className="text-xl cursor-pointer"
                    />
                  ) : (
                    <BsBookmark
                      onClick={() => handleSavePost(post.singlePost?.id)}
                      className="text-xl cursor-pointer"
                    />
                  )}
                </div>

                {/* Likes Count */}
                {post.singlePost?.likedByUsers?.length > 0 && (
                  <p className="text-sm font-semibold mb-2">
                    {post.singlePost?.likedByUsers?.length} likes
                  </p>
                )}

                {/* Timestamp */}
                <p className="text-xs text-gray-500 mb-3">
                  {timeDifference(post?.singlePost?.createdAt)}
                </p>

                {/* Comment Input */}
                <div className="flex items-center">
                  <img
                    className="w-8 h-8 rounded-full object-cover mr-2"
                    src={
                      user.reqUser?.image ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Profile"
                  />
                  <div className="flex-1 relative">
                    <input
                      className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none"
                      placeholder="Write a comment..."
                      type="text"
                      onKeyPress={handleOnEnterPress}
                      onChange={handleCommnetInputChange}
                      value={commentContent}
                    />
                    <BsEmojiSmile className="absolute right-3 top-2 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
