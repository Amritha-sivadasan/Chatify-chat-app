import { Box, CloseButton } from "@chakra-ui/react";
import React from "react";

export default function UserBadgeItem({ user, handleFunction }) {
  return (
    <Box
      borderRadius="lg"
      m={1}
      mb={2}
      fontSize={12}
      bg="purple.200"
      cursor="pointer"
      onClick={handleFunction}
      display="flex"
      justifyContent="space-between"
      padding={2}
      // bg="gray.100" // Optional
    >
      <span>{user.name}</span>
      <CloseButton size="sm" pl={2} />{" "}
    </Box>
  );
}
