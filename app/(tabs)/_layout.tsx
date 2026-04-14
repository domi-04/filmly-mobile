import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide tab bar, we made a custom one
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="toprated" />
      <Tabs.Screen name="watchlist" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}