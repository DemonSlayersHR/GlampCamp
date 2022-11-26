import { AirbnbRating } from 'react-native-ratings';
import React, {useState} from 'react';

const starRating = ({setRating}) => {

  const onFinishRating = (rating) => {
    setRating(rating);
    console.log('rating', rating);
  }

  return (
    <AirbnbRating
      showRating={true}
      onFinishRating={onFinishRating}
      reviewColor={"#000"}
      selectedColor={"#f4e285"}
      reviewSize={17}
      size={28}
      count={5}
      reviews={["worst glampsite...ever", "Prolly won't be coming back", "Mediocre", "Damn Near Perfect", "Best Glampsite Ever!"]}
    />
  )
}

export default starRating;