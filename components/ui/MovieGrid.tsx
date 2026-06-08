import React, { useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native';

interface Movie {
  id: string;
  movie_id?: string;
  title: string;
  image: string;
  rating?: number;
}

interface MovieGridProps {
  title: string;
  data: Movie[];
  showRatings?: boolean;
  showRanking?: boolean;
  showTitle?: boolean;
}

export default function MovieGrid({ title, data, showRatings = false, showRanking = false, showTitle = true }: MovieGridProps) {
  const { width } = useWindowDimensions();

  const numColumns = useMemo(() => {
    if (width < 500) return 2;
    if (width < 900) return 3;
    return 4;
  }, [width]);

  const cardWidth = useMemo(() => {
    const padding = 20;
    return (width - padding) / numColumns - 10;
  }, [width, numColumns]);

  return (
    <View style={styles.container}>
      {showTitle && <Text style={styles.sectionTitle}>{title}</Text>}
      <FlatList
        key={`grid-${numColumns}`}
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <View style={styles.cardContent}>
              {showRanking && (
                <View style={styles.rankingNumber}>
                  <Text style={styles.rankingText}>{index + 1}</Text>
                </View>
              )}
              <View style={styles.posterWrapper}>
                <View style={styles.posterContainer}>
                  <Image source={{ uri: item.image }} style={styles.poster} />
                  {showRatings && item.rating !== undefined && (
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>{item.rating}⭐</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
              </View>
            </View>
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
  listContent: { paddingLeft: 10, paddingRight: 10 },
  columnWrapper: { justifyContent: 'flex-start', marginBottom: 10 },
  card: { alignItems: 'center' },
  cardContent: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' },
  rankingNumber: {
    width: 32,
    paddingTop: 8,
    paddingRight: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rankingText: { color: '#FFD700', fontSize: 32, fontWeight: 'bold' },
  posterWrapper: { alignItems: 'center' },
  posterContainer: { position: 'relative' },
  poster: { width: 130, height: 190, borderRadius: 15, backgroundColor: '#222' },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#8d41e4',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 36,
    alignItems: 'center',
  },
  ratingText: { color: '#000', fontSize: 12, fontWeight: 'bold' },
  movieTitle: { color: '#E0E0E0', fontSize: 13, marginTop: 10, textAlign: 'center', width: 130 }
});
