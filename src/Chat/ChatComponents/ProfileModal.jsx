import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ViewIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React from 'react'

const ProfileModal = ({user, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
     console.log(user);
    return (
        <>
            {
          children ? (<span onClick={onOpen}> {children}</span>) :
             (
               <IconButton
                  d={{base:"flex"}} 
                  icon={<ViewIcon></ViewIcon>}
                  onClick={onOpen}>
               </IconButton>
           )}



            <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Oswald"
            d="flex"
            justifyContent="left"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
             d="flex"
             flexDir="column"
             alignItems="center"
             justifyContent="space-between"
          >
              <Image
                 borderRadius="full"
                 boxSize="150px"
                 src={user.pic}
                 alt=""
              />
              <Text
                  fontSize={{base:"28px", md:"30px"}}
                  fontFamily="Montserrat"  
              >{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
        </>
    )
}

export default ProfileModal
