import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router'

const Signup = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false); 
    const [showConfirm, setShowConfirm] = useState(false); 
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const showText = () => {
        setShow(!show);
    }
    const showConfirmText = () => {
        setShowConfirm(!showConfirm);
    }

    const postDetails = (picture) => {
        console.log(picture)
        setLoading(true);
        if(picture === undefined){
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top",
              })
            return;  
        }
        if(picture.type == "image/jpeg" || picture.type == "image/jpg" || picture.type == "image/png"){
            const data =  new FormData();
            data.append("file",picture);
            data.append("upload_preset", "baat-chit");
            data.append("cloud_name", "baatchit");
            fetch("https://api.cloudinary.com/v1_1/baatchit/image/upload", {
                method: 'post',
                body:data,
            }).then((res)=> res.json()).then(data=>{
                setPic(data.url.toString());
                console.log(data.url.toString())
                setLoading(false);
            }).catch(error =>{
                console.log(error);
                setLoading(false);
            })
            
        } else{
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top",
              })
              setLoading(false);
        }
    }

    const submitHandler = async() => {
        setLoading(true);
        if(!name || !email || !password || !confirm){
            toast({
                title: 'Please Fill all the fields*',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top",
              });
              setLoading(false);
              return;
        }
        if(password !== confirm){
            toast({
                title: 'Please match both the passwords',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top",
              });
              return;
        }
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                },
            };
            const {data} = await axios.post('/api/user',{name,email,password,pic},config);
            toast({
                title: 'Registration Successful',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:"top",
              });

              localStorage.setItem('userInfo',JSON.stringify(data));
              setLoading(false);
              history.push('/');
        } catch (error) {
            toast({
                title: 'Error Occured',
                description:error.response.data.message,
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top",
              });
        }
    }

    return (
        <VStack spacing="5px" color="black">
             <FormControl isRequired>
                 <FormLabel>Name</FormLabel>
                 <Input 
                     placeholder="Enter Your Name"
                     onChange={(e)=>setName(e.target.value)}
                     ></Input>
             </FormControl>
             <FormControl isRequired>
                 <FormLabel>Email</FormLabel>
                 <Input 
                     placeholder="Enter Your Email"
                     onChange={(e)=>setEmail(e.target.value)}
                     ></Input>
             </FormControl>
             <FormControl isRequired>
                 <FormLabel>Password</FormLabel>
                 <InputGroup>
                    <Input 
                        type={ show? "text" :"password"}
                        placeholder="Enter Passoword"
                        onChange={(e)=>setPassword(e.target.value)}
                        ></Input>
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={showText}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                  </InputGroup>
             </FormControl>
             <FormControl isRequired>
                 <FormLabel>Confirm Password</FormLabel>
                 <InputGroup>
                    <Input 
                        type={ showConfirm? "text" :"password"}
                        placeholder="Confirm Passoword"
                        onChange={(e)=>setConfirm(e.target.value)}
                        ></Input>
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={showConfirmText}>
                                {showConfirm ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                  </InputGroup>
             </FormControl>
             <FormControl isRequired>
                 <FormLabel>Add Profile Picture</FormLabel>
                 <Input 
                     type="file"
                     p={1.5}
                     accept="image/*"
                     placeholder="Upload Image"
                     onChange={(e) => postDetails(e.target.files[0])}
                     ></Input>
             </FormControl>
             <Button 
             colorScheme="blue"
             width="100%"
             style={{marginTop:15}}
             onClick={submitHandler}
             isLoading={loading}
             >
                 Sign-up
             </Button>
        </VStack>
    )
}

export default Signup