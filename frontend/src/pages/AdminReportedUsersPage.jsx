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

const AdminReportedUsersPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("/api/admin/reported-users");
      const data = await res.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  const handleBanUser = async (userId) => {
    await fetch(`/api/admin/ban-user/${userId}`, {
      method: "PUT",
    });
    setReports(
      reports.map((report) =>
        report.reportedUser._id === userId
          ? {
              ...report,
              reportedUser: { ...report.reportedUser, isBanned: true },
            }
          : report
      )
    );
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
          Review Reported Users
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
                    onClick={() => handleBanUser(report.reportedUser._id)}
                    disabled={report.reportedUser.isBanned}
                  >
                    {report.reportedUser.isBanned ? "Banned" : "Ban"}
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

export default AdminReportedUsersPage;
