import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

const dummyStories = [
  { id: '1', name: 'Your Story', image: 'https://via.placeholder.com/150', hasStory: false },
  { id: '2', name: 'john_doe', image: 'https://via.placeholder.com/150', hasStory: true },
  { id: '3', name: 'sarah_99', image: 'https://via.placeholder.com/150', hasStory: true },
  { id: '4', name: 'tech_guy', image: 'https://via.placeholder.com/150', hasStory: true },
  { id: '5', name: 'design_pro', image: 'https://via.placeholder.com/150', hasStory: false },
];

const dummyPosts = [
  {
    id: '1',
    username: 'john_doe',
    userImage: 'https://via.placeholder.com/150',
    postImage: 'https://via.placeholder.com/600',
    likes: '1,243',
    caption: 'Beautiful sunset today! 🌅 #nature',
    liked: false,
    bookmarked: false,
    comments: 45,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    username: 'sarah_99',
    userImage: 'https://via.placeholder.com/150',
    postImage: 'https://via.placeholder.com/600',
    likes: '532',
    caption: 'Coding all night 💻✨',
    liked: false,
    bookmarked: false,
    comments: 23,
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    username: 'tech_guy',
    userImage: 'https://via.placeholder.com/150',
    postImage: 'https://via.placeholder.com/600',
    likes: '2,156',
    caption: 'New JavaScript framework released! 🎉',
    liked: false,
    bookmarked: false,
    comments: 67,
    timestamp: '6 hours ago',
  },
];

export default function App() {
  const [posts, setPosts] = useState(dummyPosts);
  const [activeTab, setActiveTab] = useState('home');

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked 
            ? (parseInt(post.likes.replace(',', '')) - 1).toLocaleString()
            : (parseInt(post.likes.replace(',', '')) + 1).toLocaleString()
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, bookmarked: !post.bookmarked };
      }
      return post;
    }));
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.userImage }} style={styles.avatarSmall} />
          <View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <Feather name="more-vertical" size={20} color="#000" />
      </View>

      {/* Post Image */}
      <Image source={{ uri: item.postImage }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity 
            style={styles.actionIcon}
            onPress={() => handleLike(item.id)}
          >
            <Feather 
              name={item.liked ? "heart" : "heart"} 
              size={24} 
              color={item.liked ? "#e31e56" : "#000"}
              fill={item.liked ? "#e31e56" : "none"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Feather name="send" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.actionIcon}
          onPress={() => handleBookmark(item.id)}
        >
          <Feather 
            name={item.bookmarked ? "bookmark" : "bookmark"} 
            size={24} 
            color={item.bookmarked ? "#000" : "#000"}
            fill={item.bookmarked ? "#000" : "none"}
          />
        </TouchableOpacity>
      </View>

      {/* Likes & Caption */}
      <View style={styles.likesSection}>
        <Text style={styles.likes}>{item.likes} likes</Text>
        <Text style={styles.comments}>{item.comments} comments</Text>
      </View>
      
      <View style={styles.captionContainer}>
        <Text style={styles.usernameBold}>{item.username}</Text>
        <Text style={styles.captionText}>{item.caption}</Text>
      </View>
    </View>
  );

  const renderStory = (story) => (
    <View key={story.id} style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.storyRingNoStory]}>
        <Image source={{ uri: story.image }} style={styles.storyImage} />
      </View>
      {story.id === '1' && (
        <View style={styles.addStoryIcon}>
          <Feather name="plus" size={16} color="#fff" />
        </View>
      )}
      <Text style={styles.storyText} numberOfLines={1}>{story.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconButton}>
            <Feather name="heart" size={24} color="#000" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton}>
            <Feather name="message-circle" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Feed */}
      {activeTab === 'home' ? (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.storiesContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {dummyStories.map((story) => renderStory(story))}
              </ScrollView>
            </View>
          }
        />
      ) : (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>Coming Soon!</Text>
          <Text style={styles.tabSubtitle}>This feature is under development</Text>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          onPress={() => setActiveTab('home')}
        >
          <Feather name="home" size={24} color={activeTab === 'home' ? '#000' : '#bbb'} />
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'search' && styles.navItemActive]}
          onPress={() => setActiveTab('search')}
        >
          <Feather name="search" size={24} color={activeTab === 'search' ? '#000' : '#bbb'} />
          <Text style={[styles.navLabel, activeTab === 'search' && styles.navLabelActive]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'add' && styles.navItemActive]}
          onPress={() => setActiveTab('add')}
        >
          <Feather name="plus-square" size={24} color={activeTab === 'add' ? '#000' : '#bbb'} />
          <Text style={[styles.navLabel, activeTab === 'add' && styles.navLabelActive]}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'likes' && styles.navItemActive]}
          onPress={() => setActiveTab('likes')}
        >
          <Feather name="heart" size={24} color={activeTab === 'likes' ? '#000' : '#bbb'} />
          <Text style={[styles.navLabel, activeTab === 'likes' && styles.navLabelActive]}>Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'profile' && styles.navItemActive]}
          onPress={() => setActiveTab('profile')}
        >
          <Feather name="user" size={24} color={activeTab === 'profile' ? '#000' : '#bbb'} />
          <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, height: 50, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb' },
  logo: { fontSize: 24, fontWeight: 'bold', fontStyle: 'italic' },
  headerIcons: { flexDirection: 'row' },
  headerIconButton: { marginLeft: 20, position: 'relative' },
  notificationBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#e31e56', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  storiesContainer: { paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb' },
  storyWrapper: { alignItems: 'center', marginHorizontal: 8 },
  storyRing: { width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: '#c13584', justifyContent: 'center', alignItems: 'center' },
  storyRingNoStory: { borderColor: '#dbdbdb' },
  storyImage: { width: 62, height: 62, borderRadius: 31 },
  storyText: { fontSize: 12, marginTop: 4, width: 70, textAlign: 'center' },
  addStoryIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#0095f6', borderRadius: 50, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  postContainer: { marginBottom: 15, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarSmall: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  username: { fontWeight: 'bold', fontSize: 14 },
  timestamp: { fontSize: 12, color: '#999', marginTop: 2 },
  postImage: { width: '100%', height: 350 },
  postActions: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  leftActions: { flexDirection: 'row' },
  actionIcon: { marginRight: 15 },
  likesSection: { flexDirection: 'row', paddingHorizontal: 10, marginBottom: 5 },
  likes: { fontWeight: 'bold', marginRight: 20 },
  comments: { color: '#999' },
  captionContainer: { flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10, flexWrap: 'wrap' },
  usernameBold: { fontWeight: 'bold', fontSize: 14, marginRight: 5 },
  captionText: { fontSize: 14, flex: 1 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: '#dbdbdb', paddingVertical: 8, paddingBottom: 15 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navItemActive: {},
  navLabel: { fontSize: 11, color: '#bbb', marginTop: 4 },
  navLabelActive: { color: '#000', fontWeight: 'bold' },
  tabContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabTitle: { fontSize: 20, fontWeight: 'bold' },
  tabSubtitle: { fontSize: 14, color: '#999', marginTop: 10 },
});
