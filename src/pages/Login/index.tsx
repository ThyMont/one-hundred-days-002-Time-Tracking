import { Layout } from "@/components/Layout";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

export function Login() {
  const { loginWithUsername, isAuthenticated, isReady } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  if (!isReady) {
    return (
      <Layout>
        <Box maxW="md" mx="auto">
          <Spinner size="xl" />
        </Box>
      </Layout>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/timesheet" replace />;
  }

  function handleContinue() {
    const trimmed = username.trim();
    if (!trimmed) return;

    loginWithUsername(trimmed);

    toaster.success({
      title: `Welcome, ${trimmed}`,
      type: "success",
      duration: 3000,
    });

    navigate("/timesheet");
  }

  return (
    <Layout>
      <Box maxW="md" mx="auto">
        <Text fontSize="2xl" fontWeight="bold">
          Login
        </Text>

        <Text mt="1" color="fg.muted">
          Enter your username to continue.
        </Text>

        <Flex mt="6" gap="2">
          <Input
            placeholder="Username"
            value={username}
            maxLength={15}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          />
          <Button onClick={handleContinue}>Continue</Button>
        </Flex>
      </Box>
    </Layout>
  );
}
