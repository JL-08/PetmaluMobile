import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Menu,
  MenuGroup,
  MenuItem,
  Input,
  Text,
  Modal,
  Card,
} from '@ui-kitten/components';
import ContentTitle from './ContentTitle';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const SearchIcon = () => (
  <Icon style={{marginLeft: 10}} name="search" size={20} color="#888" />
);

import {getAllFaqs} from '../../actions/faqsActions';

const FAQs = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [faqsList, setFaqsList] = React.useState();
  const [searchInput, setSearchInput] = React.useState();
  const faqs = useSelector(state => state.faq.faqsData);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllFaqs(setIsLoading));
  }, []);

  useEffect(() => {
    setFaqsList(faqs);
  }, [faqs]);

  useEffect(() => {
    if (searchInput === '') {
      setFaqsList(faqs);
    }
  }, [searchInput]);

  const handleSearch = e => {
    const filteredList = faqs.filter(f =>
      f.question.toLowerCase().includes(e.toLowerCase()),
    );

    setSearchInput(e);
    setFaqsList(filteredList);
  };

  return (
    <View style={styles.container}>
      <ContentTitle title="Frequently Asked Questions" />
      <Input
        style={styles.searchBar}
        value={searchInput}
        placeholder="Search"
        accessoryLeft={SearchIcon}
        onChangeText={e => handleSearch(e)}
      />
      <Menu
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {faqsList &&
          faqsList.map(faq => (
            <MenuGroup key={faq.id} title={faq.question}>
              <MenuItem title={faq.answer} />
            </MenuGroup>
          ))}
      </Menu>

      <Modal visible={isLoading}>
        <Card disabled={true}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F7F9FC',
    flex: 1,
  },
  searchBar: {
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: 'white',
  },
});

export default FAQs;
