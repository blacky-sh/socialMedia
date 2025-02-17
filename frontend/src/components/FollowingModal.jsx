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
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const FollowingModal = ({ isOpen, onClose, followings }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Following</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {followings.length == 0 ? (
              <Text>User Doesn&apos;t follow anyone!</Text>
            ) : (
              followings.map((following) => (
                <>
                  <Flex key={following._id} align="center" w="full">
                    <Avatar
                      name={following.username}
                      src={following.profilePic}
                    />
                    <Flex align="start" ml={4} justify="space-between" w="full">
                      <RouterLink
                        to={`/${following.username}`}
                        onClick={onClose}
                      >
                        <Text>{following.username}</Text>
                        <Text fontWeight="bold">{following.name}</Text>
                      </RouterLink>
                    </Flex>
                  </Flex>
                  <Divider />
                </>
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
