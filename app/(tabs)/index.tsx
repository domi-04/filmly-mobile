import React from 'react';

import { ScrollView, View, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchBar from '../../components/ui/SearchBar';
import FeaturedMovie from '../../components/ui/FeaturedMovie';
import MovieRow from '../../components/ui/MovieRow';

const RECOMMENDED_DATA = [
  { id: '1', title: 'Interstellar', image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6vCU67oQvfhO9.jpg' },
  { id: '2', title: 'Inception', image: 'https://image.tmdb.org/t/p/w500/edv5CZvjRRM89v9PFi6Y20zRbtq.jpg' },
  { id: '3', title: 'The Dark Knight', image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDr9p1v3Cmp6sdz2Dxb.jpg' },
  { id: '4', title: 'Dunkirk', image: 'https://image.tmdb.org/t/p/w500/ebSnODmBhp99AK6oNysvOT35Cpe.jpg' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

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
          <FeaturedMovie />
          
          <MovieRow title="Recommended" data={RECOMMENDED_DATA} />
          <MovieRow title="Trending Now" data={RECOMMENDED_DATA} />

        </ScrollView>
      </View>
    </LinearGradient>
  );
}