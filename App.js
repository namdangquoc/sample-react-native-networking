import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux';

import VoteScreen from './screens/VoteScreen'
import BreedsScreen from './screens/BreedsScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import FavouritesScreen from './screens/FavouritesScreen'
import ImagesScreen from './screens/ImagesScreen'
import UploadScreen from './screens/UploadScreen'

const TabIcon = ({ selectd, title }) => {
  return (
    <Text style={{ color: selectd ? 'red' : 'black' }}>{title}</Text>
    // <View style={{ width: 100, height: 3, backgroundColor: selectd ? 'red' : 'black' }} />
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}>
          <Scene
            key="vote"
            icon={TabIcon}>
            <Scene
              key="vote"
              component={VoteScreen}
              title="Vote"
            />
          </Scene>
          <Scene
            key="breeds"
            icon={TabIcon}>
            <Scene
              key="breeds"
              component={BreedsScreen}
              title="Breeds"
            />
          </Scene>
          <Scene
            key="categories"
            icon={TabIcon}>
            <Scene
              key="categories"
              component={CategoriesScreen}
              title="Categories"
            />
          </Scene>
          <Scene
            key="favourites"
            icon={TabIcon}>
            <Scene
              key="favourites"
              component={FavouritesScreen}
              title="Favourites"
            />
          </Scene>
          <Scene
            key="images"
            icon={TabIcon}>
            <Scene
              key="images"
              component={ImagesScreen}
              title="Images"
            />
          </Scene>
          <Scene
            key="upload"
            icon={TabIcon}>
            <Scene
              key="upload"
              title="false"
              component={UploadScreen}
              hideNavBar={true}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default App;
