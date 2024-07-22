import React, { useEffect } from "react";
import Notes from "./Notes";

const Homepage = () => {
  useEffect(() => {
    const successMessage = sessionStorage.getItem('loginSuccessMessage');
    if (successMessage) {
      // Display the success message, for example using an alert or a notification system
      alert(successMessage);
      sessionStorage.removeItem('loginSuccessMessage'); // Remove the message after displaying it
    }
  }, []);
  useEffect(() => {
    const successMessage = sessionStorage.getItem('SignupSuccessMessage');
    if (successMessage) {
      // Display the success message, for example using an alert or a notification system
      alert(successMessage);
      sessionStorage.removeItem('SignupSuccessMessage'); // Remove the message after displaying it
    }
  }, []);

  return (
    <div>
      <Notes  />
    </div>
  );
};

export default Homepage;
