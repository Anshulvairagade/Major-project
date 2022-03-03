import { IconButton } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import React from 'react'
import { ChatState } from '../../../components/Context/ChatProvider'
import { getSender,getSenderFull } from '../Config/ChatLogic';
import ProfileModal from '../ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const {user, selectedChat, setSelectedChat} = ChatState();

    return (
        <>
           {
               selectedChat ? ( <>
                  <Text
                    fontSize={{base:"28px",md:"30px"}}
                    pb={3}
                    px={2}
                    w="100%"
                    fontFamily="Roboto"
                    d="flex"
                    justifyContent={{base:"space-between"}}
                    alignItems="center"
                  >
                      <IconButton
                          d={{base:"flex",md:"none"}}
                          icon={<ArrowBackIcon></ArrowBackIcon>}
                          onClick={()=> setSelectedChat("")}
                      ></IconButton>

                     {!selectedChat.isGroupChat ? (<>
                         {getSender(user,selectedChat.users)}
                         <ProfileModal user={getSenderFull(user,selectedChat.users)} />
                     </>) : (
                         <>{selectedChat.chatName.toUpperCase()}
                            <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}></UpdateGroupChatModal> 
                         </>
                     )}

                  </Text>
                  <Box
                    d="flex"
                    flexDir="column"
                    justifyContent="center"
                    p={3}
                    bg="E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                  >
                  </Box>
                </> ) : (
                   <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                       <Text fontSize="3xl" pb={3} fontFamily="Roboto">
                             Click on user to start chatting
                       </Text>
                   </Box>
               )
           } 
        </>
    )
}

export default SingleChat
