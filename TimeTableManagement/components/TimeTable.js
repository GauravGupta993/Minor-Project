import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const timetableData = [
  {
    time: '08:00 - 09:00',
    Monday: 'Math',
    Tuesday: 'Physics',
    Wednesday: 'Chemistry',
    Thursday: 'Biology',
    Friday: 'English'
  },
  {
    time: '09:00 - 10:00',
    Monday: 'English',
    Tuesday: 'Math',
    Wednesday: 'History',
    Thursday: 'Geography',
    Friday: 'Computer'
  },
  {
    time: '10:00 - 11:00',
    Monday: 'Physics',
    Tuesday: 'Chemistry',
    Wednesday: 'Math',
    Thursday: 'English',
    Friday: 'History'
  },
  {
    time: '11:00 - 12:00',
    Monday: 'Biology',
    Tuesday: 'Computer',
    Wednesday: 'Geography',
    Thursday: 'History',
    Friday: 'Math'
  }
];

const TimeTableScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Time Table</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>Time</Text>
          <Text style={[styles.cell, styles.headerCell]}>Monday</Text>
          <Text style={[styles.cell, styles.headerCell]}>Tuesday</Text>
          <Text style={[styles.cell, styles.headerCell]}>Wednesday</Text>
          <Text style={[styles.cell, styles.headerCell]}>Thursday</Text>
          <Text style={[styles.cell, styles.headerCell]}>Friday</Text>
        </View>
        {/* Data Rows */}
        {timetableData.map((slot, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{slot.time}</Text>
            <Text style={styles.cell}>{slot.Monday}</Text>
            <Text style={styles.cell}>{slot.Tuesday}</Text>
            <Text style={styles.cell}>{slot.Wednesday}</Text>
            <Text style={styles.cell}>{slot.Thursday}</Text>
            <Text style={styles.cell}>{slot.Friday}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd'
  },
  row: {
    flexDirection: 'row'
  },
  headerRow: {
    backgroundColor: '#f2f2f2'
  },
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center'
  },
  headerCell: {
    fontWeight: 'bold'
  }
});

export default TimeTableScreen;
