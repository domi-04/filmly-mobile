import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      {/* Gold Search Icon */}
      <Ionicons name="search" size={20} color="#FFD700" style={styles.icon} />
      <TextInput 
        style={styles.input} 
        placeholder="Search movies, actors..." 
        placeholderTextColor="#aaa" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});