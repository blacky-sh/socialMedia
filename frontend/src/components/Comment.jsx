import { Avatar, Divider, Flex, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";

const Comment = ({ reply, lastReply, postId, onDelete }) => {
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const handleDeleteReply = async () => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;

    try {
      const res = await fetch(`/api/posts/reply/${postId}/${reply._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Reply deleted", "success");
      onDelete(reply._id);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Flex
        py={2}
        my={2}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex gap={4} onClick={() => navigate(`/${reply.username}`)}>
          <Avatar src={reply.userProfilePic} size={"sm"} />
          <Flex gap={1} w={"full"} flexDirection={"column"}>
            <Flex
              w={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text fontSize="sm" fontWeight="bold">
                {reply.username}
              </Text>
            </Flex>
            <Text>{reply.text}</Text>
          </Flex>
        </Flex>
        <Flex>
          <Text mx={2} fontSize="sm" color="gray.500">
            {reply.createdAt
              ? formatDistanceToNow(new Date(reply.createdAt))
              : ""}{" "}
            ago
          </Text>
          {currentUser?._id === reply.userId && (
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              onClick={handleDeleteReply}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
            />
          )}
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
  );
};

export default Comment;
