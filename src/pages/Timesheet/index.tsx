import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { createId } from "@/lib/id";
import { getEntries, saveEntries } from "@/lib/storage";
import type { TimeEntryType } from "@/types";
import { useEffect, useMemo, useState } from "react";

export function Timesheet() {
  const { user } = useAuth();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const currentTime = useMemo(
    () =>
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [now]
  );

  function addEntry(type: TimeEntryType) {
    if (!user) return;

    const timestamp = new Date().toISOString();

    const entries = getEntries();
    saveEntries([
      ...entries,
      {
        id: createId("entry"),
        userId: user.id,
        type,
        timestamp,
      },
    ]);

    const label = type === "clock_in" ? "Clock In" : "Clock Out";
    const timeLabel = new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    toaster.success({
      title: `${label} registered`,
      description: `Time: ${timeLabel}`,
      type: "success",
      duration: 2500,
    });
  }

  return (
    <Layout>
      <Flex justify="center">
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">
            Timesheet
          </Text>

          {/* Clock */}
          <Text mt="4" fontSize="7xl" fontWeight="bold" lineHeight="1">
            {currentTime}
          </Text>
          <Text mt="1" color="fg.muted">
            Current time
          </Text>

          {!user ? (
            <Text mt="6">You must be logged in.</Text>
          ) : (
            <>
              <Flex mt="6" gap="3" justify="center">
                <Button size="lg" onClick={() => addEntry("clock_in")}>
                  Clock In
                </Button>
                <Button size="lg" onClick={() => addEntry("clock_out")}>
                  Clock Out
                </Button>
              </Flex>

              <Text mt="4" color="fg.muted" fontSize="sm">
                Entries are saved locally and linked to your username.
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </Layout>
  );
}
