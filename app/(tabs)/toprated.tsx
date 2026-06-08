import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, StatusBar, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // 1. Import the router hook

import SearchBar from '../../components/ui/SearchBar';
import { API_URL } from '@/utils/api';

const { width } = Dimensions.get('window');

interface Movie {
  id: string;
  movie_id: string;
  title: string;
  image: string;
  backdrop?: string;
  overview?: string;
}

// Pointing directly to your local Express server
const BASE_URL = `${API_URL}/api/movies`;

export default function TopRated() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // 2. Initialize the router instance
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopChartData = async () => {
      try {
        // Fetching the live global top rated list from your MySQL database cache
        const response = await fetch(`${BASE_URL}/toprated`);
        const rawData = await response.json();
        
        const list = rawData.results || rawData || [];
        
        // Format incoming database rows uniformly for our custom card UI
        const formattedMovies = list.map((movie: any) => {
          const poster = movie.poster_path || movie.image || movie.poster || '';
          const backdrop = movie.backdrop_path || movie.backdrop || '';
          
          return {
            id: (movie.id || movie.movie_id || Math.random()).toString(),
            movie_id: movie.movie_id ? movie.movie_id.toString() : Math.random().toString(),
            title: movie.title || movie.name || movie.movie_title || 'Unknown Title',
            image: poster.startsWith('http') ? poster : `https://image.tmdb.org/t/p/w500${poster}`,
            backdrop: backdrop.startsWith('http') ? backdrop : `https://image.tmdb.org/t/p/w1280${backdrop}`,
            overview: movie.overview || 'No overview available for this title.'
          };
        });

        // Pulling the top 50 movies to display down the list view
        setMovies(formattedMovies.slice(0, 50));
      } catch (error) {
        console.error("🔴 Error fetching Top Chart packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopChartData();
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

          {/* Page Heading Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>TOP 50 TRENDING CHARTS</Text>
            <Text style={styles.headerSubtitle}>Real-time streaming charts powered by Filmly</Text>
          </View>
            
          {isLoading ? (
            <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 60 }} />
          ) : (
            // Vertically loop through movies from up to down (1 per row)
            movies.map((item, index) => {
              const displayImage = item.backdrop || item.image;
              const ranking = index + 1;

              return (
                // 3. Added dynamic route pushing block inside the card container wrapper
                <TouchableOpacity 
                  key={item.id} 
                  activeOpacity={0.85} 
                  style={styles.cardContainer}
                  onPress={() => router.push({ pathname: `/movie/${item.movie_id}` as any })} >
                  <ImageBackground 
                    source={{ uri: displayImage }} 
                    style={styles.imageBackground}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 20 }}
                  >
                    {/* Linear gradient overlay ensures text contrast over image backgrounds */}
                    <LinearGradient
                      colors={['rgba(0,0,0,0.1)', 'rgba(26, 0, 46, 0.6)', '#1A002E']}
                      style={styles.gradient}
                    >
                      {/* Top left absolute ranking crown badge */}
                      <View style={styles.rankingBadge}>
                        <Text style={styles.rankingText}>#{ranking}</Text>
                      </View>

                      {/* Text content layout stack */}
                      <View style={styles.textContainer}>
                        <Text style={styles.movieTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.movieOverview} numberOfLines={2}>
                          {item.overview}
                        </Text>
                      </View>

                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })
          )}
  
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 16,
    marginTop: 5,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    color: '#CCCCCC',
    fontSize: 13,
    marginTop: 4,
  },
  cardContainer: {
    height: 220,                  // Perfectly balanced row height for a dynamic scroll stack
    marginHorizontal: 16,         // Locks directly into alignment grid with SearchBar
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',       // Keeps consistent styling theme with Hero banner
    backgroundColor: '#1A002E',
    overflow: 'hidden',
    
    // Smooth element container drop shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    position: 'relative',
  },
  rankingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.95)', // Solid premium gold ranking badge
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  rankingText: {
    color: '#1A002E',
    fontWeight: 'bold',
    fontSize: 13,
  },
  textContainer: {
    width: '100%',
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  movieOverview: {
    color: '#DDDDDD',
    fontSize: 13,
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});