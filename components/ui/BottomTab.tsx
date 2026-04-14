import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function BottomTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
      
      {/* 1. Home */}
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
        <Ionicons name="home" size={26} color="#FFD700" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>

      {/* 2. Top Rated */}
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/toprated')}>
        <MaterialCommunityIcons name="trending-up" size={26} color="#FFD700" />
        <Text style={styles.tabText}>Top</Text>
      </TouchableOpacity>

      {/* 3. Center Logo */}
      <TouchableOpacity style={styles.logoContainer} onPress={() => router.push('/')}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="movie-roll" size={28} color="#1A002E" />
        </View>
      </TouchableOpacity>

      {/* 4. Watchlist */}
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/watchlist')}>
        <Ionicons name="eye" size={26} color="#FFD700" />
        <Text style={styles.tabText}>Watch</Text>
      </TouchableOpacity>

      {/* 5. Profile */}
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
        <Ionicons name="person" size={26} color="#FFD700" />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 0, 46, 0.95)',
    height: 90,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  tabText: {
    color: '#FFD700',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  logoContainer: {
    top: -25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#1A002E',
  },
});