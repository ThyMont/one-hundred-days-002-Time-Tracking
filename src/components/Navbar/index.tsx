import { Box, Flex, Button, Text, Menu, Portal } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box as="header" bg="gray.800" color="white" px={6} py={4}>
      <Flex align="center" justify="space-between">
        <Text fontWeight="bold" fontSize="lg">
          TimeTracker
        </Text>

        {user ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="ghost" color="white">
                {user.name}
              </Button>
            </Menu.Trigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="timesheet">Timesheet</Menu.Item>
                  <Menu.Item value="reports">Reports</Menu.Item>
                  <Menu.Item value="logout" onClick={logout}>
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <Button colorScheme="blue">Login / Sign Up</Button>
        )}
      </Flex>
    </Box>
  );
}
