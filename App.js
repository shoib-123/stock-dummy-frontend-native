import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import io from 'socket.io-client';

const socket = io('https://stock-dummy-production.up.railway.app');

const Item = ({name, price}) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    socket.on('crypto', cryptoData => {
      setData(cryptoData);
    });
  });

  const renderItem = ({item}) => (
    <Item name={item.name} price={Math.round(item.price * 100) / 100} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f6f6f6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
  price: {
    fontSize: 32,
  },
});

export default App;
