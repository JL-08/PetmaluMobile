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
    setBCS(0);
    setBMI(0);
  }, [selectedIndex]);

  const calculateBMI = () => {
    let BMI;

    if (petTypes[selectedIndex] === 'Dog') {
      const lbs = weight / 0.45;
      BMI = (lbs * 703) / (height * height);
      // const BMI = lbs / height;
    }
    if (petTypes[selectedIndex] === 'Cat') {
      BMI = ((((ribCage / 0.7062) - legLength) / 0.9156) - legLength) * 2.54; // prettier-ignore
    }

    setBMI(Math.round(BMI));
    setBCS(calculateBCS(Math.round(BMI)));
  };

  //   CAT
  // 1-4 (UNDERWEIGHT): UNDER 15

  // BCS 1: 1-3
  // BCS 2: 4-7
  // BCS 3: 8-11
  // BCS 4: 12-15

  // 5-6 IDEAL (OVER 15, UNDER 30)

  // BCS 5: 16-24
  // BCS 6: 25-30

  // 7-9 TOO HEAVY (OVER 30, UNDER 42 OBESE)

  // BCS 7: 31-34
  // BCS 8: 35-38
  // BCS 9: 39-42

  const calculateBCS = bmi => {
    if (petTypes[selectedIndex] === 'Dog') {
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
    } else {
      if (bmi >= 1 && bmi <= 3) {
        return 1;
      }
      if (bmi >= 4 && bmi <= 7) {
        return 2;
      }
      if (bmi >= 8 && bmi <= 11) {
        return 3;
      }
      if (bmi >= 12 && bmi <= 15) {
        return 4;
      }
      if (bmi >= 16 && bmi <= 24) {
        return 5;
      }
      if (bmi >= 25 && bmi <= 30) {
        return 6;
      }
      if (bmi >= 31 && bmi <= 34) {
        return 7;
      }
      if (bmi >= 35 && bmi <= 38) {
        return 8;
      }
      if (bmi >= 39 && bmi <= 42) {
        return 9;
      }
      return 0;
    }
  };

  const displayBMI = () => {
    if (BMI === 0) {
      return '';
    }

    if (petTypes[selectedIndex] === 'Dog') {
      if (!BMI || BMI > 143) {
        return 'invalid input';
      } else {
        return BMI;
      }
    } else {
      if (!BMI || BMI > 42) {
        return 'invalid input';
      } else {
        return BMI;
      }
    }
  };

  const getBCS = () => {
    if (BCS === 0) {
      return '';
    }

    if (petTypes[selectedIndex] === 'Dog') {
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
    } else {
      if (BCS >= 1 && BCS <= 4) {
        return `(${BCS}) Underweight`;
      }
      if (BCS >= 5 && BCS <= 6) {
        return `(${BCS}) Ideal weight`;
      }
      if (BCS >= 7 && BCS <= 9) {
        return `(${BCS}) Overweight`;
      }
      return '';
    }
  };

  const getBodyFat = () => {
    if (BCS === 0) {
      return '';
    }

    if (petTypes[selectedIndex] === 'Dog') {
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
    }

    if (petTypes[selectedIndex] === 'Cat') {
      if (BCS >= 1 || BCS <= 4) {
        return 'less than 15%';
      }

      if (BCS >= 5 || BCS <= 6) {
        return '15% - 30%';
      }

      if (BCS >= 7 || BCS <= 9) {
        return 'over 30%';
      }
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
                {petTypes[selectedIndex] === 'Dog' ? '63-92' : '16-30'}
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
        {BMI != 0 && <CalcResults BCS={BCS} type={petTypes[selectedIndex]} />}
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
