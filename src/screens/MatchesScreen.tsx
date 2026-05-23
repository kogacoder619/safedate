import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppStore } from '../store/appStore';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function MatchesScreen() {
  const matches = useAppStore((s) => s.matches);
  const navigation = useNavigation<Nav>();

  if (matches.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No matches yet.</Text>
        <Text style={styles.emptySubtext}>Keep swiping!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={matches}
      keyExtractor={(m) => m.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Chat', { matchId: item.id })}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color="#ccc" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.name}>{item.profile.name}</Text>
            <Text style={styles.preview}>{item.lastMessage?.text ?? 'Say hello!'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, gap: 12, elevation: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center' },
  rowText: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#222' },
  preview: { fontSize: 13, color: '#888', marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 20, fontWeight: '600', color: '#444' },
  emptySubtext: { fontSize: 15, color: '#888', marginTop: 8 },
});
