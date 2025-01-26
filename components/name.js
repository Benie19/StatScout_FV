import { StyleSheet, Text, View, Pressable } from "react-native";
import PropTypes from "prop-types";
import React from "react";

export default function Name({
  size,
  backgroundColor,
  appName,
  onDayChange,
  selectedDay,
}) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.appName, { fontSize: size }]}>{appName}</Text>

        <Pressable style={styles.searchIcon}>
          <Text>🔍</Text>
        </Pressable>
      </View>

      {/* Day Selector */}
      <View style={styles.gameDaySelector}>
        {["Yesterday", "Today", "Tomorrow"].map((day) => (
          <Pressable
            key={day}
            style={[
              styles.dayButton,
              day === selectedDay && styles.selectedDayButton,
            ]}
            onPress={() => onDayChange(day)}
          >
            <Text
              style={[
                styles.dayText,
                day === selectedDay && styles.selectedDayText,
              ]}
            >
              {day}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

Name.propTypes = {
  size: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  onDayChange: PropTypes.func.isRequired,
  selectedDay: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    backgroundColor: "#2a9df4",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  appName: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  searchIcon: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  gameDaySelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginHorizontal: 5,
    elevation: 3,
  },
  selectedDayButton: {
    backgroundColor: "#2a9df4",
  },
  dayText: {
    fontSize: 14,
    color: "#2a9df4",
    fontWeight: "600",
  },
  selectedDayText: {
    color: "#ffffff",
  },
});
