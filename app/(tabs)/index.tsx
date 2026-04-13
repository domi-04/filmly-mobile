import React from 'react';
import { StyleSheet, ScrollView, Text, View, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import SearchBar from '../../components/ui/SearchBar';
import BottomTab from '../../components/ui/BottomTab';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      // Cinematic palette: Dark Purple -> Deep Void -> Midnight Blue
      colors={['#310550', '#1A002E', '#002366']} 
      locations={[0, 0.25, 1]} 
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      
      
      <View style={{ flex: 1, paddingTop: insets.top }}>
        
        {/* Scrollable content area */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SearchBar />

          <Text style={styles.sectionTitle}>Featured Movies</Text>
          
          {/* Temporary spacer to allow scrolling */}
          <View style={styles.contentSpace} />
          
        </ScrollView>

       
        <BottomTab /> 
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 150, 
  },
  sectionTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 30,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12
  },
  contentSpace: {
    height: 800, 
  }
});