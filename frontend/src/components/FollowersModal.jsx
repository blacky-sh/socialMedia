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

const FollowersModal = ({ isOpen, onClose, followers }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Followers</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {followers.length == 0 ? (
              <Text>User Doesn't have any followers! </Text>
            ) : (
              followers.map((follower) => (
                <Flex key={follower._id} align="center" w="full">
                  <Avatar name={follower.username} src={follower.profilePic} />
                  <Flex align="start" ml={4} justify="space-between" w="full">
                    <Text fontWeight="bold">
                      <RouterLink
                        to={`/${follower.username}`}
                        onClick={onClose}
                      >
                        {follower.name} <br />@{follower.username}
                      </RouterLink>
                    </Text>
                  </Flex>
                </Flex>
              ))
            )}
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
