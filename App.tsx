import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HotUpdater} from '@hot-updater/react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.box}>
        <Text style={styles.title}>HotUpdater Debug UI v4</Text>
        <Text style={styles.desc}>App đang chạy bình thường.</Text>
        <Text style={styles.desc}>Nếu có bản mới, fallback sẽ hiện lên tự động.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  box: {padding: 20, alignItems: 'center'},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 16},
  desc: {fontSize: 14, color: '#555', textAlign: 'center', marginTop: 8},
});

export default HotUpdater.wrap({
  baseURL:
    'https://hot-updater-api.phamvancuong-devpro.workers.dev/api/check-update',
  updateStrategy: 'appVersion',
  requestHeaders: {},
  
  fallbackComponent: ({progress, status}) => (
    <View
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
        {status === 'UPDATING' ? 'Đang cập nhật...' : 'Đang kiểm tra...'}
      </Text>
      {progress > 0 ? (
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          {Math.round(progress * 100)}%
        </Text>
      ) : null}
    </View>
  ),
})(App);