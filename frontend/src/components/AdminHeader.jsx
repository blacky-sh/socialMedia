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
import { FiLogOut } from "react-icons/fi";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <Box
      bg={useColorModeValue("gray.100", "black.100")}
      px={4}
      my={2}
      borderRadius={8}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Heading
          size="md"
          cursor={"pointer"}
          onClick={() => navigate("/admin/dashboard")}
        >
          Admin Panel
        </Heading>
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
          />
          <Button size={"md"} variant={"ghost"} onClick={handleLogout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
