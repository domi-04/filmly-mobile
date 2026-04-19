import React from 'react';
import { ScrollView, View, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchBar from '../../components/ui/SearchBar';
import MovieRow from '../../components/ui/MovieRow';


const RECOMMENDED_DATA = [
  { id: '1', title: 'Interstellar', image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6vCU67oQvfhO9.jpg', rating: 8.6, recent_rating: 8.0 },
  { id: '2', title: 'Inception', image: 'https://image.tmdb.org/t/p/w500/edv5CZvjRRM89v9PFi6Y20zRbtq.jpg', rating: 8.8, recent_rating: 8.5 },
  { id: '3', title: 'The Dark Knight', image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDr9p1v3Cmp6sdz2Dxb.jpg', rating: 9.0, recent_rating: 9.2 },
  { id: '4', title: 'Dunkirk', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg', rating: 7.8, recent_rating: 8.2 },
];


export default function TopRated() {
  const insets = useSafeAreaInsets();

  let top_rated_sorted = [...RECOMMENDED_DATA].sort((a, b) => b.rating - a.rating).slice(0, 10);
  let on_fire_sorted = [...RECOMMENDED_DATA].sort((a, b) => b.recent_rating - a.recent_rating);


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
              <SearchBar />
              
              <MovieRow title="Top-rated movies" data={top_rated_sorted} showRatings={true} showRanking={true} />
              <MovieRow title="Movies on fire" data={on_fire_sorted} showRanking={true} />
    
            </ScrollView>
          </View>
        </LinearGradient>
  );
}
