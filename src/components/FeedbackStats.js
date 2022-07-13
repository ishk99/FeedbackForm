import React from "react";
// import PropTypes from "prop-types";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

// prop -> feedback
function FeedbackStats() {
  // pulling feedback context
  const { feedback } = useContext(FeedbackContext);

  // Calculating average ratings
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback.length;
  //average = sum of ratings / length

  //ONly want to havw 1 decimal place
  average = average.toFixed(1);

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

// No longer need proptypes since we are getting data from context

// FeedbackStats.propTypes = {
//   feedback: PropTypes.array.isRequired,
// };

export default FeedbackStats;
