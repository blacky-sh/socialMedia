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
  useColorModeValue,
} from "@chakra-ui/react";

const AdminPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

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
          View All Posts
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Content</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post._id}>
                <Td>{post.postedBy.username}</Td>
                <Td>{post.content}</Td>
                <Td>{new Date(post.createdAt).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default AdminPostsPage;
