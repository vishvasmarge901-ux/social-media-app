import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const dummyProfilePosts = [
  { id: '1', image: 'https://via.placeholder.com/150', likes: '1,243' },
  { id: '2', image: 'https://via.placeholder.com/150', likes: '532' },
  { id: '3', image: 'https://via.placeholder.com/150', likes: '2,156' },
  { id: '4', image: 'https://via.placeholder.com/150', likes: '876' },
  { id: '5', image: 'https://via.placeholder.com/150', likes: '1,432' },
  { id: '6', image: 'https://via.placeholder.com/150', likes: '654' },
];

export default function ProfileScreen() {
  const [postsTab, setPostsTab] = useState('posts');

  const renderPost = ({ item }) => (
    <View style={styles.postGridItem}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postOverlay}>
        <Text style={styles.postLikes}>❤️ {item.likes}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>45.3K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>234</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.bioSection}>
        <Text style={styles.displayName}>Vishvas Marge</Text>
        <Text style={styles.username}>@vishvas_marge</Text>
        <Text style={styles.bio}>Full-stack developer | Tech enthusiast | Always learning 📚</Text>
        <Text style={styles.website}>www.vishvasmarge.com</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, postsTab === 'posts' && styles.tabActive]}
          onPress={() => setPostsTab('posts')}
        >
          <Feather name="grid" size={20} color={postsTab === 'posts' ? '#000' : '#bbb'} />
          <Text style={[styles.tabText, postsTab === 'posts' && styles.tabTextActive]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, postsTab === 'saved' && styles.tabActive]}
          onPress={() => setPostsTab('saved')}
        >
          <Feather name="bookmark" size={20} color={postsTab === 'saved' ? '#000' : '#bbb'} />
          <Text style={[styles.tabText, postsTab === 'saved' && styles.tabTextActive]}>Saved</Text>
        </TouchableOpacity>
      </View>

      {/* Posts Grid */}
      <View style={styles.postsGrid}>
        <FlatList
          data={dummyProfilePosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, height: 50, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb' },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  profileSection: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 20, alignItems: 'flex-start' },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginRight: 20 },
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNumber: { fontWeight: 'bold', fontSize: 16 },
  statLabel: { fontSize: 12, color: '#999', marginTop: 4 },
  bioSection: { paddingHorizontal: 15, marginBottom: 15 },
  displayName: { fontWeight: 'bold', fontSize: 16 },
  username: { fontSize: 13, color: '#999', marginTop: 2 },
  bio: { fontSize: 13, marginTop: 8, lineHeight: 18 },
  website: { fontSize: 13, color: '#0095f6', marginTop: 8 },
  editButton: { marginHorizontal: 15, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 8, paddingVertical: 8, alignItems: 'center', marginBottom: 15 },
  editButtonText: { fontWeight: 'bold', fontSize: 14 },
  tabsContainer: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#dbdbdb', marginHorizontal: 15 },
  tab: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12 },
  tabActive: { borderBottomWidth: 1, borderBottomColor: '#000' },
  tabText: { fontSize: 12, color: '#bbb', marginLeft: 8 },
  tabTextActive: { color: '#000', fontWeight: 'bold' },
  postsGrid: { paddingHorizontal: 2 },
  columnWrapper: { justifyContent: 'space-between', paddingHorizontal: 2 },
  postGridItem: { width: '32%', aspectRatio: 1, marginBottom: 3, borderRadius: 4, overflow: 'hidden', position: 'relative' },
  postImage: { width: '100%', height: '100%' },
  postOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  postLikes: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
});
