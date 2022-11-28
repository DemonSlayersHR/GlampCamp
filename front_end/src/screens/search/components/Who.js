import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

export default function Who({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  pets,
  setPets,
}) {
  return (
    <Pressable style={[styles.container, styles.shadow]}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Who's coming?</Text>
      <View style={{ marginTop: 10 }}>
        <Count
          title='Adults'
          subtitle='Ages 13 or above'
          state={adults}
          setState={setAdults}
        />
        <Count
          title='Children'
          subtitle='Ages 2-12'
          state={children}
          setState={setChildren}
        />
        <Count
          title='Infants'
          subtitle='Under 2'
          state={infants}
          setState={setInfants}
        />
        <Pet
          title='Pets'
          subtitle='Bringing a service animal?'
          state={pets}
          setState={setPets}
        />
      </View>
    </Pressable>
  );
}

function Count({ title, subtitle, state, setState }) {
  return (
    <View style={styles.countContainer}>
      <View>
        <Text style={{ fontWeight: 'semibold' }}>{title}</Text>
        <Text style={{ fontSize: 13, color: 'gray' }}>{subtitle}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {state === 0 ? (
          <Pressable style={styles.minusBtn}>
            <Text style={{ color: 'gray' }}>-</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.minusBtn}
            onPress={() => setState(state - 1)}>
            <Text>-</Text>
          </Pressable>
        )}
        <Text style={styles.state}>{state}</Text>
        <Pressable style={styles.addBtn} onPress={() => setState(state + 1)}>
          <Text>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Pet({ title, subtitle, state, setState }) {
  return (
    <View style={styles.petCountContainer}>
      <View>
        <Text style={{ fontWeight: 'semibold' }}>{title}</Text>
        <Text
          style={{
            fontSize: 13,
            color: 'gray',
            textDecorationLine: 'underline',
          }}>
          {subtitle}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {state === 0 ? (
          <Pressable style={styles.minusBtn}>
            <Text style={{ color: 'gray' }}>-</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.minusBtn}
            onPress={() => setState(state - 1)}>
            <Text>-</Text>
          </Pressable>
        )}
        <Text style={styles.state}>{state}</Text>
        <Pressable style={styles.addBtn} onPress={() => setState(state + 1)}>
          <Text>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 25,
    height: 295,
    padding: 20,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  countContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, .1)',
  },
  petCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingBottom: 10,
  },
  addBtn: {
    position: 'absolute',
    right: 0,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: 'rgba(0, 0, 0, .3)',
    width: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusBtn: {
    position: 'absolute',
    right: 0,
    marginRight: 60,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: 'rgba(0, 0, 0, .3)',
    width: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  state: {
    position: 'absolute',
    right: 0,
    marginRight: 39,
  },
});
