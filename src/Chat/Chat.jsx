import axios from 'axios'
import  { useEffect, useState } from 'react'

function Chat() {
    
    const [chats, setchats] = useState([]);

    const fetchChats = async() => {
       const data = await axios.get('/api/chat');
    //    console.log(data.data);
       setchats(data.data);
    }


    useEffect(() => {
       fetchChats(); 
    }, [])


    return(
        <div>
            { chats.map( item => (
             <div key={item._id}>{item.chatName}</div>
           ))}
        </div>
    );
}

export default Chat
