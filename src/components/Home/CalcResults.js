import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

const CalcResults = ({BCS, type}) => {
  //   switch (BCS) {
  //     case 1:
  //     case 2:
  //     case 3:
  //       return <Underweight />;

  //     case 4:
  //     case 5:
  //       return <Ideal/>;

  //     case 6:
  //     case 7:
  //     case 8:
  //     case 9:
  //       return <Overweight/>;
  //   }

  const Underweight = () => (
    <View>
      <Text category="c1">
        • Select a food that is higher in calories and protein like what you
        would offer a canine athlete.
      </Text>
      <Text category="c1">
        • Feed small meals throughout the day or consider free feeding.
      </Text>
      <Text category="c1">
        • Follow your veterinarian's advice to the food intake of your pet
      </Text>
    </View>
  );

  const Ideal = () => (
    <View>
      <Text category="c1">
        • No worries, your pet is in a great shape. But for best assessment and
        result, please consult with a veterinarian.
      </Text>
    </View>
  );

  const Overweight = () => (
    <View>
      <Text category="c1">
        • Try reducing portion size of your pet's food intake little by little
      </Text>
      <Text category="c1">
        • Keep track of the treats you have been giving as they can be high in
        calories
      </Text>
      <Text category="c1">
        • Substitute junk foods to healthy organic foods and keep the volume of
        the food in moderation
      </Text>
      <Text category="c1">
        • Follow your veterinarian's advice to the food intake of your pet
      </Text>
    </View>
  );

  return (
    <View>
      {type === 'Dog' ? (
        BCS >= 1 && BCS <= 3 ? (
          <Underweight />
        ) : BCS >= 4 && BCS <= 5 ? (
          <Ideal />
        ) : BCS >= 6 && BCS <= 9 ? (
          <Overweight />
        ) : (
          <View></View>
        )
      ) : BCS >= 1 && BCS <= 4 ? (
        <Underweight />
      ) : BCS >= 5 && BCS <= 6 ? (
        <Ideal />
      ) : BCS >= 7 && BCS <= 9 ? (
        <Overweight />
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default CalcResults;
