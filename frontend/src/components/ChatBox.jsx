import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvide";
import SingleChat from "./SingleChat";
import image from "../images/sky.jpg";

export default function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems={"center"}
      flexDir={"column"}
      p={3}
      w={{ base: "100%", md: "68%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
      bg={"white"}
      backgroundImage={`url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQicJ_-q9bHjdZlnCJclsmGRYOve38XT7cISg&s')`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}
