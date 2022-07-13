import { useState, useContext, useEffect } from "react";
import RatingSelect from "./RatingSelect.js";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  // we need to update the text i.e the input we get from the input field
  const [text, setText] = useState("");
  const [rating, setRating] = useState();
  //Real time validation
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    // first we want to check if feedbackEdit has soemthing in it or not
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false); //so that the button gets enabled
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);
  //so by default useEffect will run whenever the page loads.
  // But we also want it to run whenever we click on the edit button
  // which means whenever feedbackEdit's state changes.

  const handleTextChange = ({ target: { value } }) => {
    // 👈  get the value
    //We want the validation to run whenever we type in something

    if (value === "") {
      setBtnDisabled(true);
      setMessage(null)
      // prettier-ignore
    } else if (value.trim().length < 10) {
      // 👈 check for less than 10
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(value);
  };

  const handleSubmit = (e) => {
    //So in a form submission we call the preventDefault, because we
    // do not want the default values to be submitted.
    e.preventDefault();

    //so here we write another validation for the text that is passed
    if (text.trim().length > 10) {
      const newFeedback = {
        text: text,
        rating: rating,
      };
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
        // it also takes the new feedback created.
      } else {
        //this means that if there is nothing to be edited we want to add it.
        addFeedback(newFeedback);
      }

      //after we submit the feedback we want the text to go back to laceholder value
      setText("");
    }
  };

  return (
    // Using the below card
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Rate your service with us ?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {/* If there is a message then display the below div */}
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;

// doubt how does feedbackEdit.edit === true work ? does feedbackEdit has an edit property we check ?
