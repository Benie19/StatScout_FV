import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

const SportSection = ({
  sport,
  games,
  isExpanded,
  onPress,
  expandedGame,
  onToggleGame,
}) => {
  return (
    <View style={styles.container}>
      {/* Sport Header */}
      <TouchableOpacity onPress={onPress} style={styles.header}>
        <Text style={styles.headerText}>{sport.toUpperCase()}</Text>
      </TouchableOpacity>

      {/* Games List */}
      {isExpanded && (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onToggleGame(item.id)}
              style={styles.gameContainer}
            >
              {/* Row for Home vs Away Teams */}
              <View style={styles.teamRow}>
                {/* Home Team */}
                <View style={styles.team}>
                  <Image
                    source={{ uri: item.home.crest }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.teamName}>{item.home.name}</Text>
                </View>
                <Text style={styles.vsText}>vs</Text>
                {/* Away Team */}
                <View style={styles.team}>
                  <Image
                    source={{ uri: item.away.crest }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.teamName}>{item.away.name}</Text>
                </View>
              </View>
              {/* Additional Game Details */}
              <Text style={styles.gameDetails}>
                {item.score} | {item.time} | {item.venue}
              </Text>
              {/* Expanded Game Stats */}
              {expandedGame === item.id && (
                <Text style={styles.expandedDetails}>
                  Detailed stats can go here.
                </Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    backgroundColor: "#2a9df4",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  gameContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  team: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  vsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  gameDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  expandedDetails: {
    marginTop: 5,
    fontSize: 12,
    color: "#777",
  },
});

export default SportSection;
