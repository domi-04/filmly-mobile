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

// Dinamički API_URL koji je postavio tvoj tim
import { API_URL } from '@/utils/api';

const { width } = Dimensions.get('window');

// Definiramo sučelje prema točnim podatcima koje tvoj backend vraća
interface DetailedMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  tagline?: string;
  status?: string;
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
    "Cinematography looks fantastic, looking forward to this release!",
    "The concept looks very unique and promising."
  ]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        // Pozivamo novu faks rutu: /api/movies/movie/{id}
        const response = await fetch(`${BASE_URL}/movie/${id}`);
        
        // Provjera ako server vrati HTML grešku umjesto JSON-a
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const textError = await response.text();
          console.error("🔴 Server nije vratio JSON nego HTML/Tekst:", textError);
          return;
        }

        const data: DetailedMovie = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("🔴 Error pulling full movie row metadata:", error);
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

  // Sklapanje punog TMDB URL-a za slike iz tvojih polja backdrop_path i poster_path
  const backdropUrl = movie?.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` 
    : 'https://via.placeholder.com/1280x720';

  const posterUrl = movie?.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750';

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="light-content" />
      
      {/* Gumb za nazad */}
      <TouchableOpacity 
        style={[styles.backButton, { top: insets.top + 10 }]} 
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Veliki Hero Banner (Backdrop) */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: backdropUrl }} style={styles.backdropImage} />
          <LinearGradient 
            colors={['transparent', 'rgba(26, 0, 46, 0.6)', '#1A002E']} 
            style={styles.heroGradient} 
          />
        </View>

        {/* Informacije o filmu */}
        <View style={styles.contentContainer}>
          <View style={styles.metaRow}>
            <Image source={{ uri: posterUrl }} style={styles.posterImage} />
            <View style={styles.titleWrapper}>
              <Text style={styles.movieTitle}>{movie?.title}</Text>
              
              {movie?.tagline ? <Text style={styles.taglineText}>"{movie.tagline}"</Text> : null}

              {/* Ocjena, trajanje i datum izlaska */}
              <View style={styles.specsRow}>
                <Text style={styles.specText}>⭐ {movie?.vote_average ? Number(movie.vote_average).toFixed(1) : "N/A"}</Text>
                <Text style={styles.specDot}>•</Text>
                <Text style={styles.specText}>{movie?.runtime} min</Text>
                <Text style={styles.specDot}>•</Text>
                <Text style={styles.specText}>{movie?.release_date ? movie.release_date.split('-')[0] : ""}</Text>
              </View>

              <TouchableOpacity style={styles.watchlistButton}>
                <Text style={styles.watchlistText}>+ Add to Watchlist</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sinopsis filma (Overview) */}
          <Text style={styles.sectionHeading}>OVERVIEW</Text>
          <Text style={styles.overviewText}>{movie?.overview}</Text>

          {/* Status filma */}
          {movie?.status && (
            <Text style={styles.statusText}>Status: <Text style={{color: '#FFFFFF'}}>{movie.status}</Text></Text>
          )}

          <View style={styles.divider} />

          {/* Razgovori / Komentari */}
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

          {comments.map((item, idx) => (
            <View key={idx} style={styles.commentCard}>
              <Text style={styles.commentUser}>User_{Math.floor(2154 + idx * 83)}</Text>
              <Text style={styles.commentText}>{item}</Text>
            </View>
          ))}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#1A002E' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backButton: {
    position: 'absolute', left: 16, zIndex: 10,
    backgroundColor: 'rgba(26, 0, 46, 0.85)',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  backText: { color: '#FFD700', fontSize: 14, fontWeight: 'bold' },
  heroContainer: { width: width, height: 280, position: 'relative' },
  backdropImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroGradient: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '100%' },
  contentContainer: { paddingHorizontal: 16, marginTop: -40 },
  metaRow: { flexDirection: 'row', marginBottom: 20 },
  posterImage: {
    width: 115, height: 172, borderRadius: 12, borderWidth: 2,
    borderColor: '#FFD700', backgroundColor: '#310550',
  },
  titleWrapper: { flex: 1, marginLeft: 16, justifyContent: 'flex-end', paddingBottom: 5 },
  movieTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  taglineText: { color: '#B39DDB', fontSize: 13, fontStyle: 'italic', marginBottom: 8 },
  specsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  specText: { color: '#FFD700', fontSize: 14, fontWeight: '600' },
  specDot: { color: '#888888', marginHorizontal: 8, fontSize: 14 },
  watchlistButton: { alignSelf: 'flex-start', backgroundColor: '#FFD700', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  watchlistText: { color: '#1A002E', fontWeight: 'bold', fontSize: 13 },
  sectionHeading: { color: '#FFD700', fontSize: 14, fontWeight: 'bold', letterSpacing: 1.2, marginBottom: 8 },
  overviewText: { color: '#DDDDDD', fontSize: 15, lineHeight: 22, marginBottom: 10 },
  statusText: { color: '#888888', fontSize: 13, fontWeight: '500', marginTop: 5 },
  divider: { height: 1, backgroundColor: 'rgba(255, 215, 0, 0.15)', marginVertical: 25 },
  inputContainer: { backgroundColor: '#25003F', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#310550', marginBottom: 20 },
  commentInput: { color: '#FFFFFF', fontSize: 14, minHeight: 60, textAlignVertical: 'top', paddingHorizontal: 8 },
  sendButton: { alignSelf: 'flex-end', backgroundColor: '#310550', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6, marginTop: 8, borderWidth: 1, borderColor: '#FFD700' },
  sendButtonText: { color: '#FFD700', fontWeight: 'bold', fontSize: 13 },
  commentCard: { backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 10, padding: 12, marginBottom: 10, borderLeftWidth: 3, borderColor: '#FFD700' },
  commentUser: { color: '#FFD700', fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  commentText: { color: '#CCCCCC', fontSize: 14, lineHeight: 18 },
});