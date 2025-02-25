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
  Input, // Import Input component
} from "@chakra-ui/react";

const AdminUsersPage = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const [filteredUsers, setFilteredUsers] = useState([]); // Add state for filtered users

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data); // Initialize filtered users with all users
    };
    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

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

    setFilteredUsers(
      filteredUsers.map((user) =>
        user._id === userId ? { ...user, isBanned: !isBanned } : user
      )
    );

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
        <Input
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleSearchChange}
          mb={4}
        />
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
            {filteredUsers.map((user) => (
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
