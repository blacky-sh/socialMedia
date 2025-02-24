import { useEffect, useState, useRef } from "react";
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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Divider,
} from "@chakra-ui/react";

const AdminReportedUsersPage = () => {
  const toast = useToast();
  const [reports, setReports] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPostsModalOpen, setIsPostsModalOpen] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [banType, setBanType] = useState("temporary");
  const [banDuration, setBanDuration] = useState(24);
  const cancelRef = useRef();

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("/api/admin/reported-users");
      const data = await res.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleRemoveReport = async (userId) => {
    setAction(() => async () => {
      try {
        await fetch(`/api/reports/mark-safe-user/${userId}`, {
          method: "PUT",
        });

        setReports(
          reports.filter((report) => report.reportedUser._id !== userId)
        );
        toast({
          title: "Report removed.",
          description: "The report has been successfully removed.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to remove the report.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
    setIsAlertOpen(true);
  };

  const handleBanUser = async (userId) => {
    setAction(() => async () => {
      try {
        const banExpires =
          banType === "temporary"
            ? new Date(Date.now() + banDuration * 60 * 60 * 1000)
            : null;
        await fetch(`/api/reports/mark-safe-user/${userId}`, {
          method: "PUT",
        });

        await fetch(`/api/users/ban/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ banExpires }),
        });

        setReports(
          reports.filter((report) => report.reportedUser._id !== userId)
        );
        toast({
          title: "User banned.",
          description: `The user has been banned ${
            banType === "temporary" ? `for ${banDuration} hours` : "permanently"
          }.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to ban the user.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
    setIsAlertOpen(true);
  };

  const handleViewUserPosts = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}/posts`);
      const data = await res.json();
      setUserPosts(data);
      setIsPostsModalOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user posts.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleConfirmAction = async () => {
    if (action) {
      await action();
    }
    setIsAlertOpen(false);
  };

  return (
    <Flex
      w={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "black.100")}
      p={8}
    >
      <Box
        w={"full"}
        maxW={"100%"}
        bg={useColorModeValue("white", "gray.dark")}
        boxShadow={"lg"}
        rounded={"lg"}
        p={8}
      >
        <Heading fontSize={"2xl"} mb={4}>
          Manage Reported Users
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Reported By</Th>
              <Th>Username</Th>
              <Th>Reason</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports.map((report) => (
              <Tr key={report._id}>
                <Td>{report.reportedBy.username}</Td>
                <Td>{report.reportedUser.username}</Td>
                <Td>{report.reason}</Td>
                <Td>{report.reportedUser.isBanned ? "Banned" : "Active"}</Td>
                <Td>
                  <Button
                    bg={useColorModeValue("yellow.500", "yellow.700")}
                    onClick={() => handleViewUser(report.reportedUser)}
                  >
                    View User
                  </Button>
                  <Button
                    bg={useColorModeValue("green.500", "green.700")}
                    color={"white"}
                    ml={2}
                    onClick={() => handleRemoveReport(report.reportedUser._id)}
                  >
                    Mark as Safe
                  </Button>
                  <Button
                    bg={useColorModeValue("red.500", "red.700")}
                    color={"white"}
                    ml={2}
                    onClick={() => handleBanUser(report.reportedUser._id)}
                  >
                    Ban User
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedUser && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex mb={4}>
                <Avatar src={selectedUser.profilePic} size={"xl"} />
                <Flex flexDirection={"column"} ml={4}>
                  <Text>Name: {selectedUser.name}</Text>
                  <Text>Username: {selectedUser.username}</Text>
                  <Text>Email: {selectedUser.email}</Text>
                  <Text>
                    Status: {selectedUser.isBanned ? "Banned" : "Active"}
                  </Text>
                </Flex>
              </Flex>
              {/* Add more user details as needed */}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => handleBanUser(selectedUser._id)}
              >
                Ban User
              </Button>
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => handleRemoveReport(selectedUser._id)}
              >
                Mark as Safe
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => handleViewUserPosts(selectedUser._id)}
              >
                View User Posts
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Action
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to proceed with this action?
              {action === handleBanUser && (
                <>
                  <RadioGroup onChange={setBanType} value={banType} mt={4}>
                    <Stack direction="row">
                      <Radio value="temporary">Temporary</Radio>
                      <Radio value="permanent">Permanent</Radio>
                    </Stack>
                  </RadioGroup>
                  {banType === "temporary" && (
                    <Input
                      mt={4}
                      type="number"
                      value={banDuration}
                      onChange={(e) => setBanDuration(e.target.value)}
                      placeholder="Ban duration in hours"
                    />
                  )}
                </>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmAction} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        isOpen={isPostsModalOpen}
        onClose={() => setIsPostsModalOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Posts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box maxH="700px" overflowY="scroll" mb={4}>
              {userPosts.map((post) => {
                return (
                  <Box key={post._id} mb={4}>
                    <Text>
                      <strong>Post ID:</strong> {post._id}
                    </Text>
                    <Divider my={2} />
                    <Text>
                      <strong>Content:</strong> {post.content}
                    </Text>
                    <Text>{post.text}</Text>
                    {post.img && <img src={post.img} alt="Post" />}
                    <Text></Text>
                    <Divider my={4} />
                    <Text float={"right"} mr={4}></Text>
                  </Box>
                );
              })}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AdminReportedUsersPage;
