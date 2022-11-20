import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  const [selected, setSelected] = useState('Explore')

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <IconFormat iconName="magnify" title="Explore" selected={selected} setSelected={setSelected}/>
        <IconFormat iconName="heart-outline" title="Saved" selected={selected} setSelected={setSelected}/>
        <IconFormat iconName="account" title="Log in" selected={selected} setSelected={setSelected}/>
      </View>
    </View>
  );
}

function IconFormat({iconName, title, selected, setSelected}){
  return (
    <Pressable style={styles.icon} onPress={() => setSelected(title)}>
      <Text>
        <Icon name={iconName} size={20} color={title===selected? "#da5864":"#757675"}/>
      </Text>
      <View>
        <Text style={title===selected? styles.iconTitleClicked : styles.iconTitle}>{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderColor: "#ebebea",
    backgroundColor: 'white'
  },
  footer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 80,
    paddingLeft:5,
    paddingTop: 10
  },
  icon: {
    flex: 0.22,
    alignItems: 'center',
    textAlign: 'center'
  },
  iconTitle: {
    fontSize: 12,
    color: '#757675'
  },
  iconTitleClicked:{
    fontSize: 12
  }
});
