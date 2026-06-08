import { StyleSheet, ScrollView, View, StatusBar, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchBar from '../../components/ui/SearchBar';
import MovieGrid from '../../components/ui/MovieGrid';

const RECOMMENDED_DATA = [
  { id: '1', title: 'Interstellar', image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6vCU67oQvfhO9.jpg', rating: 8.6, recent_rating: 8.0 },
  { id: '2', title: 'Inception', image: 'https://image.tmdb.org/t/p/w500/edv5CZvjRRM89v9PFi6Y20zRbtq.jpg', rating: 8.8, recent_rating: 8.5 },
  { id: '3', title: 'The Dark Knight', image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDr9p1v3Cmp6sdz2Dxb.jpg', rating: 9.0, recent_rating: 9.2 },
  { id: '4', title: 'Dunkirk', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg', rating: 7.8, recent_rating: 8.2 },
  { id: '5', title: 'placeholder movie', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg', rating: 7.8, recent_rating: 8.2 },
  { id: '6', title: 'placeholder movie', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg', rating: 7.8, recent_rating: 8.2 },
  { id: '7', title: 'placeholder movie', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg', rating: 7.8, recent_rating: 8.2 },
  { id: '8', title: 'placeholder movie', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg', rating: 7.8, recent_rating: 8.2 },
  { id: '9', title: 'placeholder movie', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg', rating: 7.8, recent_rating: 8.2 },
  { id: '10', title: 'placeholder movie', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg', rating: 7.8, recent_rating: 8.2 },
];


export default function Watchlist() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  
  return (
    <LinearGradient 
              colors={['#310550', '#1A002E', '#002366']} 
              style={{ flex: 1 }}
            >
          <StatusBar barStyle="light-content" />
            <View style={{ flex: 1, paddingTop: insets.top }}>
              <ScrollView 
                scrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 150 }} // padding bottom to ensure content is not hidden behind the BottomTab
                showsVerticalScrollIndicator={false}
              >
                <SearchBar />

                <Text style={styles.title}>Watchlist</Text>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 25, textAlign: 'center' }}>You must be signed in to see this tab!</Text>
                  
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 50 }}>
                    <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                flexDirection: 'row',
                                borderRadius: 10,
                                backgroundColor: 'rgba(255,255,255,0.12)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.15)'
                            }}
                            onPress={() => router.push('/login')}
                            activeOpacity={0.7}
                        >
                            <Text style={{ color: '#FFD700', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Sign in</Text>
                            <Ionicons
                                name="person-outline"
                                size={22}
                                color="rgba(255,255,255,0.8)"
                            />
                        </TouchableOpacity>

                    <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                flexDirection: 'row',
                                borderRadius: 10,
                                backgroundColor: 'rgba(255,255,255,0.12)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.15)',
                                marginTop: 15
                            }}
                            onPress={() => router.push('/register')}
                            activeOpacity={0.7}
                        >
                            <Text style={{ color: '#FFD700', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Sign up</Text>
                            <Ionicons
                                name="person-add-outline"
                                size={22}
                                color="rgba(255,255,255,0.8)"
                            />
                        </TouchableOpacity>
                </View>

                {/*<MovieGrid title="Watchlist" data={RECOMMENDED_DATA} showTitle={false} />*/}
        
              </ScrollView>
            </View>
        </LinearGradient>



  );
}


const styles = StyleSheet.create({
  title: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
});