import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { fetchMatches } from "../utils/api"; // Fetch function for match data
import Name from "./name"; // Header component with day selection buttons
import SportSection from "./SportsSection"; // Component for displaying matches by sport

// Main screen component for the app
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sportsData: [], // Data for sports and their matches
      expandedSport: null, // Currently expanded sport section
      expandedGame: null, // Currently expanded game details
      loading: true, // Loading state for fetching data
      error: null, // Error message if data fetching fails
      selectedDay: "Today", // Currently selected day filter
    };

    // Bind methods to this component instance
    this.toggleExpand = this.toggleExpand.bind(this);
    this.toggleGameStats = this.toggleGameStats.bind(this);
  }

  // Fetch data for the initially selected day when the component mounts
  async componentDidMount() {
    await this.fetchAndFilterMatches("Today");
  }

  // Fetch and filter match data based on the selected day
  fetchAndFilterMatches = async (day) => {
    try {
      this.setState({ loading: true }); // Show loading indicator
      const matches = await fetchMatches(); // Fetch matches from API
      const sportsData = [
        {
          id: "1",
          sport: "Soccer", // it  only fetchs Soccer matches
          games: matches.filter((game) => game.category === day), // Filter by selected day
        },
      ];
      this.setState({ sportsData, selectedDay: day, loading: false }); // Update state
    } catch (error) {
      console.error("Error fetching matches:", error); // Log the error
      this.setState({
        error: "Failed to load matches. Please try again.", // Show error message
        loading: false,
      });
    }
  };

  // Handle day filter changes (Yesterday, Today, Tomorrow)
  handleDayChange = (day) => {
    this.fetchAndFilterMatches(day); // Refetch matches for the selected day
  };

  // Toggle the visibility of a sport section
  toggleExpand(sportId) {
    this.setState((prevState) => ({
      expandedSport: prevState.expandedSport === sportId ? null : sportId,
    }));
  }

  // Toggle the visibility of detailed game stats
  toggleGameStats(gameId) {
    this.setState((prevState) => ({
      expandedGame: prevState.expandedGame === gameId ? null : gameId,
    }));
  }

  render() {
    const {
      sportsData,
      expandedSport,
      expandedGame,
      loading,
      error,
      selectedDay,
    } = this.state;

    // Shows a loading spinner while data is being fetched
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2a9df4" />
        </View>
      );
    }

    // Shows an error message if data fetching fails
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* Header with app name and day selection buttons */}
        <Name
          size={30}
          backgroundColor="#2a9df4"
          appName="StatScout"
          onDayChange={this.handleDayChange}
          selectedDay={selectedDay}
        />
        {/* Display matches or a message if no data is available */}
        {sportsData[0]?.games?.length ? (
          <FlatList
            data={sportsData} // Data for the FlatList
            keyExtractor={(item) => item.id} // Unique key for each item
            renderItem={({ item }) => (
              <SportSection
                sport={item.sport}
                games={item.games}
                isExpanded={expandedSport === item.id}
                onPress={() => this.toggleExpand(item.id)}
                expandedGame={expandedGame}
                onToggleGame={this.toggleGameStats}
              />
            )}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              No matches available for {selectedDay.toLowerCase()}. Please check
              back later.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

// Styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
