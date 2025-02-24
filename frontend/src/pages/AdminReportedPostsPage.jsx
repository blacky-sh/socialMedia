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

const AdminReportedPostsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("/api/admin/reported-posts");
      const data = await res.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  const handleDeletePost = async (postId) => {
    await fetch(`/api/admin/posts/${postId}`, {
      method: "DELETE",
    });
    setReports(reports.filter((report) => report.reportedPost._id !== postId));
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
            {reports != null &&
              reports?.map((report) => (
                <Tr key={report._id}>
                  <Td>{report.reportedBy.username}</Td>
                  <Td>
                    <Button>View Post</Button>
                  </Td>
                  <Td>{report.reason}</Td>
                  <Td>
                    <Button
                      onClick={() => handleDeletePost(report.reportedPost._id)}
                    >
                      Delete Post
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

export default AdminReportedPostsPage;
