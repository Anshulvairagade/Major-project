import { IconButton } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../../../components/Context/ChatProvider'
import ProfileModal from '../ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import './SingleChat.css';
import ScrollableChat from './ScrollableChat';
import { getSender, getSenderFull } from '../Config/ChatLogic';
import { io, Socket } from 'socket.io-client';
import animationdata from '../../../Animation/typing.json';
import Lottie from "lottie-react";
import { Avatar } from '@chakra-ui/avatar';




const ENDPOINT = "http://localhost:9000";
let socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user, selectedChat, setSelectedChat} = ChatState();
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, settyping] = useState(false);
    const [isTyping, setisTyping] = useState(false);
    const [callTranslate, setCallTranslate] = useState(false);


   

    const toast = useToast();
    const childRef = useRef();
   

    const fetchMessages = async() =>{
           if(!selectedChat)return;
            
           try {
            const config = {
                headers: {
                  Authorization:`Bearer ${user.token}`,
              },
            }
            setLoading(true);
            const {data} = await axios.get(`/api/message/${selectedChat._id}`,config);
            setMessage(data);
            setLoading(false);
            socket.emit(`join chat`,selectedChat._id)
           } catch (error) {
            toast({
                title:"Error Occured",
                description:"Failed to load the messages!!",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
           }
    }

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup",user);
        socket.on('connected',() =>{
            setSocketConnected(true);
        });
        socket.on("typing",()=>{
            setisTyping(true);
        });
        socket.on("stop typing",()=>{
            setisTyping(false);
        });
    }, [])

    useEffect(() => {
       fetchMessages();
       selectedChatCompare = selectedChat;
       axios.get('https://libretranslate.com/languages',
       {
           headers: { 'accept': 'application/json' }
       }).then(res => {
           setOptions(res.data)
           console.log(res.data);
       });
       
    }, [selectedChat]);


    useEffect(() => {
       socket.on("message recieved",(newMessageRecieved)=>{
           if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id ){

           }else {
               setMessage([...message , newMessageRecieved])
           }
       })  
    })

 



    const sendMessage = async(event) =>{
           if(event.key == "Enter" && newMessage){
               socket.emit("stop typing",selectedChat._id);
                  try {
                      const config = {
                          headers: {
                            "Content-Type":"application/json",
                            Authorization:`Bearer ${user.token}`,
                        },
                      }

                      setNewMessage("");
                      const {data} = await axios.post('/api/message',{
                          content:newMessage,
                          chatId:selectedChat._id
                      },config);
                      console.log(data);
                      socket.emit('new message',data)
                      setMessage([...message,data])
                  } catch (error) {
                    toast({
                        title:"Error Occured",
                        description:"Failed to send the messages!!",
                        status:"warning",
                        duration:5000,
                        isClosable:true,
                        position:"bottom"
                    });
                  }
           }
    }

    const typingHandler = (e) =>{
            setNewMessage(e.target.value);
            if(!socketConnected)  return;

            if(!typing){
                settyping(true);
                socket.emit("typing",selectedChat._id);
            }

            let lastTypingTime = new Date().getTime();
            var timerLength = 3000;
            setTimeout(()=>{
                    var timeNow = new Date().getTime();
                    var timeDiff = timeNow - lastTypingTime;
                    if(timeDiff >= timerLength && typing){
                        socket.emit("stop typing",selectedChat._id);
                        settyping(false);
                  }
            },timerLength);
  
    }

    const translateText = () =>{
        // if(!callTranslate){
        //     setFrom('en');
        //     setTo('en');
        // }
        setCallTranslate(!callTranslate);
    }


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
                         <div className="selection"  >
                             <div className="firstSelection">
                                   <p>From : &nbsp;</p>
                                   <select className="select" onChange={(e) => setFrom(e.target.value)}>
                                    {options.map(function (a) {
                                        return (
                                            <option key={a.code} value={a.code}>{ a.name}</option>
                                        );
                                    })}
                                  </select>
                             </div>
                             <div className="secondSelection">
                                 <p>To : &nbsp;</p>
                                   <select className="select" onChange={(e) => setTo(e.target.value)}>
                                    {options.map(function (a) {
                                        return (
                                            <option key={a.code} value={a.code}>{a.name}</option>
                                        );
                                    })}
                                  </select>
                             </div>
                             <button className="translate" onClick={() => childRef.current.traslateText()}>Translate </button>
                         </div>
                         <ProfileModal user={getSenderFull(user,selectedChat.users)} />
                     </>) : (
                         <>{selectedChat.chatName.toUpperCase()}
                            <UpdateGroupChatModal
                             fetchAgain={fetchAgain} 
                             setFetchAgain={setFetchAgain}
                             fetchMessages={fetchMessages}
                             ></UpdateGroupChatModal> 
                         </>
                     )}

                  </Text>
                  <Box
                    d="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                  >
                      { loading ? (
                          <Spinner
                           size="xl"
                           w={20}
                           h={20}
                           alignSelf="center"
                           margin="auto"
                          />
                      ) : (
                          <div className="messages" style={{marginBottom:"20px"}}> 
                               <ScrollableChat
                                messages={message} 
                                input={from}
                                output={to}
                                ref={childRef}
                                />
                          </div>
                      )}
                      <FormControl onKeyDown={sendMessage} isRequired bottom={0} >
                          {isTyping? <div style={{ display:"flex", marginTop:'15px' ,marginBottom:"15px" ,alignItems:"center"}}>
                          <Avatar
                           mt="7px"
                           mr={1}
                           size="sm"
                           cursor="pointer"
                           src={selectedChat.users[0].pic == user.pic ? selectedChat.users[1].pic : selectedChat.users[0].pic}
                        />
                            <i>Typing</i>  <Lottie
                                 animationData={animationdata}
                                style={{ marginLeft:"0px", width:"100px"}}
                              >
                              </Lottie>
                          </div>: <> </>}
                          <Input
                             variant="filled"
                             bg="#E0E0E0"
                             placeholder="Enter a message"
                             onChange={typingHandler}
                             value={newMessage}
                          />
                      </FormControl>
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
