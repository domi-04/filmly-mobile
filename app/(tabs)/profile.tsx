import { ScrollView, View, StatusBar, Text, Image, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


export default function Profile() {
  const insets = useSafeAreaInsets();

  const profile_picture = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
  
  const router = useRouter();

  return (
    <LinearGradient 
          colors={['#310550', '#1A002E', '#002366']} 
          style={{ flex: 1 }}
        >
          <StatusBar barStyle="light-content" />
          <View style={{ flex: 1, paddingTop: insets.top }}>
            <ScrollView 
              contentContainerStyle={{ paddingBottom: 150 }} // padding bottom to ensure content is not hidden behind the BottomTab
              showsVerticalScrollIndicator={false}
            >
              
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Image 
                  source={{ uri: profile_picture }} 
                  style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }} 
                />
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>John Doe</Text>
                <Button 
                onPress={() => router.push('/login')}
                title="go to login tab (test)" 
                />
              </View>

              
    
            </ScrollView>
          </View>
        </LinearGradient>
  );
}
