import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { formatDistanceToNow } from "date-fns";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messagesAtom";

const Conversation = ({ conversation, isOnline }) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const colorMode = useColorMode();

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
          mock: conversation.mock,
        })
      }
      bg={
        selectedConversation?._id === conversation._id
          ? colorMode === "light"
            ? "gray.400"
            : "gray.600"
          : ""
      }
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar size={"md"} src={user.profilePic}>
          {isOnline ? <AvatarBadge boxSize="1em" bg="green.500" /> : ""}
        </Avatar>
      </WrapItem>

      <Stack direction={"column"} fontSize={"sm"} w={"100%"}>
        <Flex justifyContent={"space-between"}>
          <Text fontWeight="700" display={"flex"} alignItems={"center"}>
            {user.username}
            {user.isVerified && (
              <Image src="/verified.png" w={4} h={4} ml={1} />
            )}
          </Text>
          <Text fontSize={"xs"}>
            {conversation.updatedAt
              ? formatDistanceToNow(new Date(conversation.updatedAt))
              : "less than a minute"}{" "}
            ago
          </Text>
        </Flex>

        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender ? (
            <BsCheck2All color={lastMessage.seen ? "blue.400" : ""} size={16} />
          ) : (
            ""
          )}
          {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text || <BsFillImageFill size={16} />}
        </Text>
        {conversation.unseenMessagesCount > 0 && (
          <Badge
            colorScheme="gray"
            borderRadius={50}
            w={6}
            h={6}
            textAlign={"center"}
            alignContent={"center"}
            alignSelf={"flex-end"}
          >
            {conversation.unseenMessagesCount}
          </Badge>
        )}
      </Stack>
    </Flex>
  );
};

export default Conversation;
