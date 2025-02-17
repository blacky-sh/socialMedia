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

const FollowingModal = ({ isOpen, onClose, followings }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Following</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {followings.length == 0 ? (
              <Text>User Doesn't follow anyone!</Text>
            ) : (
              followings.map((following) => (
                <Flex key={following._id} align="center" w="full">
                  <Avatar
                    name={following.username}
                    src={following.profilePic}
                  />
                  <Flex align="start" ml={4} justify="space-between" w="full">
                    <Text fontWeight="bold">
                      <RouterLink
                        to={`/${following.username}`}
                        onClick={onClose}
                      >
                        {following.name} <br />@{following.username}
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

export default FollowingModal;
