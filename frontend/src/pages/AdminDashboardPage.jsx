import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "black.100")}
      p={8}
    >
      <Box
        w={"full"}
        maxW={"1200px"}
        bg={useColorModeValue("white", "gray.dark")}
        boxShadow={"lg"}
        rounded={"lg"}
        p={8}
      >
        <Heading fontSize={"2xl"} mb={4}>
          Admin Dashboard
        </Heading>
        <Text>
          Welcome to the admin dashboard. Here you can manage users, review
          reports, and view analytics.
        </Text>
        <Flex flexDirection={"column"} mt={4}>
          <Button onClick={() => navigate("/admin/users")} mb={2}>
            Manage Users
          </Button>
          <Button onClick={() => navigate("/admin/reported-posts")} mb={2}>
            Review Reported Posts
          </Button>
          <Button onClick={() => navigate("/admin/reported-users")} mb={2}>
            Review Reported Users
          </Button>
          {/* <Button onClick={() => navigate("/admin/posts")} mb={2}>
            View All Posts
          </Button> */}
          <Button onClick={() => navigate("/admin/analytics")} mb={2}>
            View Analytics Dashboard
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AdminDashboardPage;
