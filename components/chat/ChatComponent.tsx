'use client';
import { Room } from '@/db/schema';
import { generateTokenAction } from '@/app/rooms/[roomId]/action';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Channel as StreamChannel, StreamChat, User } from 'stream-chat';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  VirtualizedMessageList,
  Window,
} from 'stream-chat-react';
import '@/app/globals.css'
 
const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;

const ChatComponent = ({ room }: { room: Room}) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const { data: session, status } = useSession();

 
  useEffect(() => {

    const initClient = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        try {
          const token = await generateTokenAction();
          if (!token) {
            throw new Error('Chat Token not Found');
          }

          const user: User = {
            id: session.user.id,
            name: session.user.name|| "",
            image: session.user.image || undefined,
          };

          const chatClient = StreamChat.getInstance(apiKey);
          await chatClient.connectUser(user, token);
 
          const spaceChannel = chatClient.channel('livestream', room?.id, {
            image: 'https://goo.gl/Zefkbx',
            name: room?.name,
          });

          await spaceChannel.watch();

          setClient(chatClient);
          setChannel(spaceChannel);
        } catch (error) {
          console.error('Error initializing chat client:', error);
        }
      }
    };

    initClient();

 
  }, [status, session,room]);

  if (!client || !channel) return <div className='flex pt-24 flex-col items-center justify-center'>
    <div className="chat-loader">
  <div className="chat-loader-1"></div>
</div>
<div className='text-sm font-semibold py-6'>Setting connection</div>

  </div> 
  return (
    <Chat client={client} theme='str-chat__theme-dark' > 
    <Channel channel={channel}>
      <Window>
        <ChannelHeader live />
        <VirtualizedMessageList />
        <MessageInput focus />
      </Window>
    </Channel>
  </Chat> 
      
 
   
    
  );
};

export default ChatComponent;
