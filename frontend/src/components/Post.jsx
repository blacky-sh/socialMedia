import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text, Badge, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { CgMoreO } from "react-icons/cg";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/modal";
import ReportForm from "./ReportForm";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleMarkAsFound = async () => {
    try {
      const res = await fetch(`/api/posts/found/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post marked as found", "success");
      setPosts(posts.map((p) => (p._id === post._id ? data.post : p)));
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user) return null;
  return (
    <Flex gap={3} mb={4} py={5}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Avatar
          size="md"
          name={user.name}
          src={user?.profilePic}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${user.username}`);
          }}
        />
        <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
        <Box position={"relative"} w={"full"}>
          {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
          {post.replies[0] && (
            <Avatar
              size="xs"
              name="John doe"
              src={post.replies[0].userProfilePic}
              position={"absolute"}
              top={"0px"}
              left="15px"
              padding={"2px"}
            />
          )}
        </Box>
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={2}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex w={"full"} alignItems={"center"}>
            <Text
              fontSize={"sm"}
              fontWeight={"bold"}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${user.username}`);
              }}
            >
              {user?.username}
            </Text>
            {post.category && !post.found && (
              <Badge ml={2} colorScheme="blue">
                {post.category}
              </Badge>
            )}
            {post.propertyType && !post.found && (
              <Badge ml={2} colorScheme="yellow">
                {post.propertyType}
              </Badge>
            )}
            {post.found && (
              <Badge ml={2} colorScheme="green">
                FOUND
              </Badge>
            )}
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"xs"} color={"gray.light"} w={"70px"}>
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </Text>
            <Box className="icon-container">
              <Menu>
                <MenuButton>
                  <CgMoreO size={20} cursor={"pointer"} />
                </MenuButton>
                <Portal>
                  <MenuList>
                    {currentUser?._id === user._id && (
                      <MenuItem onClick={handleDeletePost}>
                        Delete Post
                      </MenuItem>
                    )}
                    <MenuItem onClick={onOpen}>Report Post</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Report Post</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <ReportForm
                      onClose={onClose}
                      reportType="post"
                      reportedId={post._id}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>
        </Flex>
        <Link to={`/${user.username}/post/${post._id}`}>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}
        </Link>

        <Flex gap={3} my={1} justifyContent={"space-between"}>
          <Link to={`/${user.username}/post/${post._id}`}>
            <Actions post={post} />
          </Link>
          {currentUser?._id === user._id &&
            !post.found &&
            (post?.category == "Lost" || post?.category == "Stolen") && (
              <Button size="sm" colorScheme="green" onClick={handleMarkAsFound}>
                Mark as Found
              </Button>
            )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Post;
