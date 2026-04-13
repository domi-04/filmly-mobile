import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

interface Movie {
  id: string;
  title: string;
  image: string;
}

interface MovieRowProps {
  title: string;
  data: Movie[];
}

export default function MovieRow({ title, data }: MovieRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList 
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.poster} />
            <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 30 },
  sectionTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContent: { paddingLeft: 20, paddingRight: 10 },
  card: { marginRight: 18, width: 130 },
  poster: { width: 130, height: 190, borderRadius: 15, backgroundColor: '#222' },
  movieTitle: { color: '#E0E0E0', fontSize: 13, marginTop: 10, textAlign: 'center' }
});