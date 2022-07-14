import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./ComponentForFeedback";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import Spinner from "./shared/Spinner.js";

function FeedbackList() {
  //extracting data from feedback context and passing it
  // in whatever context we want to use here in this file
  const { feedback, isLoading } = useContext(FeedbackContext);
  // we needed feedback from teh context.

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Result Found..</p>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 2 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem key={item.id} item={item} />
            </motion.div>
          );
          //handleDelete is now a prop for feedback item.
        })}
      </AnimatePresence>
    </div>
  );
  // Version without animation
  // return (
  //   <>
  //     <div className="feedback-list">
  //       {feedback.map((item) => {
  //         return (
  //           <FeedbackItem
  //             key={item.id}
  //             item={item}
  //             handleDelete={handleDelete}
  //           />
  //         );
  //         //handleDelete is now a prop for feedback item.
  //       })}
  //     </div>
  //   </>
  // );

  // Version with animation
}

export default FeedbackList;
