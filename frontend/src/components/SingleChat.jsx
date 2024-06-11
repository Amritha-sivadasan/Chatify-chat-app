import { ChatState } from "../context/ChatProvide";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { getSender, getSenderFull } from "../config/chatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import ScrorableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../Animation/typing.json";

import { TypeAnimation } from "react-type-animation";

const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;

export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat, setSelectChat, notification, setNotification } =
    ChatState();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setNewMessage("");
  }, [selectedChat]);

  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error occur in fetching data",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        socket.emit("new message", data);

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error occur in sending messages",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };

  const handleSend = async () => {
    socket.emit("stop typing", selectedChat._id);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        "/api/message",
        { content: newMessage, chatId: selectedChat._id },
        config
      );
      socket.emit("new message", data);

      setMessages([...messages, data]);
    } catch (error) {
      toast({
        title: "Error occur in sending messages",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDifference = timeNow - lastTypingTime;
      if (timeDifference >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={["28px", "30px"]}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Roboto Slab, serif"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
            color={"white"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  fetchMessage={fetchMessage}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>

          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            padding={3}
            backgroundImage={`url("https://t3.ftcdn.net/jpg/03/27/51/56/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg")`}
            w={"100%"}
            height={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
            position="relative"
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf={"center"}
                margin={"auto"}
                color="black"
              />
            ) : (
              <div className="messages">
                <ScrorableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />{" "}
                </div>
              ) : (
                <></>
              )}
              <Box
                bg={"black"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Input
                  variant={"filled"}
                  placeholder="Eneter a message"
                  onChange={typingHandler}
                  value={newMessage}
                  backgroundColor={"#ffff"}
                />
                <Button
                  colorScheme="teal"
                  size="md"
                  onClick={handleSend}
                  backgroundColor="teal.500"
                  color="white"
                  _hover={{ backgroundColor: "teal.600" }}
                  _active={{ backgroundColor: "teal.700" }}
                  borderRadius="md"
                  px={4}
                >
                  Send
                </Button>
              </Box>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          {" "}
          <Text
            fontSize={"3xl"}
            pb={3}
            fontFamily={"Roboto Slab, serif"}
            color={"white"}
          >
            <TypeAnimation
              sequence={[
                "Every chat is a new adventure waiting to unfold.",
                1000,
                "In the garden of life, friends are the most beautiful flowers.",
                1000,
                "Friends are the laughter in our hearts and the warmth in our souls.",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
            />
            "Click To Start a chat"
          </Text>
        </Box>
      )}
    </>
  );
}
