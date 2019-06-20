import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { fetchDetails } from './api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 6,
    //alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    height: 300,
    width: 300,
    flex: 1,
    marginLeft: 28,
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

class DetailsScreen extends React.Component {
  state = {
    movie: null,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title'),
    };
  };

  componentDidMount() {
    this.getDetails();
  }

  processRating() {
    const {movie} = this.state
    const tomatoes = movie.Ratings.find(rating => rating.Source === 'Rotten Tomatoes' )
    if (tomatoes) return tomatoes.Value
    else return false
  }

  getDetails = async () => {
    const { navigation } = this.props;
    const imdbID = navigation.getParam('imdbID', 'a string');
    const results = await fetchDetails(imdbID);
    this.setState({ movie: results });
  };

  render() {
    if (this.state.movie) {
      return (
        <ScrollView style={styles.container}>
          <Image
            source={{ uri: this.state.movie.Poster }}
            style={styles.image}
          />

          <Text style={styles.text}>
            Directed By: {this.state.movie.Director}
          </Text>
          <Text style={styles.text}>Released: {this.state.movie.Year}</Text>
          <Text style={styles.text}>Rated: {this.state.movie.Rated}</Text>
          <Text style={styles.text}>Actors: {this.state.movie.Actors}</Text>

          <Text>
            Rotten Tomatoes Rating: {this.processRating() || "N/A"}
          </Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              borderTopColor: 'black',
              borderTopWidth: 1,
              height: 40,
            }}>
            <View
              style={{
                flex: 1,
                marginTop: 5,
                width: `${this.processRating() || '0%'}`,
                height: 30,
                backgroundColor: 'green',
                marginBottom: 5,
              }}
            />
          </View>

          <Text> {this.state.movie.Plot}</Text>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>finding the movie details</Text>
        </View>
      );
    }
  }
}

export default withNavigation(DetailsScreen);

//use this. when using a class, otherwise, you can't use .this, like, in a function
