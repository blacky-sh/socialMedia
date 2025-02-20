import {
  Box,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Heading size="md">Admin Panel</Heading>
        <Flex alignItems={"center"}>
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${
              colorMode === "light" ? "dark" : "light"
            } mode`}
            variant="ghost"
            color="current"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            mr={4}
          />
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            size={"sm"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
