import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const dummyUsers = [
  { id: '1', name: 'john_doe', username: 'john_doe', image: 'https://via.placeholder.com/80', followers: '1.2K', isFollowing: false },
  { id: '2', name: 'sarah_99', username: 'sarah_99', image: 'https://via.placeholder.com/80', followers: '2.5K', isFollowing: true },
  { id: '3', name: 'tech_guy', username: 'tech_guy', image: 'https://via.placeholder.com/80', followers: '5.3K', isFollowing: false },
  { id: '4', name: 'design_pro', username: 'design_pro', image: 'https://via.placeholder.com/80', followers: '3.1K', isFollowing: true },
  { id: '5', name: 'nature_love', username: 'nature_love', image: 'https://via.placeholder.com/80', followers: '8.7K', isFollowing: false },
];

export default function SearchScreen() {
  const renderUserCard = ({ item }) => (
    <View style={styles.userCard}>
      <Image source={{ uri: item.image }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userUsername}>@{item.username}</Text>
        <Text style={styles.userFollowers}>{item.followers} followers</Text>
      </View>
      <TouchableOpacity style={[styles.followButton, item.isFollowing && styles.followingButton]}>
        <Text style={[styles.followButtonText, item.isFollowing && styles.followingButtonText]}>
          {item.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyUsers}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 },
  userCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  userImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  userInfo: { flex: 1 },
  userName: { fontWeight: 'bold', fontSize: 14 },
  userUsername: { fontSize: 12, color: '#999', marginTop: 2 },
  userFollowers: { fontSize: 12, color: '#666', marginTop: 4 },
  followButton: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#0095f6', backgroundColor: '#0095f6' },
  followingButton: { backgroundColor: '#fff', borderColor: '#dbdbdb' },
  followButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  followingButtonText: { color: '#000' },
});
