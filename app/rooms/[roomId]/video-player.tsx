'use client';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Room } from '@/db/schema';
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {generateTokenAction } from './action';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDdiNTI0NTgtYzZlZS00MTU4LWE1MWQtZDM3YjE1NWI4MmY3In0.L8b5COLStdfvmAeOIdWLbfNr-S6fDxf6F68gSjZPRiY';

export const GrindCodeVideo = ({ room }: { room: Room }) => {
  const { data: session, status } = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (status !== 'authenticated' || !session || !room) return;

    const userId = session.user.id;

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
     tokenProvider:()=>generateTokenAction()

    });

    setClient(client);

    const call = client.call('default', room.id);
    call.join({ create: true });
    setCall(call);

    return () => {
      call.leave();
      client.disconnectUser();
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
          <CallControls />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};
