import { Tabs } from 'expo-router';

import BottomTab from '../../components/ui/BottomTab';


export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          // We keep this hidden so the default React Navigation bar doesn't show up
          tabBarStyle: { display: 'none' }, 
        }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="toprated" />
        <Tabs.Screen name="watchlist" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="login" />
        <Tabs.Screen name="register" />
      </Tabs>
      
      <BottomTab />
    </>
  );
}