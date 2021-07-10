import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Button,
} from '@ui-kitten/components';

const typeData = ['Dog', 'Cat'];

const AddPet = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = typeData[selectedIndex.row];

  const renderOption = (title, index) => (
    <SelectItem key={index} title={title} />
  );

  return (
    <View style={styles.container}>
      <Input label="Name" />
      <Input style={styles.topMargin} label="Age" keyboardType="numeric" />
      <Select
        style={styles.topMargin}
        label="Type"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {typeData.map(renderOption)}
      </Select>
      <Input style={styles.topMargin} label="Breed" />
      <Input
        style={styles.topMargin}
        label="Height"
        keyboardType="numeric"
        caption="height should be in inches"
      />
      <Input
        style={styles.topMargin}
        label="Weight"
        keyboardType="numeric"
        caption="weight should be in kilogram"
      />
      <Button style={styles.topMargin}>SUBMIT</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F7F9FC',
  },
  topMargin: {
    marginTop: 10,
  },
});

export default AddPet;
