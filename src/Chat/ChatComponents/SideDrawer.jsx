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
import UserListItem from '../../components/User Avatar/UserListItem';


const allowedState = [
    { _id: 1, value: "Alabama" },
    { _id: 2, value: "Georgia" },
    { _id: 3, value: "Tennessee" }
  ];


const SideDrawer = () => {

    const {user} = ChatState();
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
             }
           axios.get(`/api/user?search=${search}`,config).then(data=>setSearchResult(data.data));

            
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
         console.log(searchResult);
   }


   const accessChat = (userId) =>{

   }

    return (
        <>
              <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
                  <Tooltip label="Search Your Friends" hasArrow placement="bottom-end">
                        <Button variant="ghost" onClick={onOpen}>
                           <i className="fas fa-search"></i> 
                           <Text d={{base:"none",md:"flex"}} px="4">
                               Search Friends
                           </Text>
                       </Button>    
                   </Tooltip>
                   <Text fontSize="2xl" fontFamily="Roboto">
                       Baat-Chit
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

              <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                      <DrawerContent>
                          <DrawerHeader borderBottom="1px">
                              Search Friends
                          </DrawerHeader>
                          <DrawerBody>
                            <Box d="flex" pb={2}>
                                <Input
                                placeholder="Search by Name or Email"
                                mr={2}
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                                />
                                <Button onClick={handleSearch}>Go</Button>
                            </Box>
                            {loading ? (
                                <Loader></Loader>
                            ): (
                                searchResult?.map((item)=>{
                                     <UserListItem
                                       key={item._id}
                                       user={item}
                                       handleFunction={()=>accessChat(item._id)}
                                     />
                                 })
                            )}
                          </DrawerBody>
                      </DrawerContent>
              </Drawer> 
        </>
    )
}

export default SideDrawer
