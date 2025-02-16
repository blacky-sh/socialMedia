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

const FollowersModal = ({ isOpen, onClose, followers }) => {
  const currentUser = useRecoilValue(userAtom);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Followers</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {followers.map((follower) => {
              const { handleFollowUnfollow, following, updating } =
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useFollowUnfollow(follower);

              return (
                <Flex
                  key={follower._id}
                  align="center"
                  w="full"
                  justify="space-between"
                >
                  <Flex align="center">
                    <Avatar
                      name={follower.username}
                      src={follower.profilePic}
                    />
                    <VStack align="start" ml={4}>
                      <Text fontWeight="bold">
                        <RouterLink
                          to={`/${follower.username}`}
                          onClick={onClose}
                        >
                          {follower.name} <br />@{follower.username}
                        </RouterLink>
                      </Text>
                    </VStack>
                  </Flex>
                  {currentUser._id !== follower._id && (
                    <Button
                      size="sm"
                      onClick={handleFollowUnfollow}
                      isLoading={updating}
                    >
                      {following ? "Unfollow" : "Follow"}
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

export default FollowersModal;
