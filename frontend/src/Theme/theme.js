import { Flex, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {},
  fonts: {
    body: "Work Sans, sans-serif",
    heading: "Work Sans, sans-serif",
  },
  styles: {
    global: {
      '@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");':
        {},
      body: {
        backgroundImage:
          'url("https://img.freepik.com/free-vector/dialogue-chat-clouds-speech-bubble-icon-from-lines-triangles-particle-style-design-low-poly-technology-devices-people-communication-concept-blue-background_587448-472.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
  },
});

export default theme;
