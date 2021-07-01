import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  IndexPath,
  Select,
  SelectItem,
  Input,
  Button,
  Text,
} from '@ui-kitten/components';
import ContentTitle from './ContentTitle';

const petTypes = ['Dog', 'Cat'];

const Calculator = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [height, setHeight] = React.useState();
  const [weight, setWeight] = React.useState();
  const [ribCage, setRibCage] = React.useState();
  const [legLength, setLegLength] = React.useState();
  const [BMI, setBMI] = React.useState(0);

  useEffect(() => {
    setHeight(null);
    setWeight(null);
    setRibCage(null);
    setLegLength(null);
    setBMI(0);
  }, [selectedIndex]);

  const calculateBCS = () => {
    const lbs = weight * 2.205;
    const BMI = (lbs * 703) / (height * height);
    setBMI(BMI);
  };

  const displayBMI = () => {
    if (BMI === 0) {
      return '';
    }

    if (BMI > 256) {
      return 'invalid input';
    } else {
      return Math.round(BMI * 100) / 100;
    }
  };

  const getBCS = () => {
    if (BMI === 0) {
      return '';
    }

    if (BMI < 63) {
      return 'Underweight';
    }
    if (BMI >= 92 && BMI <= 256) {
      return 'Overweight';
    }

    if (BMI > 256) {
      return '';
    } else {
      return 'Ideal weight';
    }
  };

  const getBodyFat = () => {
    if (BMI === 0) {
      return '';
    }

    if (BMI < 63) {
      return 'below 15%';
    }
    if (BMI >= 92 && BMI <= 256) {
      return 'above 25%';
    }

    if (BMI > 256) {
      return '';
    } else {
      return 'Ideal weight';
    }
  };

  return (
    <View style={styles.container}>
      <ContentTitle title="Body Condition Scoring (BCS) Calculator" />
      <Select
        label="Type"
        onSelect={index => setSelectedIndex(index.row)}
        value={petTypes[selectedIndex]}>
        <SelectItem title="Dog" />
        <SelectItem title="Cat" />
      </Select>
      {petTypes[selectedIndex] === 'Dog' ? (
        <View style={{...styles.row, ...styles.topMargin}}>
          <Input
            style={styles.input}
            value={height}
            label="Height"
            placeholder="inch"
            onChangeText={e => setHeight(e)}
          />
          <Input
            style={styles.input}
            value={weight}
            label="Weight"
            placeholder="kg"
            onChangeText={e => setWeight(e)}
          />
        </View>
      ) : (
        <View style={{...styles.row, ...styles.topMargin}}>
          <Input
            style={styles.input}
            value={ribCage}
            label="Rib Cage"
            placeholder="inch"
            onChangeText={e => setRibCage(e)}
          />
          <Input
            style={styles.input}
            value={legLength}
            label="Leg Length"
            placeholder="inch"
            onChangeText={e => setLegLength(e)}
          />
        </View>
      )}

      <Button style={styles.btn} size="small" onPress={calculateBCS}>
        Calculate
      </Button>
      <View style={styles.resultContainer}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>RESULTS</Text>
        <View style={styles.result}>
          <View style={styles.row}>
            <Text>BMI: </Text>
            <Text style={styles.bold}>{displayBMI()}</Text>
          </View>
          <View style={styles.row}>
            <Text>Ideal BCS: </Text>
            <Text style={styles.bold}>
              {petTypes[selectedIndex] === 'Dog' ? '63-92' : '15-29'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>Body Condition Score: </Text>
            <Text style={styles.bold}>{getBCS()}</Text>
          </View>
          <View style={styles.row}>
            <Text>Fat Percentage: </Text>
            <Text style={styles.bold}>{getBodyFat()}</Text>
          </View>
        </View>
        <Text style={styles.recommendation}>RECOMMENDATION</Text>
        {BMI != 0 && (
          <View>
            <Text category="c1">
              • Try reducing portion size of your pet's food intake little by
              little
            </Text>
            <Text category="c1">
              • Keep track of the treats you have been giving as they can be
              high in calories
            </Text>
            <Text category="c1">
              • Substitute junk foods to healthy organic foods and keep the
              volume of the food in moderation
            </Text>
            <Text category="c1">
              • Follow your veterinarian's advice to the food intake of your pet
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  img: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  topMargin: {
    margin: 5,
  },
  input: {
    flex: 1,
  },
  btn: {
    alignSelf: 'flex-start',
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  resultContainer: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    height: '57%',
  },
  result: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  recommendation: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Calculator;
