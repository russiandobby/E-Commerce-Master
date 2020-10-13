import React, { useState, useEffect } from "react";
import "./contact.styles.css";
import { addEmailMessage } from "../../firebase/firebase.utils";
import Popup from "../../components/popup-message/pop-up.component";

const Contact = () => {
  const [emailDetails, setEmailDetails] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    nError: "",
    eError: "",
    mError: "",
    popUp: false,
  });
  const {
    name,
    email,
    company,
    phone,
    message,
    nError,
    eError,
    mError,
    popUp,
    date,
  } = emailDetails;

  useEffect(() => {
    setEmailDetails({ ...emailDetails, nError: "", eError: "", mError: "" });
  }, [name, email, message]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEmailDetails({ ...emailDetails, [name]: value });
  };

  const validateForm = () => {
    if (name === "" || email === "" || message === "") {
      if (name === "") {
        // console.log('failed name validation');
        setEmailDetails({ ...emailDetails, nError: "Please fill out name!" });
        return false;
      } else if (email === "") {
        // console.log('failed email validation');
        setEmailDetails({
          ...emailDetails,
          eError: "Please enter your email!",
        });
        return false;
      } else if (message === "") {
        // console.log('failed message validation');
        setEmailDetails({ ...emailDetails, mError: "Please enter message!" });
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = validateForm();
    const date = new Date().toISOString();

    if (result) {
      console.log("Form Is Submitted");
      addEmailMessage({ name, email, company, phone, message, date }, function (
        result
      ) {
        let data = result;

        setEmailDetails({ ...emailDetails, popUp: data });
        setTimeout(function () {
          setEmailDetails({ ...emailDetails, popUp: false });
        }, 3000);
      });
    } else {
      console.log("Form failed to submit");
    }

    // viewEmailMessage();
  };

  return (
    <div className="container">
      {/* <Popup/> */}
      {popUp ? <Popup /> : null}
      <h1 className="brand">
        <span>Contact</span> Us
      </h1>
      <div className="wrapper animated bounceInLeft">
        <div className="company-info">
          <h3 className="leftForm-title">Acme Web Design</h3>
          <ul>
            <li>
              <i className="fa fa-road fa-2x"></i> <span className="leftForm-text">44 Something st</span>
            </li>
            <li>
              <i className="fa fa-phone fa-2x"></i> <span className="leftForm-text">(555) 555-5555</span> 
            </li>
            <li>
              <i className="fa fa-envelope fa-2x"></i> <span className="leftForm-text">test@acme.test</span> 
            </li>
          </ul>
        </div>
        <div className="contact">
          <h3>Email Us</h3>
          <form onSubmit={handleSubmit}>
            <p>
              <label>
               <span className="form-bald">Name*</span> <span className="errorMsg">{nError}</span>
              </label>
              <input type="text" name="name" onChange={handleChange} />
            </p>
            <p>
              <label>Company</label>
              <input type="text" name="company" onChange={handleChange} />
            </p>
            <p>
              <label>
              <span className="form-bald">Email Address*</span> <span className="errorMsg">{eError}</span>
              </label>
              <input type="email" name="email" onChange={handleChange} />
            </p>
            <p>
              <label>Phone Number</label>
              <input type="text" name="phone" onChange={handleChange} />
            </p>
            <p className="full">
              <label>
              <span className="form-bald">Message*</span> <span className="errorMsg">{mError}</span>
              </label>
              <textarea
                name="message"
                rows="5"
                type="message"
                onChange={handleChange}
              ></textarea>
            </p>
            <p className="full">
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
