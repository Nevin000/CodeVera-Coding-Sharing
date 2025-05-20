import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import "./ReqUserPostCard.css";

const ReqUserPostCard = ({ post }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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

  const isVideo = (url) => url?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="p-2">
      <div className="post w-60 h-60 relative">
        {post?.mediaUrls ? (
          <>
            {isVideo(post.mediaUrls[currentMediaIndex]) ? (
              <video
                className="w-full h-full object-cover"
                src={post.mediaUrls[currentMediaIndex]}
                controls
              />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={post.mediaUrls[currentMediaIndex]}
                alt=""
              />
            )}

            {post.mediaUrls.length > 1 && (
              <>
                <IconButton
                  icon={<ChevronLeftIcon />}
                  onClick={handlePrevMedia}
                  position="absolute"
                  left="0"
                  top="50%"
                  transform="translateY(-50%)"
                  bg="transparent"
                />
                <IconButton
                  icon={<ChevronRightIcon />}
                  onClick={handleNextMedia}
                  position="absolute"
                  right="0"
                  top="50%"
                  transform="translateY(-50%)"
                  bg="transparent"
                />
              </>
            )}
          </>
        ) : (
          <img
            className="w-full h-full object-cover"
            src={post?.image}
            alt=""
          />
        )}

        <div className="overlay">
          <div className="overlay-text flex justify-between">
            <div className="flex items-center">
              <AiFillHeart className="mr-2" /> {post?.likedByUsers?.length}
            </div>
            <div className="flex items-center">
              <FaComment className="mr-2" /> {post?.comments?.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqUserPostCard;
