'use client';

import { getToken, messaging, onMessage } from 'services/firebase-config';
import { createContext, ReactNode, useState, useContext } from 'react';
import { useToast } from 'hooks/use-toast';

interface NotificationContextData {
  requestPermission: () => Promise<void>;
  fcmToken: string | null;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const { toast } = useToast();

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
        });
        setFcmToken(token);

        console.log(token);

        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);
          toast({
            title: payload.notification?.title || 'New notification',
            description: payload.notification?.body,
            duration: 3000
          });
        });
      }
    } catch {
      console.log('Error requesting notification permission');
      toast({
        title: 'Error',
        description: 'Error requesting notification permission',
        variant: 'destructive',
        duration: 3000
      });
    }
  };

  return (
    <NotificationContext.Provider value={{ requestPermission, fcmToken }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
}
