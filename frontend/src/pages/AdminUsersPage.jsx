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
} from "@chakra-ui/react";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleBanUser = async (userId) => {
    await fetch(`/api/admin/ban-user/${userId}`, {
      method: "PUT",
    });
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, isBanned: true } : user
      )
    );
  };

  return (
    <Flex
      minH={"100vh"}
      w={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      p={8}
    >
      <Box
        w={"full"}
        maxW={"100%"}
        bg={useColorModeValue("white", "gray.700")}
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
                    onClick={() => handleBanUser(user._id)}
                    disabled={user.isBanned}
                  >
                    {user.isBanned ? "Banned" : "Ban"}
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
