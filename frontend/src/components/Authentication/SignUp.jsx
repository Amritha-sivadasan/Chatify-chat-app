import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();
  const Navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        description: "Image is mandatory",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (pics.type == "image/jpeg" || pics.type == "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dz5gtfv9a");
      axios
        .post(`https://api.cloudinary.com/v1_1/dz5gtfv9a/image/upload`, data)
        .then((res) => {
          console.log(res.data);
          setPicture(res.data.url.toString());
          setLoading(false);
          setSelectedImage(pics);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        description: "Image is mandatory",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill the all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password Do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .post("/api/user", { name, email, password, picture }, config)
        .then((res) => {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          setLoading(false);
          Navigate("/chat");
        });
    } catch (error) {
      toast({
        title: "Error",
        description: error.res.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="picture" isRequired>
        <FormLabel>Upload Image</FormLabel>
        <Flex align="center">
          <Image
            mt={2}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAZlBMVEX///8AAAC6urq2trYHBwf6+vqioqJWVlZPT0/r6+vo6Ojy8vL39/dCQkLl5eXv7+/Jycmurq5bW1uUlJR/f38gICA0NDRgYGAUFBScnJyFhYVISEg6OjrDw8NwcHBra2vZ2dkpKSm+K3BfAAADOUlEQVR4nO2b6cKqIBBA1dK+XLHcrS99/5e85VK5RAwN2r13zt8CjoDI4KhpBEEQBEEQBEEQBEH8pdjM2CBjMPsToyD34myrI7PNYi8PJJUcC1vn2cxypLrpoNDpykGis/yTWiddP4GnVrBT7XTtK+gIHtU76foR5mR3xRLLBV6NAE6edNXDplXUFkp9fKUbfncTFZBCbtmUqWVXk7cEcdNAaQLKnNsyZ1VOmmY0DcQMUCRsimwh1wHEbccvBBSx4J0LxPSaJixAkVZqp1Lqh6TEIClRSEqU/0bKND8URpdyWRj9RiH7ZFeDLcXSrPk5SyGPU6VS5vOeNP8SqeE+WdoKVeqsD5EdQUypSTCYSsWUuFJMHyPZVZhS+UQKUq0aKTOdSF3kVlFMqWncfFhf6ht7aiaal1ypMKXGy5RIbGj6VTWJajGl7J+R027PrchlUXmq6zrxdvngCAB1Rd+MpAxeNdVwtD3jcQW4z75o0E7EqcQt6vFY7+7XgCvlPlsVnC0V8ybz73YVrgqp6wj2rZW8sQvnlK5cHCVSmm9EXuIVZ97h1XjuPUjVSAlXMM9+JSnuCfxKUvy3AqtImW9OlleRenfavYbUdB+4lJRj+/5+NgKLeD4qpZh18eq6jMJq/ItbvHVSI+WncV9/Ugz/IuKkRGp4vyfP0Yx7EXDqpNo9LPzIWiBC1vX4sctz3s+nu1T7bIwrFKnp/X63cn6FnDqpZqRBrzReBg5zc2a7aVsRfZPa7/SCCqL0WurFPDYA/fSQgjIv9fLeyvKgEn/jjCrlCvfFclICa/XiUgFSP2FKOULr4rJS4vfWclI+ZjYHklQwDtYxpHzrGII2bEOp/fQA6HMp//ZCnxdg86Wq2VD3U6l2IeYeRXCkTGQnlP2UzWuApEiKpEiKpEjqH5TSsKU0DCnkPNQcRcq0El4jMJJutykt9WWJgl1KpYIU3R6JlMou+RSyWQUikXyqPE3XlkjT7c98Dt+U0PxI/c4l00Z4yKZ+L5MkD31T7yj+7OIG+HMCzf7CDy8W+ERFahV0rEydUhbK3kGOVcbZFp0sLuW+L+oJ2NlA5syUrckEQRAEQRAEQRAEQajmD7O2OEfBd151AAAAAElFTkSuQmCC"
            }
            alt="Uploaded Image"
            boxSize="200px"
            objectFit="cover"
            borderRadius="md"
            cursor="pointer" // Added cursor pointer to indicate it's clickable
            onClick={() => document.getElementById("uploadInput").click()} // Click event to trigger file input click
          />
          <Input
            id="uploadInput" // Added id for the file input
            type="file"
            p={1.5}
            accept="image/*"
            style={{ display: "none" }} // Hide the file input visually
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Flex>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}
