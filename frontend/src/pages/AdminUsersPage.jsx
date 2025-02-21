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
  useToast,
} from "@chakra-ui/react";

const AdminUsersPage = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleBanUser = async (userId, isBanned) => {
    const method = isBanned ? "DELETE" : "PUT"; // Use DELETE to unban, PUT to ban
    await fetch(
      `/api/admin/${isBanned ? "unban-user" : "ban-user"}/${userId}`,
      {
        method: method,
      }
    );

    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, isBanned: !isBanned } : user
      )
    );

    // Show success toast
    toast({
      title: `User ${isBanned ? "Unbanned" : "Banned"}`,
      description: `User ${userId} has been ${
        isBanned ? "unbanned" : "banned"
      } successfully.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
          Manage Users
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.isBanned ? "Banned" : "Active"}</Td>
                <Td>
                  <Button
                    bg={useColorModeValue("gray.light", "gray.dark")}
                    onClick={() => handleBanUser(user._id, user.isBanned)}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default AdminUsersPage;
