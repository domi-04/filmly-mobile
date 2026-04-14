import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeaturedMovie() {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.card}>
        <Image 
          source={{ uri: 'https://image.tmdb.org/t/p/original/8Gxv2mYqlUjXw9S7QZojS0YIuwi.jpg' }} 
          style={styles.image}
        />
        <LinearGradient 
          colors={['transparent', 'rgba(26, 0, 46, 0.95)']} 
          style={styles.gradient}
        >
          <Text style={styles.title}>Dune: Part Two</Text>
          <Text style={styles.subtitle}>Epic • Sci-Fi • 2h 46m</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 20, 
    marginTop: 25 
  },
  card: {
    height: 220,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  image: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: 'bold' 
  },
  subtitle: { 
    color: '#FFD700', 
    fontSize: 14, 
    marginTop: 4, 
    fontWeight: '500' 
  },
});