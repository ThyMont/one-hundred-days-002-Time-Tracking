import { Box, Flex, Button, Text, Menu, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { toaster } from "@/components/ui/toaster";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    const name = user?.username ?? "user";

    toaster.info({
      title: `See you later, ${name}!`,
      type: "info",
      duration: 2500,
    });

    logout();
    navigate("/");
  }
  return (
    <Box as="header" bg="gray.800" color="white" px={6} py={4}>
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Text fontWeight="bold" fontSize="lg" cursor="pointer" onClick={() => navigate("/")}>
          TimeTracker
        </Text>

        {user ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="surface" colorScheme="blue">
                {user.username}
              </Button>
            </Menu.Trigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="timesheet" onClick={() => navigate("/timesheet")}>
                    Timesheet
                  </Menu.Item>

                  <Menu.Item value="history" onClick={() => navigate("/history")}>
                    History
                  </Menu.Item>

                  <Menu.Item value="logout" onClick={handleLogout}>
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <Button colorScheme="blue" onClick={() => navigate("/login")}>
            Login / Sign Up
          </Button>
        )}
      </Flex>
    </Box>
  );
}
