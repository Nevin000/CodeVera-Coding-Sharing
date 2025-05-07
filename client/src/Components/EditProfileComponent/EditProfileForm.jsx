import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserDetailsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";

const EditProfileForm = () => {
  const { user } = useSelector((store) => store);
  const toast = useToast();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);

  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
    private: false,
  });

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    if (user.reqUser) {
      const newValue = {};
      for (let item in initialValues) {
        if (user.reqUser[item]) {
          newValue[item] = user.reqUser[item];
        }
      }
      formik.setValues(newValue);
    }
  }, [user.reqUser]);

  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit: (values) => {
      const data = {
        jwt: token,
        data: { ...values, id: user.reqUser?.id },
      };
      dispatch(editUserDetailsAction(data));
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    },
  });

  async function handleProfileImageChange(event) {
    const selectedFile = event.target.files[0];
    const image = await uploadToCloudinary(selectedFile);
    setImageFile(image);
    const data = {
      jwt: token,
      data: { image, id: user.reqUser?.id },
    };
    dispatch(editUserDetailsAction(data));
    onClose();
  }

  return (
    <Box maxW="xl" mx="auto" p={6} borderWidth="1px" borderRadius="lg">
      <Flex direction="column" gap={6}>
        {/* Profile Header */}
        <Flex align="center" gap={4}>
          <Avatar
            size="xl"
            src={
              imageFile ||
              user.reqUser?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <Box>
            <Heading size="md">{user.reqUser?.username}</Heading>
            <Button variant="link" colorScheme="blue" onClick={onOpen} mt={1}>
              Change Profile Photo
            </Button>
          </Box>
        </Flex>

        {/* Edit Form */}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={6}>
            {/* Basic Information Section */}
            <Box>
              <Heading size="sm" mb={4}>
                Basic Information
              </Heading>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Your full name"
                    {...formik.getFieldProps("name")}
                  />
                  <FormHelperText fontSize="xs">
                    Help people discover your account by using the name you're
                    known by.
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="Username"
                    {...formik.getFieldProps("username")}
                  />
                  <FormHelperText fontSize="xs">
                    You can change your username every 14 days.
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input
                    placeholder="Your website"
                    {...formik.getFieldProps("website")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    placeholder="Tell us about yourself"
                    {...formik.getFieldProps("bio")}
                    resize="vertical"
                    minH="100px"
                  />
                </FormControl>
              </Stack>
            </Box>

            {/* Personal Information Section */}
            <Box pt={4}>
              <Heading size="sm" mb={4}>
                Personal Information
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Provide your personal information (this won't be public).
              </Text>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Your email"
                    {...formik.getFieldProps("email")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    {...formik.getFieldProps("mobile")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input
                    placeholder="Your gender"
                    {...formik.getFieldProps("gender")}
                  />
                </FormControl>

                <FormControl>
                  <Checkbox {...formik.getFieldProps("private")}>
                    Private Account
                  </Checkbox>
                </FormControl>
              </Stack>
            </Box>

            <Button
              colorScheme="blue"
              type="submit"
              mt={4}
              isLoading={formik.isSubmitting}
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Flex>

      <ChangeProfilePhotoModal
        handleProfileImageChange={handleProfileImageChange}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </Box>
  );
};

export default EditProfileForm;
