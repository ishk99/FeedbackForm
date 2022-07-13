import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./ComponentForFeedback";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList() {
  //extracting data from feedback context and passing it
  // in whatever context we want to use here in this file
  const { feedback } = useContext(FeedbackContext);
  // we needed feedback from teh context.

  if (!feedback || feedback.length === 0) {
    return <p>No Result Found..</p>;
  }

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
  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
}

export default FeedbackList;
