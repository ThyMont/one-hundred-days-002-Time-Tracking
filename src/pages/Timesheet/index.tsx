import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { createId } from "@/lib/id";
import { getEntries, saveEntries } from "@/lib/storage";
import type { TimeEntryType } from "@/types";

export function Timesheet() {
  const { user } = useAuth();

  function addEntry(type: TimeEntryType) {
    if (!user) return;

    const entries = getEntries();
    const next = [
      ...entries,
      {
        id: createId("entry"),
        userId: user.id,
        type,
        timestamp: new Date().toISOString(),
      },
    ];

    saveEntries(next);
  }

  return (
    <Layout>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Timesheet
        </Text>

        {!user ? (
          <Text mt="4">You must be logged in.</Text>
        ) : (
          <>
            <Flex mt="4" gap="2">
              <Button onClick={() => addEntry("clock_in")}>Clock In</Button>
              <Button onClick={() => addEntry("clock_out")}>Clock Out</Button>
            </Flex>

            <Text mt="4" color="fg.muted">
              Entries are saved locally and linked to your username.
            </Text>
          </>
        )}
      </Box>
    </Layout>
  );
}
