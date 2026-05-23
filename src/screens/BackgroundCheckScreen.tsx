import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { garboApi } from '../api';
import { useAppStore } from '../store/appStore';
import { GarboResult, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'BackgroundCheck'>;

export default function BackgroundCheckScreen({ route }: Props) {
  const { matchId, profileName } = route.params;
  const { backgroundChecks, addBackgroundCheck } = useAppStore();
  const existing = backgroundChecks[matchId];

  const [firstName, setFirstName] = useState(profileName.split(' ')[0]);
  const [lastName, setLastName] = useState(profileName.split(' ').slice(1).join(' '));
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await garboApi.search({ firstName, lastName, city: city || undefined, state: state || undefined });
      addBackgroundCheck(matchId, result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (existing) {
    return <Results result={existing} name={`${firstName} ${lastName}`} onRerun={() => addBackgroundCheck(matchId, null as any)} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Background Check</Text>
      <Text style={styles.sub}>Powered by Garbo — searches public criminal records, violent crime history, and the national sex offender registry.</Text>

      <Text style={styles.label}>First name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

      <Text style={styles.label}>Last name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

      <Text style={styles.label}>City (optional)</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="e.g. San Francisco" />

      <Text style={styles.label}>State (optional)</Text>
      <TextInput style={styles.input} value={state} onChangeText={setState} placeholder="e.g. CA" maxLength={2} autoCapitalize="characters" />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]} onPress={run} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Run Check</Text>}
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        Results are based on publicly available records. Always use your own judgment when meeting someone new.
      </Text>
    </ScrollView>
  );
}

function Results({ result, name, onRerun }: { result: GarboResult; name: string; onRerun: () => void }) {
  const allClear = !result.sexOffenderHit && result.violentCrimes.length === 0 && result.otherRecords.length === 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Results for {name}</Text>
      <Text style={styles.checkedAt}>Checked {new Date(result.checkedAt).toLocaleDateString()}</Text>

      <View style={[styles.summaryCard, { borderColor: allClear ? '#4caf50' : '#e53935' }]}>
        <Ionicons
          name={allClear ? 'shield-checkmark' : 'warning'}
          size={36}
          color={allClear ? '#4caf50' : '#e53935'}
        />
        <Text style={[styles.summaryText, { color: allClear ? '#4caf50' : '#e53935' }]}>
          {allClear ? 'No records found' : 'Records found — review below'}
        </Text>
      </View>

      <ResultSection
        title="Sex Offender Registry"
        hit={result.sexOffenderHit}
        items={result.sexOffenderHit ? ['Listed on the national sex offender registry'] : []}
      />
      <ResultSection title="Violent Crime History" hit={result.violentCrimes.length > 0} items={result.violentCrimes} />
      <ResultSection title="Other Public Records" hit={result.otherRecords.length > 0} items={result.otherRecords} />

      <TouchableOpacity style={styles.rerunBtn} onPress={onRerun}>
        <Text style={styles.rerunText}>Run again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ResultSection({ title, hit, items }: { title: string; hit: boolean; items: string[] }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={hit ? 'close-circle' : 'checkmark-circle'} size={18} color={hit ? '#e53935' : '#4caf50'} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {items.map((item, i) => (
        <Text key={i} style={styles.record}>• {item}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  heading: { fontSize: 22, fontWeight: '700', color: '#222', marginBottom: 8 },
  sub: { fontSize: 13, color: '#888', marginBottom: 24, lineHeight: 19 },
  checkedAt: { fontSize: 13, color: '#aaa', marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#888', marginBottom: 4, marginTop: 14 },
  input: { fontSize: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, color: '#222', backgroundColor: '#fafafa' },
  error: { color: '#e53935', fontSize: 14, marginTop: 8 },
  btn: { marginTop: 24, backgroundColor: '#4caf50', paddingVertical: 14, borderRadius: 24, alignItems: 'center' },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  disclaimer: { marginTop: 20, fontSize: 12, color: '#bbb', textAlign: 'center', lineHeight: 17 },
  summaryCard: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 2, borderRadius: 14, padding: 16, marginBottom: 24 },
  summaryText: { fontSize: 17, fontWeight: '700' },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  record: { fontSize: 14, color: '#555', marginLeft: 24, marginTop: 2 },
  rerunBtn: { alignItems: 'center', marginTop: 8 },
  rerunText: { color: '#4caf50', fontSize: 14 },
});
