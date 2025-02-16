import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const FollowingModal = ({ isOpen, onClose, followings }) => {
  const currentUser = useRecoilValue(userAtom);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Following</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {followings.map((following) => {
              const {
                handleFollowUnfollow,
                following: isFollowing,
                updating,
                // eslint-disable-next-line react-hooks/rules-of-hooks
              } = useFollowUnfollow(following);

              return (
                <Flex
                  key={following._id}
                  align="center"
                  w="full"
                  justify="space-between"
                >
                  <Flex align="center">
                    <Avatar
                      name={following.username}
                      src={following.profilePic}
                    />
                    <VStack align="start" ml={4}>
                      <Text fontWeight="bold">
                        <RouterLink
                          to={`/${following.username}`}
                          onClick={onClose}
                        >
                          {following.name} <br />@{following.username}
                        </RouterLink>
                      </Text>
                    </VStack>
                  </Flex>
                  {currentUser._id !== following._id && (
                    <Button
                      size="sm"
                      onClick={handleFollowUnfollow}
                      isLoading={updating}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                </Flex>
              );
            })}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FollowingModal;
