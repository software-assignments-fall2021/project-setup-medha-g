import React from 'react';
import graphGIF from '../images/graph_animation_nobg.gif';
import twitter from '../images/twitter-icon.png';
import facebook from '../images/facebook-icon.png';
import linkedin from '../images/linkedin-icon.png';
import instagram from '../images/instagram-icon.png';
import logo from "../images/logo.png";



const LandingPage = () => {
    return (
        <div className="landing">
            <div>
                <header id="showcase">
                <div class="box2 bounce-2 pos1"></div>
                <div class="box2 bounce-2 pos2"></div>
                <div class="box2 bounce-2 pos3"></div>
                <div class="box2 bounce-2 pos4"></div>
                <div class="box2 bounce-2 pos5"></div>
                <div class="box2 bounce-2 pos6"></div>
                <div class="box2 bounce-2 pos7"></div>
                <div class="box2 bounce-2 pos8"></div>
                <div class="box2 bounce-2 pos9"></div>
                <div class="box2 bounce-2 pos10"></div>
                <div class="box2 bounce-2 pos11"></div>
                <div class="box2 bounce-2 pos12"></div>
                <div class="box2 bounce-2 pos13"></div>
                <div class="box2 bounce-2 pos14"></div>
                <div class="box2 bounce-2 pos15"></div>
                <div class="box2 bounce-2 pos16"></div>
                <div class="box2 bounce-2 pos17"></div>
                <div class="box2 bounce-2 pos18"></div>
                
                <br></br><br></br>
                {/* <img src={logo} alt="logo" height="100px"/> */}
                <div class="box bounce-6"></div>
                    <h1>Welcome to SubTrackt</h1>
                        <p>SubTrackt is a subscription tracking and budgeting application.</p>
                        <a href="#section-a" class="button">Read More</a>
                </header>
                <div className="money">
                <section id="section-a">
                <br></br><br></br>
                <h2>Understand Where Your Money is Going!</h2><br></br><br></br>
                <img src={graphGIF} alt="Graph Animation" /><br></br><br></br>
                    <div class="box1">
                        View all of your subscriptions via your credit card transaction history, cancel any unwanted subscriptions, and keep track of your spending with SubTrackt.
                    </div><br></br><br></br>
                </section></div>
                
            </div>
            <div class="footer-dark">
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Resources</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-md-6 item text">
                        <h3>SubTrackt</h3>
                        <p>SubTrackt is a Web Application that allows users to keep track of their subscriptions. Subscriptions are either populated via credit card transaction history or via manual entering. Users also have the opportunity to cancel and add subscriptions that they are interested in through SubTrackt and they can evaluate exactly where each of their money is going.</p>
                    </div>
                    <div class="col item social"><a href="#"><i class="icon ion-social-facebook"><img src={facebook} height="20px"></img></i></a><a href="#"><i class="icon ion-social-twitter"><img src={twitter} height="20px"></img></i></a><a href="#"><i class="icon ion-social-snapchat"><img src={linkedin} height="20px"></img></i></a><a href="#"><i class="icon ion-social-instagram"><img src={instagram} height="20px"></img></i></a></div>
                </div>
                <p class="copyright">SubTrackt © 2021</p>
            </div>
        </footer>
    </div>
        </div>
    )
}

export default LandingPage;