import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const AdminDashboardPage = () => {
  return (
    <Flex
      minH={"100vh"}
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
        <Text>
          Welcome to the admin dashboard. Here you can manage users, review
          reports, and view analytics.
        </Text>
        {/* Add more components and functionalities as needed */}
      </Box>
    </Flex>
  );
};

export default AdminDashboardPage;
