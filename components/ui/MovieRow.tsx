import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

// 1. Updated our interfaces to allow optional properties like ratings and rankings
interface Movie {
  id: string;
  title: string;
  image: string;
  rating?: number;        // Optional property
  recent_rating?: number; // Optional property
}

interface MovieRowProps {
  title: string;
  data: Movie[];
  showRatings?: boolean;  // Optional flag added to fix the toprated.tsx screen!
  showRanking?: boolean;  // Optional flag added to fix the toprated.tsx screen!
}

export default function MovieRow({ title, data, showRatings, showRanking }: MovieRowProps) {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.rowTitle}>{title.toUpperCase()}</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        {data.map((item, index) => (
          <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.movieCardWrapper}>
            
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.posterImage} 
                resizeMode="cover"
              />

              {showRanking && (
                <View style={styles.rankingBadge}>
                  <Text style={styles.rankingText}>{index + 1}</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.movieTitle} numberOfLines={1}>
              {item.title}
            </Text>

            {showRatings && item.rating ? (
              <Text style={styles.ratingText}>⭐ {item.rating.toFixed(1)}</Text>
            ) : null}

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 25,
  },
  rowTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
    letterSpacing: 1,
  },
  scrollPadding: {
    paddingHorizontal: 12,
  },
  movieCardWrapper: {
    width: 140,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD700', 
    overflow: 'hidden',
    backgroundColor: '#1A002E',
    position: 'relative',   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  movieTitle: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  rankingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.9)', 
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankingText: {
    color: '#1A002E',
    fontWeight: 'bold',
    fontSize: 12,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  }
});