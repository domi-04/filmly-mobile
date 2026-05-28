import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// 1. Define what properties our movie object must contain
interface FeaturedMovieProps {
  movie: {
    id: string;
    title: string;
    image: string;
    backdrop?: string;
    overview?: string;
  } | null;
}

export default function FeaturedMovie({ movie }: FeaturedMovieProps) {
  
  // Loading state fallback that keeps the exact same card sizing
  if (!movie) {
    return (
      <View style={[styles.cardContainer, { backgroundColor: '#1A002E', justifyContent: 'center', alignItems: 'center' }]} />
    );
  }

  // Use backdrop if available, otherwise standard poster image
  const displayImage = movie.backdrop || movie.image;

  return (
    // The main wrapper that controls the outer card placement, margins, and borders
    <View style={styles.cardContainer}>
      <ImageBackground 
        source={{ uri: displayImage }} 
        style={styles.imageBackground}
        resizeMode="cover"
        // This ensures the image inside obeys the card's rounded corners
        imageStyle={{ borderRadius: 24 }} 
      >
        {/* Gradients blending up from the bottom to keep the text highly readable */}
        <LinearGradient
          colors={['transparent', 'rgba(26, 0, 46, 0.7)', '#1A002E']}
          style={styles.gradient}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {movie.title}
            </Text>
            
            {movie.overview ? (
              <Text style={styles.overview} numberOfLines={3}>
                {movie.overview}
              </Text>
            ) : null}
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 380,                 
    marginHorizontal: 16,       
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 24,            
    borderWidth: 1,
    borderColor: '#FFD700',     
    backgroundColor: '#1A002E',
    overflow: 'hidden',        
    
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: '75%',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textContainer: {
    width: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  overview: {
    color: '#CCCCCC',
    fontSize: 13,
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});