import React from "react";

const FAQPage = (props) => {
  return (
    <div className="faqpage">
      <div className="column">
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
              <p>
                Some text that answers the question lorem ipsum ipsum lorem.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <div className="container">
              <h2>
                How can Subtrackt help me realize subscriptions I forgot about?
              </h2>
              <p>
                Some text that answers the question lorem ipsum ipsum lorem.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <div className="container">
              <h2>Zachary Waxman</h2>
              <p>
                Some text that answers the question lorem ipsum ipsum lorem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
