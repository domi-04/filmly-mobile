import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Movie {
  id: string;
  title: string;
  image: string;
  backdrop?: string;
  overview?: string;
}

interface FeaturedMovieProps {
  movie: Movie | null;
  onPress?: (id: string) => void; // 👈 1. Dodajemo callback za klik u props
}

export default function FeaturedMovie({ movie, onPress }: FeaturedMovieProps) {
  if (!movie) return null;

  // Koristimo pozadinsku sliku (backdrop), a ako je nema, uzimamo obični poster
  const backgroundImage = movie.backdrop || movie.image;

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => onPress && onPress(movie.id)} 
      style={styles.container}
    >
      <ImageBackground source={{ uri: backgroundImage }} style={styles.imageBackground}>
        <LinearGradient
          colors={['transparent', 'rgba(26, 0, 46, 0.6)', '#1A002E']}
          style={styles.gradient}
          pointerEvents="none" // 👈 DODAJ OVO KAKO GRADVENT NE BI BLOKIRAO KLIK
        />
        <View style={styles.infoContainer}>
          <Text style={styles.featuredBadge}>FEATURED MOVIE</Text>
          <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
          {movie.overview ? (
            <Text style={styles.overview} numberOfLines={3}>{movie.overview}</Text>
          ) : null}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 360,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  infoContainer: {
    padding: 16,
    zIndex: 2,
  },
  featuredBadge: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  overview: {
    color: '#DDDDDD',
    fontSize: 14,
    lineHeight: 18,
  },
});