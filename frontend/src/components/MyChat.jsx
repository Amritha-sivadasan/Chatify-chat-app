import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvide";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getImage, getSender } from "../config/chatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import image from "../images/bg.jpg";
import { motion } from "framer-motion";

export default function MyChat({ fetchAgain, setFetchAgain }) {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );
  const { user, setSelectChat, selectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setLoggedUser(userInfo);
    }
    fetchChat();
  }, [fetchAgain]);

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "plase Enter something in search",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

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
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        textColor={"black"}
      >
        <motion.div
          animate={{
            x: [-10, 10, -10],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          style={{
            background: "-webkit-linear-gradient(135deg, #38B2AC, #3182CE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Arial, sans-serif",
            color: "#FFFFFF",
          }}
        >
          <Text fontFamily="Alegreya, serif">MY Chats</Text>
        </motion.div>
        <GroupChatModal>
          <Button
            display="flex"
            alignItems="center"
            fontSize={{ base: "13px", md: "14px", lg: "15px" }} // Adjusted font sizes
            colorScheme="teal" // Changed color scheme to teal for a more attractive appearance
            _hover={{ color: "white", bg: "teal.500" }} // Hover effect with color change
            rightIcon={<AddIcon />}
          >
            New Group chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        p={3}
        backgroundImage={`url(${image})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat
                    ? "linear-gradient(135deg, #38B2AC, #3182CE)"
                    : "white"
                }
                color={selectedChat === chat ? "white" : "black"}
                px={4}
                py={3}
                borderRadius="lg"
                key={chat._id}
                boxShadow="md"
                transition="all 0.3s ease-in-out"
                transform={selectedChat === chat ? "scale(1.05)" : "scale(1)"}
                _hover={{
                  bg:
                    selectedChat === chat
                      ? "linear-gradient(135deg, #319795, #2B6CB0)"
                      : "linear-gradient(135deg, #7FB3D5, #478CCF)",
                  transform: "scale(0.95)",
                  color: "white",
                }}
              >
                <Box display="flex" alignItems="center">
                  <img
                    src={getImage(loggedUser, chat.users)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <Text fontSize="lg" fontFamily="Inter, sans-serif">
                    {getSender(loggedUser, chat.users)}
                  </Text>
                </Box>
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
