import { StyleSheet, ScrollView, Text, View, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // The new tool
import SearchBar from '../../components/ui/SearchBar';

export default function HomeScreen() {
  const insets = useSafeAreaInsets(); // This gets the notch height dynamically

  return (
    <LinearGradient
      colors={['#310550', '#1A002E', '#002366']} 
      locations={[0, 0.2, 1]} 
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      
      {/* We use a regular View and apply the 'top' inset as padding */}
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <SearchBar />

          <Text style={styles.sectionTitle}>Featured Movies</Text>
          
          <View style={styles.contentSpace} />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10, // Reduced since insets.top handles the heavy lifting
    paddingBottom: 100,
  },
  sectionTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 30,
    textShadowColor: 'rgba(255, 215, 0, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  contentSpace: {
    height: 400,
  }
});