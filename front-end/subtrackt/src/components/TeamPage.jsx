import React from "react";
import Footer from "./Footer";

const TeamPage = (props) => {
  return (
    <div className="teampage">
      <div className="row">
        <div className="card">
          <div className="container">
            <h1>Meet the Team!</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="container">
            <h2>Zachary Waxman</h2>
            <p className="title">CEO &amp; Founder</p>
            <p>Description</p>
            <p>example@example.com</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="card">
          <div className="container">
            <h2>Medha Gupta</h2>
            <p className="title">Vice President</p>
            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
            <p>example@example.com</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="card">
          <div className="container">
            <h2>Morgan Xu</h2>
            <p className="title">Main Developer</p>
            <p>Sophomore Computer Science student at NYU.</p>
            <p>hx801@nyu.edu</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
