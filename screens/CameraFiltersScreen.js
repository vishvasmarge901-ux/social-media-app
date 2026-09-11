import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated, PanResponder, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const filters = [
  { id: 1, name: 'Normal', icon: '🟡', effect: 'normal' },
  { id: 2, name: 'Sepia', icon: '📷', effect: 'sepia' },
  { id: 3, name: 'Black & White', icon: '⬜', effect: 'bw' },
  { id: 4, name: 'Vintage', icon: '🎬', effect: 'vintage' },
  { id: 5, name: 'Cool', icon: '❄️', effect: 'cool' },
  { id: 6, name: 'Warm', icon: '🔥', effect: 'warm' },
];

const stickers = [
  { id: 1, emoji: '😂' },
  { id: 2, emoji: '🔥' },
  { id: 3, emoji: '❤️' },
  { id: 4, emoji: '😍' },
  { id: 5, emoji: '🎉' },
  { id: 6, emoji: '💯' },
  { id: 7, emoji: '🌟' },
  { id: 8, emoji: '😎' },
];

export default function CameraFiltersScreen() {
  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [showFilters, setShowFilters] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [showText, setShowText] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera Preview with Filter */}
      <View style={[styles.cameraPreview, { backgroundColor: selectedFilter === 'bw' ? '#333' : '#000' }]} />

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="flash" size={28} color="#FFFC00" />
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterBtn, selectedFilter === filter.effect && styles.filterBtnActive]}
              onPress={() => setSelectedFilter(filter.effect)}
            >
              <Text style={styles.filterIcon}>{filter.icon}</Text>
              <Text style={styles.filterName}>{filter.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Stickers Panel */}
      {showStickers && (
        <View style={styles.stickersPanel}>
          {stickers.map(sticker => (
            <TouchableOpacity key={sticker.id} style={styles.stickerBtn}>
              <Text style={styles.stickerEmoji}>{sticker.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={[styles.controlBtn, showFilters && styles.controlBtnActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialCommunityIcons name="palette" size={28} color={showFilters ? '#FFFC00' : '#fff'} />
          <Text style={styles.controlLabel}>Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlBtn, showStickers && styles.controlBtnActive]}
          onPress={() => setShowStickers(!showStickers)}
        >
          <MaterialCommunityIcons name="sticker-emoji" size={28} color={showStickers ? '#FFFC00' : '#fff'} />
          <Text style={styles.controlLabel}>Stickers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlBtn, showText && styles.controlBtnActive]}
          onPress={() => setShowText(!showText)}
        >
          <MaterialCommunityIcons name="text" size={28} color={showText ? '#FFFC00' : '#fff'} />
          <Text style={styles.controlLabel}>Text</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraPreview: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topControls: { position: 'absolute', top: 20, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
  filtersPanel: { position: 'absolute', bottom: 80, left: 0, right: 0, height: 100, flexDirection: 'row', paddingHorizontal: 10, gap: 8, backgroundColor: 'rgba(0,0,0,0.8)' },
  filterBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)' },
  filterBtnActive: { backgroundColor: 'rgba(255,252,0,0.3)', borderWidth: 2, borderColor: '#FFFC00' },
  filterIcon: { fontSize: 28 },
  filterName: { fontSize: 10, color: '#fff', marginTop: 4 },
  stickersPanel: { position: 'absolute', bottom: 80, left: 0, right: 0, height: 100, flexDirection: 'row', paddingHorizontal: 10, gap: 8, backgroundColor: 'rgba(0,0,0,0.8)' },
  stickerBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  stickerEmoji: { fontSize: 36 },
  bottomControls: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: 'rgba(0,0,0,0.5)', borderTopWidth: 0.5, borderTopColor: '#333' },
  controlBtn: { alignItems: 'center', padding: 10 },
  controlBtnActive: {},
  controlLabel: { fontSize: 11, color: '#fff', marginTop: 4 },
});
