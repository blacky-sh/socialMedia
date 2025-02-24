import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function SignupCard() {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (password === inputs.email) {
      return "Password cannot be similar to email.";
    }
    if (password === inputs.username) {
      return "Password cannot be similar to username.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setInputs({ ...inputs, password });
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setInputs({ ...inputs, confirmPassword });
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const res = await fetch(`/api/users/profile/${username}`);
      const data = await res.json();
      if (data._id) {
        setUsernameError("Username is already taken.");
      } else {
        setUsernameError("");
      }
    } catch (error) {
      setUsernameError("Error checking username availability.");
    }
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setInputs({ ...inputs, username });

    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
    } else {
      setUsernameError("");
      checkUsernameAvailability(username);
    }
  };

  const handleSignup = async () => {
    if (passwordError || usernameError) {
      showToast("Error", passwordError || usernameError, "error");
      return;
    }
    if (inputs.password !== inputs.confirmPassword) {
      showToast("Error", "Passwords do not match", "error");
      return;
    }
    if (!agreeToTerms) {
      showToast("Error", "You must agree to the terms and policies", "error");
      return;
    }
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={handleUsernameChange}
                    value={inputs.username}
                  />
                  {usernameError && (
                    <Text color="red.500" fontSize="sm" position={"absolute"}>
                      {usernameError}
                    </Text>
                  )}
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={"password"}
                  onChange={handlePasswordChange}
                  value={inputs.password}
                />
              </InputGroup>
              {passwordError && (
                <Text color="red.500" fontSize="sm">
                  {passwordError}
                </Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={"password"}
                  onChange={handleConfirmPasswordChange}
                  value={inputs.confirmPassword}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Checkbox
                isChecked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              >
                I agree to the{" "}
                <a
                  href="/privacy-security"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  Privacy and Security
                </a>
              </Checkbox>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
