import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { api } from '@packages/backend/convex/_generated/api';

export default function DashboardScreen() {
  const { user } = useUser();
  const hello = useQuery(api.example.hello);
  const currentUser = useQuery(api.example.getCurrentUser);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Clerk User:</Text>
          <Text style={styles.cardText}>Name: {user?.fullName || user?.firstName || 'Not set'}</Text>
          <Text style={styles.cardText}>Email: {user?.emailAddresses[0]?.emailAddress}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Convex Query:</Text>
          <Text style={styles.cardText}>{hello || 'Loading...'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Convex + Clerk Integration:</Text>
          {currentUser ? (
            <>
              <Text style={styles.cardText}>User ID: {currentUser.userId}</Text>
              <Text style={styles.cardText}>Name: {currentUser.name}</Text>
              <Text style={styles.cardText}>Email: {currentUser.email}</Text>
            </>
          ) : (
            <Text style={styles.cardText}>Loading user data from Convex...</Text>
          )}
        </View>

        <View style={styles.successBox}>
          <Text style={styles.successText}>
            ✅ Authentication is working (you're signed in{'\n'}
            ✅ Convex is connected and responding{'\n'}
            ✅ Type safety is working (imports from backend){'\n'}
            {'\n'}
            You can now start building your app!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  successBox: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  successText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
