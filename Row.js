import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,

  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
  },
});

const Row = props => {
  const { movies, loading } = props;
  const findNumber = props.findNumber;
  if (movies) {
    return (
      <View>
        {movies.map(movie => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Details', {
                imdbID: movie.imdbID,
                title: movie.Title,
              })
            }>
            <View style={styles.row}>
              <Image source={{ uri: movie.Poster }} style={styles.image} />
              <View>
                <Text style={styles.title}>{movie.Title}</Text>
                <Text>{movie.Year}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  } else if (loading) {
    return <Text>Loading...</Text>;
  } else {
    return <Text> No results found </Text>;
  }
};

export default withNavigation(Row);
