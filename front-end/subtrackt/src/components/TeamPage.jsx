// import React from "react";
// import Footer from "./Footer";

// const TeamPage = (props) => {
//   return (
//     <div className="teampage">
//       <div className="row">
//         <div className="card">
//           <div className="container">
//             <h1>Meet the Team!</h1>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="card">
//           <div className="container">
//             <h2>Zachary Waxman</h2>
//             <p className="title">CEO &amp; Founder</p>
//             <p>Senior at NYU.</p>
//             <p>zw1490@nyu.edu</p>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="card">
//           <div className="container">
//             <h2>Medha Gupta</h2>
//             <p className="title">Vice President</p>
//             <p>Junior Computer Science Student at NYU</p>
//             <p>medha.gupta@nyu.edu</p>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="card">
//           <div className="container">
//             <h2>Morgan Xu</h2>
//             <p className="title">Main Developer</p>
//             <p>Sophomore Computer Science student at NYU.</p>
//             <p>hx801@nyu.edu</p>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default TeamPage;


import React from "react";
import Footer from "./Footer";
import '../styles/TeamPage.css'; 
import zach from'../images/zach.jpg'; 
import medha from'../images/medha.jpg'; 
import morgan from'../images/morgan.jpg'; 
import emailicon from'../images/email_icon.png'; 

const TeamPage = (props) => {
  return (
    <div className="main">
      <div className="teampage">
        <br/><br/><br/><br/><h2>Meet the Team!</h2>
        <div className="row">
          <div class="column">
            <div className="profile-card">
              <div class="img">
              <img src={zach} alt="Zach" />
              </div>
              <div class="caption">
                <h3>Zachary Waxman</h3>
                <p>CEO and Founder</p>
                <a href="mailto: zw1490@nyu.edu"><img src={emailicon} height="25px" alt="zw1490@nyu.edu"/></a>
              </div>
            </div>
          </div>
          <div class="column">
            <div className="profile-card">
              <div class="img">
              <img src={medha} alt="Medha" />
              </div>
              <div class="caption">
                <h3>Medha Gupta</h3>
                <p>Vice President</p>
                <a href="mailto: medha.gupta@nyu.edu"><img src={emailicon} height="25px" alt="medha.gupta@nyu.edu"/></a>
              </div>
            </div>
          </div>
          <div class="column">
            <div className="profile-card">
              <div class="img">
              <img src={morgan} alt="Morgan" />
              </div>
              <div class="caption">
                <h3>Morgan Xu</h3>
                <p>Main Developer</p>
                <a href="mailto: hx801@nyu.edu"><img src={emailicon} height="25px" alt="hx801@nyu.edu"/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
