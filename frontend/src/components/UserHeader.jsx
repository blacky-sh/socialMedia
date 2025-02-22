import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button, useToast } from "@chakra-ui/react";
// import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // logged in user
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);
  const setSelectedConversation = useSetRecoilState(selectedConversationAtom);
  const navigate = useNavigate();

  const getUsersByIds = async (ids) => {
    try {
      const response = await fetch("/api/users/getUsersByIds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users by IDs:", error);
      throw error;
    }
  };

  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [followings, setFollowings] = useState([]);

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Success.",
        status: "success",
        description: "Profile link copied.",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleMessage = () => {
    setSelectedConversation({
      _id: Date.now(),
      userId: user._id,
      username: user.username,
      userProfilePic: user.profilePic,
      mock: true,
    });
    navigate("/chat");
  };

  const openFollowersModal = async () => {
    try {
      const followersData = await getUsersByIds(user.followers);
      setFollowers(followersData);
      setIsFollowersModalOpen(true);
    } catch (error) {
      toast({
        title: "Error.",
        status: "error",
        description: "Failed to fetch followers.",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const closeFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  const openFollowingModal = async () => {
    try {
      const followingsData = await getUsersByIds(user.following);
      setFollowings(followingsData);
      setIsFollowingModalOpen(true);
    } catch (error) {
      toast({
        title: "Error.",
        status: "error",
        description: "Failed to fetch followings.",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const closeFollowingModal = () => {
    setIsFollowingModalOpen(false);
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>@{user.username}</Text>
            {/* <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text> */}
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>

      <Text>{user.bio}</Text>

      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (
        <Flex gap={2}>
          <Button
            size={"sm"}
            onClick={handleFollowUnfollow}
            isLoading={updating}
          >
            {following ? "Unfollow" : "Follow"}
          </Button>
          {following && (
            <Button size={"sm"} onClick={handleMessage}>
              Message
            </Button>
          )}
        </Flex>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text
            color={"gray.light"}
            cursor="pointer"
            onClick={openFollowersModal}
          >
            {user.followers.length} Followers
          </Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Text
            color={"gray.light"}
            cursor="pointer"
            onClick={openFollowingModal}
          >
            {user.following.length} Following
          </Text>
        </Flex>
        <Flex>
          {/* <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box> */}
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem onClick={copyURL}>Copy link</MenuItem>
                  <MenuItem onClick={copyURL}>Report User</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      {/* <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Replies</Text>
        </Flex>
      </Flex> */}

      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={closeFollowersModal}
        followers={followers}
      />
      <FollowingModal
        isOpen={isFollowingModalOpen}
        onClose={closeFollowingModal}
        followings={followings}
      />
    </VStack>
  );
};

export default UserHeader;
