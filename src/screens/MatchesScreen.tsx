import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppStore } from '../store/appStore';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function MatchesScreen() {
  const matches = useAppStore((s) => s.matches);
  const backgroundChecks = useAppStore((s) => s.backgroundChecks);
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
      renderItem={({ item }) => {
        const checked = !!backgroundChecks[item.id];
        return (
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Chat', { matchId: item.id })}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color="#ccc" />
            </View>
            <View style={styles.rowText}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.profile.name}</Text>
                {checked && <Ionicons name="shield-checkmark" size={15} color="#4caf50" />}
              </View>
              <Text style={styles.preview}>{item.lastMessage?.text ?? 'Say hello!'}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('BackgroundCheck', { matchId: item.id, profileName: item.profile.name })}
              style={styles.safetyBtn}
            >
              <Ionicons name="shield" size={20} color={checked ? '#4caf50' : '#bbb'} />
            </TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, gap: 12, elevation: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center' },
  rowText: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  name: { fontSize: 16, fontWeight: '600', color: '#222' },
  preview: { fontSize: 13, color: '#888', marginTop: 2 },
  safetyBtn: { padding: 4 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 20, fontWeight: '600', color: '#444' },
  emptySubtext: { fontSize: 15, color: '#888', marginTop: 8 },
});
