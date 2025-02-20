import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const AdminAnalyticsPage = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    postCount: 0,
    reportCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/admin/dashboard-stats");
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <Flex
      w={"full"}
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
          Analytics Dashboard
        </Heading>
        <Text mb={4}>Total Users: {stats.userCount}</Text>
        <Text mb={4}>Total Posts: {stats.postCount}</Text>
        <Text mb={4}>Total Reports: {stats.reportCount}</Text>
      </Box>
    </Flex>
  );
};

export default AdminAnalyticsPage;
