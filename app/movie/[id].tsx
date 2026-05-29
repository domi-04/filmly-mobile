import React, { useState, useEffect } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image, 
  StatusBar, 
  ActivityIndicator, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  TextInput 
} from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { API_URL } from '@/utils/api';

const { width } = Dimensions.get('window');

interface DetailedMovie {
  id: string;
  title: string;
  image: string;
  backdrop?: string;
  overview?: string;
}

const BASE_URL = `${API_URL}/api/movies`;

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [movie, setMovie] = useState<DetailedMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([
    "Absolutely incredible cinematography! A must-watch.",
    "The third act was a bit slow, but the acting saved it."
  ]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        // Appends the dynamic ID parameter directly to your Express route mapping
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        
        const poster = data.poster_path || data.image || data.poster || '';
        const backdrop = data.backdrop_path || data.backdrop || '';

        setMovie({
          id: (data.id || id).toString(),
          title: data.title || data.name || 'Unknown Title',
          image: poster.startsWith('http') ? poster : `https://image.tmdb.org/t/p/w500${poster}`,
          backdrop: backdrop.startsWith('http') ? backdrop : `https://image.tmdb.org/t/p/w1280${backdrop}`,
          overview: data.overview || 'No overview description available for this title.'
        });
      } catch (error) {
        console.error("🔴 Error pulling specific movie row metadata:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchMovieDetail();
  }, [id]);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    setComments([comment, ...comments]);
    setComment('');
  };

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: '#1A002E' }]}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  const backdropImage = movie?.backdrop || movie?.image;

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="light-content" />
      
      {/* Absolute Header Navigation Overlay */}
      <TouchableOpacity 
        style={[styles.backButton, { top: insets.top + 10 }]} 
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Hero Backdrop Banner Layout */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: backdropImage }} style={styles.backdropImage} />
          <LinearGradient 
            colors={['transparent', 'rgba(26, 0, 46, 0.6)', '#1A002E']} 
            style={styles.heroGradient} 
          />
        </View>

        {/* Poster & Title Content Frame */}
        <View style={styles.contentContainer}>
          <View style={styles.metaRow}>
            <Image source={{ uri: movie?.image }} style={styles.posterImage} />
            <View style={styles.titleWrapper}>
              <Text style={styles.movieTitle}>{movie?.title}</Text>
              <TouchableOpacity style={styles.watchlistButton}>
                <Text style={styles.watchlistText}>+ Add to Watchlist</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Overview Section */}
          <Text style={styles.sectionHeading}>OVERVIEW</Text>
          <Text style={styles.overviewText}>{movie?.overview}</Text>

          <View style={styles.divider} />

          {/* Discussion Box Section */}
          <Text style={styles.sectionHeading}>PUBLIC DISCUSSION BOARD</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Share your thoughts about this movie..."
              placeholderTextColor="#888888"
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
              <Text style={styles.sendButtonText}>Post</Text>
            </TouchableOpacity>
          </View>

          {/* Live Render Comments Stack */}
          {comments.map((item, idx) => (
            <View key={idx} style={styles.commentCard}>
              <Text style={styles.commentUser}>User_{Math.floor(1000 + idx * 45)}</Text>
              <Text style={styles.commentText}>{item}</Text>
            </View>
          ))}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#1A002E',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(26, 0, 46, 0.75)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  backText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heroContainer: {
    width: width,
    height: 280,
    position: 'relative',
  },
  backdropImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginTop: -40,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  posterImage: {
    width: 110,
    height: 165,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#310550',
  },
  titleWrapper: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  watchlistButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  watchlistText: {
    color: '#1A002E',
    fontWeight: 'bold',
    fontSize: 13,
  },
  sectionHeading: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  overviewText: {
    color: '#DDDDDD',
    fontSize: 15,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    marginVertical: 25,
  },
  inputContainer: {
    backgroundColor: '#25003F',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#310550',
    marginBottom: 20,
  },
  commentInput: {
    color: '#FFFFFF',
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: 'top',
    paddingHorizontal: 8,
  },
  sendButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#310550',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  sendButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 13,
  },
  commentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderColor: '#FFD700',
  },
  commentUser: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 18,
  },
});