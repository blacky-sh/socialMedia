import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const MAX_CHAR = 500;
const MAX_DESC_CHAR = 20;

const CreatePost = ({ onPostCreated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const imageRef = useRef(null);
  const [isLostItem, setIsLostItem] = useState(false);
  const [category, setCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [description, setDescription] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [remainingDescChar, setRemainingDescChar] = useState(MAX_DESC_CHAR);
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleDescriptionChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_DESC_CHAR) {
      const truncatedText = inputText.slice(0, MAX_DESC_CHAR);
      setDescription(truncatedText);
      setRemainingDescChar(0);
    } else {
      setDescription(inputText);
      setRemainingDescChar(MAX_DESC_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
          category: isLostItem ? category : "",
          propertyType: isLostItem
            ? propertyType == "Other"
              ? description
              : propertyType
            : "",
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post created successfully", "success");
      onPostCreated(data); // Call the callback function with the new post data
      onClose();
      setPostText("");
      setImgUrl("");
      setCategory("");
      setPropertyType("");
      setDescription("");
      setIsLostItem(false);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        size={{ base: "sm", sm: "md" }}
      >
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here.."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remainingChar}/{MAX_CHAR}
              </Text>

              <Flex alignItems="center" mb={4}>
                <Text mr={2}>Is this a lost item post?</Text>
                <Switch
                  isChecked={isLostItem}
                  onChange={(e) => setIsLostItem(e.target.checked)}
                />
              </Flex>

              {isLostItem && (
                <>
                  <Select
                    placeholder="Select category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    mb={4}
                  >
                    <option value="Lost">Lost</option>
                    <option value="Stolen">Stolen</option>
                  </Select>

                  <Select
                    placeholder="Select property type"
                    onChange={(e) => setPropertyType(e.target.value)}
                    value={propertyType}
                    mb={4}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Documents">Documents</option>
                    <option value="Person">Person</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Pet">Pet</option>
                    <option value="Other">Other</option>
                  </Select>

                  {propertyType === "Other" && (
                    <FormControl>
                      <Input
                        placeholder="Specify other property type"
                        onChange={handleDescriptionChange}
                        value={description}
                        mb={4}
                      />
                      <Text
                        fontSize="xs"
                        fontWeight="bold"
                        textAlign={"right"}
                        m={"1"}
                        color={"gray.800"}
                      >
                        {remainingDescChar}/{MAX_DESC_CHAR}
                      </Text>
                    </FormControl>
                  )}
                </>
              )}

              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={24}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>

            {imgUrl && (
              <Flex mt={5} w={"full"} position={""}>
                <Image src={imgUrl} alt="Selected img" />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
