import { Box, Text } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { getEntries } from "@/lib/storage";

export function History() {
  const { user } = useAuth();

  const entries = getEntries().filter((e) => e.userId === user?.id);

  return (
    <Layout>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          History
        </Text>

        {!user ? (
          <Text mt="4">You must be logged in.</Text>
        ) : entries.length === 0 ? (
          <Text mt="4" color="fg.muted">
            No entries yet.
          </Text>
        ) : (
          <Box mt="4">
            {entries.map((e) => (
              <Box key={e.id} borderWidth="1px" rounded="md" p="3" mb="2">
                <Text fontWeight="semibold">{e.type}</Text>
                <Text color="fg.muted" fontSize="sm">
                  {new Date(e.timestamp).toLocaleString()}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Layout>
  );
}
