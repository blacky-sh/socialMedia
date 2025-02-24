import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";

const AdminReportedPostsPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  function formatDate(isoDateString, options = {}) {
    const date = new Date(isoDateString);

    if (isNaN(date)) {
      return "Invalid Date"; // Handle invalid input
    }

    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: undefined, // Optionally include seconds
      timeZoneName: undefined, // Optionally include time zone name
      hour12: true, // Use 12-hour format
    };

    const mergedOptions = { ...defaultOptions, ...options }; //merge default options with user provided options.

    return date.toLocaleString(undefined, mergedOptions);
  }

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("/api/admin/reported-posts");
      const data = await res.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  const handleViewPost = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    await fetch(`/api/reports/mark-safe/${selectedPost._id}`, {
      method: "PUT",
    });

    await fetch(`/api/admin/posts/${selectedPost._id}`, {
      method: "DELETE",
    });
    setReports(
      reports.filter((report) => report.reportedPost._id !== selectedPost._id)
    );
    toast({
      title: "Post deleted.",
      description: "The post has been successfully deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const handleRemoveReport = async () => {
    if (!selectedPost) return;

    await fetch(`/api/reports/mark-safe/${selectedPost._id}`, {
      method: "PUT",
    });

    setReports(
      reports.filter((report) => report.reportedPost._id !== selectedPost._id)
    );
    toast({
      title: "Report removed.",
      description: "The report has been successfully removed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Flex
      w={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.dark")}
      p={8}
    >
      <Box
        w={"full"}
        maxW={"1200px"}
        bg={useColorModeValue("gray.100", "gray.light")}
        boxShadow={"lg"}
        rounded={"lg"}
        p={8}
      >
        <Heading fontSize={"2xl"} mb={4}>
          Review Reported Posts
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Reported By</Th>
              <Th>Post Content</Th>
              <Th>Reason</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports.map((report) => (
              <Tr key={report._id}>
                <Td>{report.reportedBy.username}</Td>
                <Td>
                  <Button onClick={() => handleViewPost(report.reportedPost)}>
                    View Post
                  </Button>
                </Td>
                <Td>{report.reason}</Td>
                <Td>
                  <Button onClick={handleDeletePost}>Delete Post</Button>
                  <Button onClick={handleRemoveReport}>Remove Report</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedPost && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Post Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {reports.map((report) => (
                <Box key={report._id} mb={4}>
                  <Text>Reported by: @{report.reportedBy.username}</Text>
                  <Text>Reason: {report.reason}</Text>
                  <Text>
                    Reported at:{" "}
                    {formatDate(report.createdAt, {
                      weekday: "long",
                      second: "numeric",
                    })}
                  </Text>
                </Box>
              ))}
              <Divider />
              <Text mt={2}>
                <strong>Text: </strong>
                {selectedPost.text}
              </Text>
              {selectedPost.img && (
                <Box mt={4}>
                  <img src={selectedPost.img} alt="Post" />
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeletePost}>
                Delete Post
              </Button>
              <Button colorScheme="blue" onClick={handleRemoveReport}>
                Remove Report
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

export default AdminReportedPostsPage;
