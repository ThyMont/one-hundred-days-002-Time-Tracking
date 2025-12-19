import { Navbar } from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main" p={6}>
        {children}
      </Box>
    </Box>
  );
}
