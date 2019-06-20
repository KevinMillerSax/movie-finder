import React from 'react';
// import {search, movie} from './mockData';
import Row from './Row';
import DetailsScreen from './DetailsScreen';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import { fetchMovies } from './api';
import { Constants } from 'expo';

class HomeScreen extends React.Component {
  state = {
    movies: null,
    search: '',
    loading: false,
  };

  static navigationOptions = {
    title: 'Movies, TV, Games',
  };

  updateSearch = async text => {
    console.log(text);
    await this.setState({ search: text, loading: true });
    await this.getMovies();
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const results = await fetchMovies(this.state.search);
    this.setState({ movies: results });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SearchBar
          containerStyle={{ borderWidth: 1, borderRadius: 8 }}
          placeholder="Search by Title"
          onChangeText={this.updateSearch}
          value={this.state.search}
        />

        <Row movies={this.state.movies} loading={this.state.loading} />
      </ScrollView>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
});
