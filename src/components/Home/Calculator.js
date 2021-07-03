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
import CalcResults from './CalcResults';

const petTypes = ['Dog', 'Cat'];

const Calculator = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [height, setHeight] = React.useState();
  const [weight, setWeight] = React.useState();
  const [ribCage, setRibCage] = React.useState();
  const [legLength, setLegLength] = React.useState();
  const [BMI, setBMI] = React.useState(0);
  const [BCS, setBCS] = React.useState(0);

  useEffect(() => {
    setHeight(null);
    setWeight(null);
    setRibCage(null);
    setLegLength(null);
    setBMI(0);
  }, [selectedIndex]);

  const calculateBMI = () => {
    const lbs = weight / 0.45;
    const BMI = (lbs * 703) / (height * height);
    // const BMI = lbs / height;

    setBMI(Math.round(BMI));
    setBCS(calculateBCS(Math.round(BMI)));
  };

  const calculateBCS = bmi => {
    console.log(bmi);
    if (bmi >= 1 && bmi <= 16) {
      return 1;
    }
    if (bmi >= 17 && bmi <= 31) {
      return 2;
    }
    if (bmi >= 32 && bmi <= 47) {
      return 3;
    }
    if (bmi >= 48 && bmi <= 63) {
      return 4;
    }
    if (bmi >= 64 && bmi <= 79) {
      return 5;
    }
    if (bmi >= 80 && bmi <= 95) {
      return 6;
    }
    if (bmi >= 96 && bmi <= 111) {
      return 7;
    }
    if (bmi >= 112 && bmi <= 127) {
      return 8;
    }
    if (bmi >= 128 && bmi <= 143) {
      return 9;
    }
    return 0;
  };

  const displayBMI = () => {
    if (BMI === 0) {
      return '';
    }

    if (!BMI || BMI > 143) {
      return 'invalid input';
    } else {
      return BMI;
    }
  };

  const getBCS = () => {
    if (BCS === 0) {
      return '';
    }

    if (BCS >= 1 && BCS <= 3) {
      return `(${BCS}) Underweight`;
    }
    if (BCS >= 4 && BCS <= 5) {
      return `(${BCS}) Ideal weight`;
    }
    if (BCS >= 6 && BCS <= 9) {
      return `(${BCS}) Overweight`;
    }
    return '';
  };

  const getBodyFat = () => {
    if (BCS === 0) {
      return '';
    }

    if (BCS === 4 || BCS === 5) {
      return '15-24%';
    }

    switch (BCS) {
      case 6:
        return '25-29%';

      case 7:
        return '30-34%';

      case 8:
        return '35-39%';

      case 9:
        return '40-45%';

      default:
        return 'less than 15%';
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
            keyboardType="number-pad"
            placeholder="inch"
            onChangeText={e => {
              setHeight(e);
            }}
          />
          <Input
            style={styles.input}
            value={weight}
            label="Weight"
            placeholder="kg"
            keyboardType="number-pad"
            onChangeText={e => {
              setWeight(e);
            }}
          />
        </View>
      ) : (
        <View style={{...styles.row, ...styles.topMargin}}>
          <Input
            style={styles.input}
            value={ribCage}
            label="Rib Cage"
            placeholder="inch"
            keyboardType="number-pad"
            onChangeText={e => setRibCage(e)}
          />
          <Input
            style={styles.input}
            value={legLength}
            label="Leg Length"
            placeholder="inch"
            keyboardType="number-pad"
            onChangeText={e => setLegLength(e)}
          />
        </View>
      )}

      <Button style={styles.btn} size="small" onPress={calculateBMI}>
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
            {BMI > 0 && BMI <= 143 && (
              <Text style={styles.bold}>
                {petTypes[selectedIndex] === 'Dog' ? '63-92' : '15-29'}
              </Text>
            )}
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
        {BMI != 0 && <CalcResults BCS={BCS} />}
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
