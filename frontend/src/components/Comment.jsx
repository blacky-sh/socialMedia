import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex
        py={2}
        my={2}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex gap={4}>
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
        <Text>
          {" "}
          {reply.createdAt
            ? formatDistanceToNow(new Date(reply.createdAt))
            : ""}{" "}
          ago
        </Text>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
  );
};

export default Comment;
