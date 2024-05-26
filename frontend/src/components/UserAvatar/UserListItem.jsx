import React from "react";

import { Avatar, Box, Text } from "@chakra-ui/react";

export default function UserListItem({ user, handleFunction }) {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg="#e0d0e0"
      _hover={{ background: "res", color: "white" }}
      w={"100%"}
      display={"flex"}
      alignItems={"center"}
      color={"black"}
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor={"pointer"}
        name={user.name}
        src={user.picture}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"x-small"}>
          {" "}
          <b>Email</b> {user.email}
        </Text>
      </Box>
    </Box>
  );
}
