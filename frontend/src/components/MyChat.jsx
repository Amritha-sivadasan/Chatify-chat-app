import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvide";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/chatLogics";

export default function MyChat() {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectChat, selectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "plase Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChat();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      width={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        paddingBottom={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"-moz-initial"}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        textColor={"black"}
      >
        MY Chats
        <Button
          display={"flex"}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          {" "}
          New Group chat
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => (
              <Box
                onClick={() => selectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat === chat ? "#38B2AC" : "E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat._id}
              >
                <Text>{!chat.isGroupChat?(getSender(loggedUser,chat.users)):(chat.chatName)}</Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}
