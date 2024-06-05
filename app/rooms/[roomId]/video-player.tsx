'use client';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Room } from '@/db/schema';
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {generateTokenAction } from './action';
import { useRouter } from 'next/navigation';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;


export const GrindCodeVideo = ({ room }: { room: Room }) => {
  const { data: session, status } = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
 
  const router=useRouter();

  useEffect(() => {
    if (status !== 'authenticated' || !session || !room) return;

    const userId = session.user.id;

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name:session.user.name ?? "Unknown user",
        image:session.user.image ?? undefined,
      },
     tokenProvider:()=>generateTokenAction()

    });

    setClient(client);

    const call = client.call('default', room.id);
    call.join({ create: true });
    setCall(call);

    

    return () => {

      call.leave().then(()=>{
      client.disconnectUser();

      }).catch(console.error)
    };
  }, [session, status, room]);

  if (!client || !call) {
    return null;
  }

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls onLeave={()=>{
router.push('/');
          }} />
          <CallParticipantsList 
          onClose={()=>undefined}
          />
        </StreamCall> 
      </StreamTheme>
    </StreamVideo>
  );
};
