import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const ReportForm = ({ onClose, reportType, reportedId }) => {
  const [reason, setReason] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/reports/${reportType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason,
          [reportType === "user" ? "reportedUser" : "reportedPost"]: reportedId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      reportType === "user"
        ? toast({
            title: "Success",
            description: "User Report submitted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        : toast({
            title: "Success",
            description: "Post Report submitted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Reason</FormLabel>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter the reason for reporting"
          isRequired
        />
      </FormControl>
      <Button mt={4} mb={2} colorScheme="teal" type="submit">
        Submit Report
      </Button>
    </Box>
  );
};

export default ReportForm;
