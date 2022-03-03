import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/layout';
import { Stack } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../components/Context/ChatProvider';
import Loader from './../../components/Loader/Loader'
import { getSender } from './Config/ChatLogic';
import GroupChatModal from './GroupChatModal';

const Chatlist = ({fetchAgain}) => {
 
    const [loggedUser, setLoggedUser] = useState()
    const {user,selectedChat, setSelectedChat,chats, setChats} = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
         try {

            const config ={
                headers: {
                    Authorization:`Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get('/api/chat',config);
                console.log(data);
            
                setChats(data);
             
         } catch (error) {
            toast({
                title:"Error Occured",
                description: "Failed to load the chats",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            });
         }
    }


    useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    },[fetchAgain])

    return (
       <Box
         d={{base: selectedChat ? "none" : "flex" , md:"flex"}}
         flexDir="column"
         alignItems="center"
         p={3}
         bg="white"
         w={{base:"100%", md:"31%"}}
         borderRadius="lg"
         borderWidth="1px"
       >
           <Box
              pb={3}
              px={3}
              fontSize={{base:"20px", md:"30px"}}
              d="flex"
              w="100%"
              justifyContent="space-between"
              alignItems="center"
           > My Chat
           <GroupChatModal>
              <Button
                 d="flex"
                 fontSize={{base:"17px",md:"10px",lg:"17px"}}
                 rightIcon={<AddIcon />}
              >New Group Chat</Button>
              </GroupChatModal>
           </Box>
           <Box
             d="flex"
             flexDir="column"
             p={3}
             bg="#f8f8f8"
             w="100%"
             h="100%"
             borderRadius="lg"
             overflowY="hidden"
           >
               {chats ? (
                   <Stack overflowY="scroll">
                     {chats.map((chat)=>(
                          <Box
                            onClick={(()=>setSelectedChat(chat))}
                            cursor="pointer"
                            bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                            color={selectedChat === chat ? "white" : "black"}
                            px={3}
                            py={2}
                            borderRadius="lg"
                            key={chat._id}
                          >  
                          <Text>
                              {!chat.isGroupChat ? (
                                  getSender(loggedUser,chat.users)
                              ) : (chat.chatName)}
                          </Text>
                          </Box>
                     ))}
                   </Stack>
               ) : (
                   <Loader />
                   )}
           </Box>
       </Box>
    )
}

export default Chatlist
