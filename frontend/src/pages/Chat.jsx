import { Box, flexbox } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvide";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";

export default function Chat() {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        width="100%"
        p="10px"
        h="91.5vh"
        textColor="white"
      >
        {user && <MyChat />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}
