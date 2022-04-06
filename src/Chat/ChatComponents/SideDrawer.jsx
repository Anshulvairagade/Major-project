import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu';
import { Tooltip } from '@chakra-ui/tooltip';
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { Avatar } from '@chakra-ui/avatar';
import ProfileModal from './ProfileModal';
import { ChatState } from '../../components/Context/ChatProvider';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/modal';
import { Input } from '@chakra-ui/input';
import {  useToast } from '@chakra-ui/toast';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import  UserListItem  from '../../components/User Avatar/UserListItem'
import { Spinner } from '@chakra-ui/spinner';
import './SideDrawer.css'




const SideDrawer = () => {

    const {user, setSelectedChat,chats, setChats} = ChatState();
//   const user = JSON.parse(localStorage.getItem("userInfo"));


    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const {isOpen , onOpen, onClose} = useDisclosure();

    const history = useHistory();
    const toast = useToast();

   const logoutHandler = () =>{
       localStorage.removeItem("userInfo");
       history.push('/login')
   }


   const handleSearch = () =>{

         if(!search){
             toast({
                 title:"Please Enter Something in Search",
                 status:"warning",
                 duration:5000,
                 isClosable:true,
                 position:"top-left"
             });
             return;
         }

         try {
             setLoading(true);
             const config ={
                 headers: {
                     Authorization:`Bearer ${user.token}`,
                 },
             };


           axios.get(`/api/user?search=${search}`,config).then(data =>setSearchResult(data.data));
            setLoading(false);

         } catch (error) {
            setLoading(false);
            toast({
                title:"Error Occured",
                description:"Failed to load the search result!!",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            });
         }
   }


   const accessChat = async (userId) =>{
            try {
                 setChatLoading(true); 
                  const config ={
                    headers: {
                        "Content-type":"application/json",
                        Authorization:`Bearer ${user.token}`,
                    },
                };

                const { data } = await axios.post('/api/chat',{userId},config);

                if(!chats.find((c)=> c._id === data._id)) setChats([data, ...chats]);

               //  console.log(data);
                setSelectedChat(data);
                setChatLoading(false);
                onClose();
            } catch (error) {
                toast({
                    title:"Error Fetching the chat",
                    description: error.message,
                    status:"warning",
                    duration:5000,
                    isClosable:true,
                    position:"bottom-left"
                });
            }
   }

    return (
        <>
              <Box d="flex" justifyContent="space-between" alignItems="center" bg="#f5f7fb" w="100%" p="15px 10px 15px 10px" borderWidth="0px">
                  <Tooltip label="Search Your Friends" hasArrow placement="bottom-end">
                        <Button variant="ghost" onClick={onOpen} bg="white">
                           <i className="fas fa-search"></i> 
                           <Text d={{base:"none",md:"flex"}} px="4" fontFamily="Montserrat" className="searchText">
                               Search Friends
                           </Text>
                       </Button>    
                   </Tooltip>
                   <Text fontSize="3xl" fontFamily="Oswald" d="flex" fontWeight="500">
                       Baat-Chit <img src="assets/logo.png" className="logoImage" />
                   </Text>
                   <div>
                       <Menu>
                           <MenuButton p={1}>
                               <BellIcon fontSize="2xl" margin={1}></BellIcon>
                           </MenuButton>
                       </Menu>
                       <Menu>
                           <MenuButton as={Button} rightIcon={<ChevronDownIcon></ChevronDownIcon>}>
                               <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}></Avatar>  
                                 {/* name={user.name} src={user.pic} */}
                           </MenuButton>
                           <MenuList>
                               <ProfileModal user={user}>
                                   <MenuItem>My Profile</MenuItem>
                               </ProfileModal>
                               <MenuDivider></MenuDivider>
                               <MenuItem onClick={logoutHandler} >Logout</MenuItem>
                           </MenuList>
                       </Menu>
                   </div>
              </Box>  

              <Drawer placement="left" onClose={onClose} isOpen={isOpen} bg="#f5f7fb" >
                  <DrawerOverlay />
                      <DrawerContent>
                          <DrawerHeader borderBottom="1px" fontFamily="Oswald" fontWeight="500" boxShadow="none">
                              Search Friends
                          </DrawerHeader>
                          <DrawerBody>
                            <Box d="flex" pb={2}>
                                <Input
                                placeholder="Search by Name or Email"
                                mr={2}
                                bg="white"
                                value={search}
                                className="searchFriend"
                                fontFamily="Montserrat"
                                onChange={(e)=>setSearch(e.target.value)}
                                />
                                <Button onClick={handleSearch} className="searchButton">Go</Button>
                            </Box>
                            {loading ? (
                                <Loader></Loader>
                            ): (
                                searchResult?.map((item)=>(
                                    // console.log(item);
                                    <UserListItem 
                                    key={item._id}
                                    user={item}
                                    handleFunction={()=>accessChat(item._id)}
                                    />
                                     
                                ))
                            )}

                            {chatLoading && <Spinner ml="auto" d="flex" />}
                          </DrawerBody>
                      </DrawerContent>
              </Drawer> 
        </>
    )
}

export default SideDrawer
