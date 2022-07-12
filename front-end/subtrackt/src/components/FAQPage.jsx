import React from "react";
import Footer from "./Footer";
import '../styles/FAQPage.css'; 

const FAQPage = (props) => {
  return (
    <div className="faqpage">
      <br/><br/><br/><h1>Frequently Asked Questions</h1><br/><br/>
      <details open>
        <summary>How does SubTrackt help its users?</summary>
        <div className="faq__content">
          <p>Subtrack will keep track of your subscription so you no longer wonder who is taking 5 dollars out of your bank account every month. Our app let you add, delete, and track subscription easily and provide you with break down of your information to help you make better decision.</p>
        </div>
      </details>
      <details>
        <summary>How can SubTrackt help me realize subscriptions I forgot about?</summary>
        <div className="faq__content">
          <p>We use Plaid to parse your transaction history in order to recognize transactions made to subscription companies. With just one click of your button, forget going through your numerous transactions to find the subscription you forgot about. Don't Worry! We will never save your transaction data or reveal them to anyone else. All your transaction are deleted after parsing.</p>
        </div>
      </details>
      <details>
        <summary>Why was SubTrackt created?</summary>
        <div className="faq__content">
          <p>Our founder had trouble keeping track of his subscriptions and realized he had unnecessary bills on his credit card statements. And so, he decided to gather a team to create a solution.</p>
        </div>
      </details><br/><br/>
      <Footer />
    </div>
  );
};

export default FAQPage;
