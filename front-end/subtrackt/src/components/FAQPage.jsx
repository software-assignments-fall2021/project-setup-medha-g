import React from "react";
import Footer from "./Footer";

const FAQPage = (props) => {
  return (
    <div className="faqpage">
      <div className="row">
        <div className="card">
          <div className="container">
            <h1>Frequently Asked Questions</h1>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="card">
          <div className="container">
            <h2>How does Subtrackt help its users?</h2>
            <p>Subtrack will keep trac of your subscription so you no longer wonder who is taking 5 dollars out of your bank account every month. Our app let you add, delete, and track subscription easily and provide you with break down of your information to help you make better decision.</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="card">
          <div className="container">
            <h2>
              How can Subtrackt help me realize subscriptions I forgot about?
            </h2>
            <p>We uses Plaid to parse your transaction history in order to recognize transactions made to subscription companies. With just one click of your button, forget going through your numerous transactions to find the subscription you forgot about. Don't Worry! We will never save your transaction data or reveal them to anyone else. All your transaction are deleted after parsing.</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="card">
          <div className="container">
            <h2>Zachary Waxman</h2>
            <p>Some text that answers the question lorem ipsum ipsum lorem.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
