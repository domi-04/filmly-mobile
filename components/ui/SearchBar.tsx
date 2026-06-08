import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_URL } from '@/utils/api';

interface SearchResult {
  id: string;
  movie_id?: string;
  title: string;
  poster_path?: string;
  image?: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(`${API_URL}/api/movies/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("🔴 Greška prilikom pretraživanja:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelectMovie = (movie_id: string) => {
    setQuery(''); 
    setResults([]);
    router.push(`/movie/${movie_id}`);
  };

  return (
    <View style={styles.outerWrapper}>
      {/* Search Input polje */}
      <View style={styles.container}>
        <Ionicons name="search" size={20} color="#FFD700" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Search movies, actors..." 
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* Lista prijedloga prilagođena za Android z-index */}
      {results.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {results.map((item) => {
            const posterUrl = item.poster_path 
              ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
              : 'https://via.placeholder.com/92x138';

            return (
              <TouchableOpacity 
                key={item.id.toString()} 
                style={styles.suggestionItem} 
                onPress={() => handleSelectMovie(item.movie_id || item.id)}
              >
                <Image source={{ uri: posterUrl }} style={styles.miniPoster} />
                <Text style={styles.suggestionText} numberOfLines={1}>
                  {item.title}
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#FFD700" />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    zIndex: 999, 
    elevation: 999,
    position: 'relative',
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#2E004B', 
    borderRadius: 25, 
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF', 
  },
  suggestionsContainer: {
    position: 'absolute', 
    top: 60, 
    left: 0,
    right: 0,
    backgroundColor: '#1A002E',
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    maxHeight: 250,
    zIndex: 1000, 
    elevation: 1000, 
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.1)',
    backgroundColor: '#1A002E', 
  },
  miniPoster: {
    width: 35,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});