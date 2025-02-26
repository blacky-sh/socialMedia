import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import ReportForm from "../components/ReportForm";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { CgMoreO } from "react-icons/cg";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [replyText, setReplyText] = useState("");
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [editText, setEditText] = useState("");
  const [editImg, setEditImg] = useState("");

  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  const handleEditPost = async () => {
    try {
      const res = await fetch(`/api/posts/update/${currentPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editText, img: editImg }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === currentPost._id
            ? { ...post, text: editText, img: editImg }
            : post
        )
      );
      onEditClose();
      showToast("Success", "Post updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleDeleteReply = (replyId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === currentPost._id
          ? {
              ...post,
              replies: post.replies.filter((reply) => reply._id !== replyId),
            }
          : post
      )
    );
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch(`/api/posts/reply/${currentPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: replyText, createdAt: new Date() }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post._id === currentPost._id) {
            return { ...post, replies: [...post.replies, data] };
          }
          return post;
        });
        return updatedPosts;
      });
      setReplyText("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!currentPost) return null;

  return (
    <Box p={4} borderRadius={6}>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            {user.isVerified && (
              <Image src="/verified.png" w={4} h={4} ml={1} />
            )}
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>

          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={20} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList>
                  {currentUser?._id === user._id && (
                    <>
                      <MenuItem onClick={handleDeletePost}>
                        Delete Post
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setEditText(currentPost.text);
                          setEditImg(currentPost.img);
                          onEditOpen();
                        }}
                      >
                        Edit Post
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={onReportOpen}>Report Post</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
            <Modal isOpen={isReportOpen} onClose={onReportClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Report Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ReportForm
                    onClose={onReportClose}
                    reportType="post"
                    reportedId={pid}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
            <Modal isOpen={isEditOpen} onClose={onEditClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Edit your post"
                  />
                  <Input type="file" onChange={handleFileChange} mt={4} />
                  {editImg && (
                    <Box mt={4}>
                      <Image src={editImg} alt="Post image" />
                      <Button mt={2} onClick={() => setEditImg("")}>
                        Remove Image
                      </Button>
                    </Box>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleEditPost}>
                    Save
                  </Button>
                  <Button variant="ghost" onClick={onEditClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Flex>
      </Flex>

      <Text my={3}>{currentPost.text}</Text>

      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />

      <Flex gap={2} alignItems={"center"}>
        <Input
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <Button onClick={handleReply}>Reply</Button>
      </Flex>

      <Divider my={4} />

      {currentPost.replies.map((reply) => (
        <Box key={reply._id} cursor={"pointer"}>
          <Comment
            reply={reply}
            postId={currentPost._id}
            onDelete={handleDeleteReply}
            lastReply={
              reply._id ===
              currentPost.replies[currentPost.replies.length - 1]._id
            }
          />
        </Box>
      ))}
    </Box>
  );
};

export default PostPage;
