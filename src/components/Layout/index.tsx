import { Navbar } from "@/components/Navbar";
import { Box, Container, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Header */}
      <Navbar />

      {/* Main */}
      <Box as="main" flex="1" py="6">
        <Container maxW="6xl">{children}</Container>
      </Box>

      {/* Footer */}
      <Box as="footer" borderTopWidth="1px" py="4">
        <Container maxW="6xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap="2"
          >
            {/* Signature */}
            <Text fontSize="sm" color="fg.muted">
              © {new Date().getFullYear()} Thyago Monteiro — 100 Days of Code
            </Text>

            <Stack direction="row" gap="4">
              <Link
                href="https://github.com/ThyMont/one-hundred-days-001-todo-list"
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                alignItems="center"
                gap="1"
                color="fg.muted"
                _hover={{ color: "fg" }}
              >
                <Icon as={FaGithub} />
                <Text fontSize="sm">GitHub</Text>
              </Link>

              <Link
                href="https://www.linkedin.com/in/thyagomonteiro/"
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                alignItems="center"
                gap="1"
                color="fg.muted"
                _hover={{ color: "fg" }}
              >
                <Icon as={FaLinkedin} />
                <Text fontSize="sm">LinkedIn</Text>
              </Link>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
