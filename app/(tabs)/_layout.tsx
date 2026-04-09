import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            }}>
            <Tabs.Screen name="index" options={{ 
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                ),
                 }} />
            <Tabs.Screen name="toprated" options={{
                title: 'Top Rated',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="trending-up-outline" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="watchlist" options={{
                title: 'Watchlist',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="eye-outline" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="profile" options={{
                title: 'Profile',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                ),
            }} />
        </Tabs>
    );
}