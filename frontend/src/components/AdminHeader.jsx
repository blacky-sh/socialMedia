import {
  Box,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("admin");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.dark")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Heading
          size="md"
          cursor={"pointer"}
          onClick={() => {
            navigate("/admin/dashboard");
          }}
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
            mr={2}
          />
          <Button size={"md"} onClick={handleLogout} variant="ghost">
            <FiLogOut size={20} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
