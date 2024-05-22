import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import React from "react";

export default function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          aria-label="View Profile"
          _hover={{ border: "none" }}
        />
      )}
      <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h={'410px'}>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={'center'} justifyContent={'space-between'}>
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={user.picture}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily={"-moz-initial"}
            >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
