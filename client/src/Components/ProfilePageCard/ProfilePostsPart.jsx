import React, { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";
import {
  Box,
  Flex,
  Text,
  Stack,
  Divider,
  Avatar,
  Icon,
  Badge,
} from "@chakra-ui/react";
import {
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaVenusMars,
  FaLock,
} from "react-icons/fa";

const ProfilePostsPart = ({ user }) => {
  const [activeTab, setActiveTab] = useState("POST");
  const { post } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const tabs = [
    {
      tab: "POST",
      icon: <AiOutlineTable className="text-xl" />,
      activeIcon: <AiOutlineTable className="text-xl text-black" />,
    },
    {
      tab: "SAVED",
      icon: <BsBookmark className="text-xl" />,
      activeIcon: <BsBookmarkFill className="text-xl text-black" />,
    },
    {
      tab: "ABOUT",
      icon: <AiOutlineUser className="text-xl" />,
      activeIcon: <AiOutlineUser className="text-xl text-black" />,
    },
  ];

  useEffect(() => {
    const data = {
      jwt: token,
      userId: user?.id,
    };
    dispatch(reqUserPostAction(data));
  }, [user, post.createdPost]);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex justify-center border-t border-gray-200">
        <div className="flex space-x-16">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center py-4 px-1 relative ${
                item.tab === activeTab ? "text-black" : "text-gray-500"
              }`}
            >
              <div className="flex items-center space-x-2">
                {item.tab === activeTab ? item.activeIcon : item.icon}
                <span className="text-base font-medium">{item.tab}</span>
              </div>
              {item.tab === activeTab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === "POST" && (
        <div className="grid grid-cols-3 gap-1 mt-1">
          {post.reqUserPost?.length > 0 ? (
            post.reqUserPost?.map((item, index) => (
              <ReqUserPostCard post={item} key={index} />
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center mb-4">
                <AiOutlineTable className="text-3xl" />
              </div>
              <h2 className="text-3xl font-light mb-2">No Posts Yet</h2>
              <p className="text-sm text-gray-500 max-w-md text-center">
                When you share photos and videos, they'll appear on your
                profile.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "SAVED" && (
        <div className="grid grid-cols-3 gap-1 mt-1">
          {user?.savedPost?.length > 0 ? (
            user?.savedPost?.map((item, index) => (
              <ReqUserPostCard post={item} key={index} />
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center mb-4">
                <BsBookmark className="text-3xl" />
              </div>
              <h2 className="text-3xl font-light mb-2">No Saved Posts</h2>
              <p className="text-sm text-gray-500 max-w-md text-center">
                Save photos and videos that you want to see again.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "ABOUT" && (
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm" className="mt-4">
          <Stack spacing={6}>
            {/* Basic Information Section */}
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Basic Information
              </Text>
              <Stack spacing={4}>
                {user?.name && (
                  <Flex align="center">
                    <Avatar
                      size="sm"
                      name={user.name}
                      src={user.image}
                      mr={3}
                    />
                    <Text fontWeight="medium">{user.name}</Text>
                  </Flex>
                )}

                {user?.username && (
                  <Flex align="center">
                    <Text fontWeight="medium" mr={2}>
                      Username:
                    </Text>
                    <Text>@{user.username}</Text>
                  </Flex>
                )}

                {user?.bio && (
                  <Box>
                    <Text fontWeight="medium" mb={1}>
                      Bio:
                    </Text>
                    <Text>{user.bio}</Text>
                  </Box>
                )}

                {user?.website && (
                  <Flex align="center">
                    <Icon as={FaGlobe} mr={2} />
                    <Text
                      as="a"
                      href={user.website}
                      target="_blank"
                      color="blue.500"
                    >
                      {user.website}
                    </Text>
                  </Flex>
                )}
              </Stack>
            </Box>

            <Divider />

            {/* Personal Information Section */}
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Personal Information
              </Text>
              <Stack spacing={4}>
                {user?.email && (
                  <Flex align="center">
                    <Icon as={FaEnvelope} mr={2} />
                    <Text>{user.email}</Text>
                  </Flex>
                )}

                {user?.mobile && (
                  <Flex align="center">
                    <Icon as={FaPhone} mr={2} />
                    <Text>{user.mobile}</Text>
                  </Flex>
                )}

                {user?.gender && (
                  <Flex align="center">
                    <Icon as={FaVenusMars} mr={2} />
                    <Text>{user.gender}</Text>
                  </Flex>
                )}

                {user?.private && (
                  <Flex align="center">
                    <Icon as={FaLock} mr={2} />
                    <Text>Private Account</Text>
                    {user.private && (
                      <Badge ml={2} colorScheme="purple">
                        Private
                      </Badge>
                    )}
                  </Flex>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </div>
  );
};

export default ProfilePostsPart;
