import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// variable for the context
const FeedbackContext = createContext();

// provider -> in order for the components to get access to the state in our context, we wrap them in provider.

export const FeedbackProvider = ({ children }) => {
  // this is my state
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This feedback item 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This feedback item 2",
      rating: 4,
    },
    {
      id: 3,
      text: "This feedback item 3",
      rating: 7,
    },
  ]);

  // Item is whatever we want to edit, including id text rating
  // edit is a boolean, when we edit it is set to true
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delte ?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
      //fiter out the id which is not equal to the current id, setting to that
    }
  };

  //Adding a function here to update the feedback
  // updItem - > is the new updates data
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    //feedback set to an array with all the current feedback and adding the newFeedback onto it.
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    // all these elements are provided to the components
    <FeedbackContext.Provider
      value={{
        feedback: feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
      // feedbackEdit is the actual state which holds the item and the boolean
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
