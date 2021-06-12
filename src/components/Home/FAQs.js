import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Menu, MenuGroup, MenuItem, Input, Text} from '@ui-kitten/components';
import ContentTitle from './ContentTitle';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const SearchIcon = () => (
  <Icon style={{marginLeft: 10}} name="search" size={20} color="#888" />
);

const SearchBar = () => (
  <Input
    style={styles.searchBar}
    placeholder="Search"
    accessoryLeft={SearchIcon}
  />
);

const FAQs = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <View style={styles.container}>
      <ContentTitle title="Frequently Asked Questions" />
      <SearchBar />
      <Menu
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <MenuGroup title="Lorem ipsum dolor sit amet,">
          <MenuItem title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis nisl, sodales ut semper non, iaculis et enim. Nunc sit amet felis ac lacus condimentum posuere at fringilla risus. Pellentesque interdum urna vitae ex luctus sollicitudin. Cras vulputate in lacus at euismod. Integer eleifend ex in feugiat iaculis. Vivamus interdum sit amet eros ac ultrices. Sed urna sem, posuere eget dapibus a, venenatis sed erat. Mauris dictum venenatis arcu, eget suscipit mi faucibus non. Morbi efficitur elit id ante placerat sollicitudin vel eu lacus. Nunc ut tortor vulputate, iaculis tellus non, pretium sapien." />
        </MenuGroup>
        <MenuGroup title="Lorem ipsum dolor sit amet,">
          <MenuItem title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis nisl, sodales ut semper non, iaculis et enim. Nunc sit amet felis ac lacus condimentum posuere at fringilla risus. Pellentesque interdum urna vitae ex luctus sollicitudin. Cras vulputate in lacus at euismod. Integer eleifend ex in feugiat iaculis. Vivamus interdum sit amet eros ac ultrices. Sed urna sem, posuere eget dapibus a, venenatis sed erat. Mauris dictum venenatis arcu, eget suscipit mi faucibus non. Morbi efficitur elit id ante placerat sollicitudin vel eu lacus. Nunc ut tortor vulputate, iaculis tellus non, pretium sapien." />
        </MenuGroup>
        <MenuGroup title="Lorem ipsum dolor sit amet,">
          <MenuItem title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis nisl, sodales ut semper non, iaculis et enim. Nunc sit amet felis ac lacus condimentum posuere at fringilla risus. Pellentesque interdum urna vitae ex luctus sollicitudin. Cras vulputate in lacus at euismod. Integer eleifend ex in feugiat iaculis. Vivamus interdum sit amet eros ac ultrices. Sed urna sem, posuere eget dapibus a, venenatis sed erat. Mauris dictum venenatis arcu, eget suscipit mi faucibus non. Morbi efficitur elit id ante placerat sollicitudin vel eu lacus. Nunc ut tortor vulputate, iaculis tellus non, pretium sapien." />
        </MenuGroup>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  searchBar: {
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
  },
});

export default FAQs;
