import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Flex,
} from "@chakra-ui/react";

const ProfilePictureModal = ({ isOpen, onClose, imgUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile Picture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent="center">
            <Image src={imgUrl} alt="Profile Picture" />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfilePictureModal;
