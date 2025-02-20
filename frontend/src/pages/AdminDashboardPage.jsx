import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <Flex
      h={"93.3vh"}
      w={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      p={8}
    >
      <Box
        w={"full"}
        maxW={"1200px"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        rounded={"lg"}
        p={8}
      >
        <Heading fontSize={"2xl"} mb={4}>
          Admin Dashboard
        </Heading>
        <Text mb={4}>
          Welcome to the admin dashboard. Here you can manage users, review
          reports, and view analytics.
        </Text>
        <Button onClick={() => navigate("/admin/users")} mb={2}>
          Manage Users
        </Button>
        <Button onClick={() => navigate("/admin/reported-posts")} mb={2}>
          Review Reported Posts
        </Button>
        <Button onClick={() => navigate("/admin/reported-users")} mb={2}>
          Review Reported Users
        </Button>
        <Button onClick={() => navigate("/admin/posts")} mb={2}>
          View All Posts
        </Button>
        <Button onClick={() => navigate("/admin/analytics")} mb={2}>
          View Analytics Dashboard
        </Button>
      </Box>
    </Flex>
  );
};

export default AdminDashboardPage;
