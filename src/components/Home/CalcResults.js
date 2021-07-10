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
        Based on our assessment, your pet's body condition score is 1-3. Your
        pet has less than 15% body fat and is underweight. being too thin could
        be a sign of disease, or the calorie intake of your pet might be not
        enough for his or her activity level. For best result, get your pet
        checked out by a veterinarian as soon as possible to rule out possible
        diseases.
      </Text>
    </View>
  );

  const Ideal = () => (
    <View>
      <Text category="c1">
        Congratulations! Based on our assessment, your pet's body condition
        score is 4-5. Your pet has approximately 15-24% body fat and is in an
        ideal body weight. No worries, your pet is in a great shape. But for
        best assessment and result, please consult with a veterinarian.
      </Text>
    </View>
  );

  const Overweight = () => (
    <View>
      <Text category="c1">
        Being overweight can host problems to your pet such as joint pain,
        respiratory issues, and many more that will make it harder for your
        veterinarian to detect medical issues.
      </Text>
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

  const UnderweightCat = () => (
    <View>
      <Text category="c1">
        Thin cats are often hiding or have an undetected diseases, For best
        results, consult a veterinarian to get your pet tested. Here are few
        recommendations to help your cat get in shape:
      </Text>
      <Text category="c1">
        • Make sure your cat is eating a high-quality premium diet for maximum
        nutrition. (meaning: healthy food intake)
      </Text>
      <Text category="c1">
        • Consult with a veterinarian for best result/s.
      </Text>
    </View>
  );

  const IdealCat = () => (
    <View>
      <Text category="c1">
        Congratulations! Your pet is in a great shape. You're doing great by
        taking care of your pet :) But for best assessment and result, please
        consult with a veterinarian.
      </Text>
    </View>
  );

  const OverweightCat = () => (
    <View>
      <Text category="c1">
        Being overweight can host problems to your pet; Here are few
        reccomendations to get your cat in shape, but for best result/s, consult
        with a veterinarian.
      </Text>
      <Text category="c1">
        • Keep track of the treats you have been giving as they can be high in
        calories.
      </Text>
      <Text category="c1">
        • Follow a meal plan that will suit your pet or better, follow your
        veterinarian's advice to the food intake of your pet.
      </Text>
      <Text category="c1">
        • Consult with a veterinarian for best result/s.
      </Text>
    </View>
  );

  const ObeseCat = () => (
    <View>
      <Text category="c1">
        Obesity can lead to many health problems, including joint pain, lower
        urinary issues, etc. Here are few recommendations to help your cat get
        in shape:
      </Text>
      <Text category="c1">• Track food and calorie intake.</Text>
      <Text category="c1">• Follow a healthy meal plan.</Text>
      <Text category="c1">
        • Exercise. Running, walking or playing with your cat’s favorite toy are
        all wonderful exercises for the benefit of the health of your cat.
      </Text>
      <Text category="c1">
        • Try reducing portion size of your pet's food intake little by little.
      </Text>
      <Text category="c1">
        • Consult with a veterinarian for best result/s.
      </Text>
    </View>
  );

  return (
    <View>
      {type === 'Dog' ? (
        BCS >= 1 && BCS <= 4 ? (
          <Underweight />
        ) : BCS >= 5 && BCS <= 6 ? (
          <Ideal />
        ) : BCS >= 7 && BCS <= 9 ? (
          <Overweight />
        ) : (
          <View></View>
        )
      ) : BCS >= 1 && BCS <= 4 ? (
        <UnderweightCat />
      ) : BCS >= 5 && BCS <= 6 ? (
        <IdealCat />
      ) : BCS >= 7 && BCS <= 8 ? (
        <OverweightCat />
      ) : BCS === 9 ? (
        <ObeseCat />
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default CalcResults;
