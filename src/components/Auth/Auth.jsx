import { Container,Box, Text } from '@chakra-ui/layout';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import './Auth.css'
import Login from './Login/Login';
import Signup from './Signup/Signup';

function Auth() {
    return (
        <Container maxW="xl" centerContent>
           <Box
           d="flex"
           justifyContent="center"
           p={3}
           bg={"white"}
           w="100%"
           m="70px 0 20px 0"
           borderRadius="lg"
           borderWidth="1px"
           >
               <Text className="loginHeading font-heading" d="flex" >Baat-Chit <img src="assets/logo.png" className="logoImage" /></Text>
           </Box>
           <Box bg="White" w="100%" p={4} borderRadius="lg" borderWidth="1px">
           <Tabs variant='soft-rounded' >
                <TabList mb="1em">
                    <Tab width="50%">Login</Tab>
                    <Tab width="50%">Signup</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                       <Login></Login>
                    </TabPanel>
                    <TabPanel>
                        <Signup></Signup>
                    </TabPanel>
                </TabPanels>
                </Tabs>
           </Box>
        </Container>
    )
}

export default Auth
