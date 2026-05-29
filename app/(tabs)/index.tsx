import React, { useState, useEffect } from 'react';
import { ScrollView, View, StatusBar, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchBar from '../../components/ui/SearchBar';
import FeaturedMovie from '../../components/ui/FeaturedMovie';
import MovieRow from '../../components/ui/MovieRow';

import { API_URL } from '@/utils/api';

interface Movie {
  id: string;
  title: string;
  image: string;
  backdrop?: string; // Optional backdrop for the big hero banner
  overview?: string; // Optional description for the featured movie
  tmdb_rank?: number; // Optional TMDB rank for sorting
}

// Base URL configuration pointing to  local Express server
const BASE_URL = `${API_URL}/api/movies`;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  // Separate states for  three different UI data sections
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllHomeData = async () => {
      try {
       
        const [trendingRes, topRatedRes, popularRes] = await Promise.all([
          fetch(`${BASE_URL}/trending`),
          fetch(`${BASE_URL}/toprated`),
          fetch(`${BASE_URL}/popular`)
        ]);

        const trendingData = await trendingRes.json();
        const topRatedData = await topRatedRes.json();
        const popularData = await popularRes.json();

       
        const formatMovies = (rawList: any) => {
          const list = rawList.results || rawList || [];
          return list.map((movie: any) => {
            const poster = movie.poster_path || movie.image || movie.poster || '';
            const backdrop = movie.backdrop_path || movie.backdrop || '';
            
            return {
              ...movie,
              id: (movie.id || movie.movie_id || Math.random()).toString(),
              title: movie.title || movie.name || movie.movie_title || 'Unknown Title',
              image: poster.startsWith('http') ? poster : `https://image.tmdb.org/t/p/w500${poster}`,
              backdrop: backdrop.startsWith('http') ? backdrop : `https://image.tmdb.org/t/p/w1280${backdrop}`,
              overview: movie.overview || ''
            };
          });
        };

        const sortByRank = (movies: Movie[]) => {
          return movies.sort((a: any, b: any) => {
            const rankA = a.tmdb_rank ?? Infinity;
            const rankB = b.tmdb_rank ?? Infinity;
            return rankA - rankB;
          });
        };

        const formattedTrending = formatMovies(trendingData);
        const formattedTopRated = formatMovies(topRatedData);
        const formattedPopular = formatMovies(popularData);

       
        setTrendingMovies(sortByRank(formattedTrending).slice(0, 8));
        setRecommendedMovies(sortByRank(formattedTopRated).slice(0, 8));
        
       
        const sortedPopular = sortByRank(formattedPopular);
        if (sortedPopular.length > 0) {
          setFeaturedMovie(sortedPopular[0]);
        }

      } catch (error) {
        console.error("🔴 Error pulling full home page data package:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllHomeData();
  }, []);


  return (
    <LinearGradient 
      colors={['#310550', '#1A002E', '#002366']} 
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 150 }} 
          showsVerticalScrollIndicator={false}
        >
          <SearchBar />
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 40 }} />
          ) : (
            <>
              <FeaturedMovie movie={featuredMovie} />
              
              <MovieRow title="Recommended" data={recommendedMovies} />
              
              <MovieRow title="Trending Now" data={trendingMovies} />
            </>
          )}

        </ScrollView>
      </View>
    </LinearGradient>
  );
}