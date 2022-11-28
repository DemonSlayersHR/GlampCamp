import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';

export default function YourTrip({ campsite, Dates }) {
  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>Dates</Text>
        <View>
          <TouchableOpacity>
            <Text
              style={{
                textDecorationLine: 'underline',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingTop: 10, marginBottom: 20 }}>
        <Text>{Dates()}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>Guests</Text>
        <View>
          <TouchableOpacity>
            <Text
              style={{
                textDecorationLine: 'underline',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingTop: 10 }}>
        <Text>1 Guest</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
