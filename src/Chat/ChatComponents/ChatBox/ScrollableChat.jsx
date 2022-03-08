import { Avatar } from '@chakra-ui/avatar';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../../components/Context/ChatProvider';
import { isSameSender, isSameSenderMargin, isSameUser, isLastMessage } from './../Config/ChatLogic';

const ScrollableChat = ({ messages }) => {

   const { user } = ChatState();
   let data=[];
   messages.filter((m)=> {
      // console.log(m.content);
      data.push(m.content);
   })

   console.log(data);

   return (
      <div style={{marginBottom:"10px"}}>
         <ScrollableFeed>
            {messages && messages.map((m, i) => (
               
               <div style={{ display: "flex" }} key={m._id}>
                  {

                     (isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id))
                     && (<Tooltip
                        label={m.sender.name}
                        placement="bottom-start"
                        hasArrow
                     >
                        <Avatar
                           mt="7px"
                           mr={1}
                           size="sm"
                           cursor="pointer"
                           name={m.sender.name}
                           src={m.sender.pic}
                        />
                     </Tooltip>)
                  }
                  <span
                     style={{
                        backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                        marginLeft: isSameSenderMargin(messages, m, i, user._id),
                        marginTop: isSameUser(messages, m, i, user._id) ? 5 : 'auto',
                     }}
                  >{m.content}</span>
               </div>
            ))}
         </ScrollableFeed>
      </div>
   )
}

export default ScrollableChat
