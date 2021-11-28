import React from 'react';
import graphGIF from '../images/graph_animation_nobg.gif';
import logo from "../images/logo.png";
import Footer from './Footer';



const LandingPage = () => {
    return (
        <div className="landing">
            <div>
                <header id="showcase">

                <div className="box2 bounce-2 pos1"></div>
                <div className="box2 bounce-2 pos2"></div>
                <div className="box2 bounce-2 pos3"></div>
                <div className="box2 bounce-2 pos4"></div>
                <div className="box2 bounce-2 pos5"></div>
                <div className="box2 bounce-2 pos6"></div>
                <div className="box2 bounce-2 pos7"></div>
                <div className="box2 bounce-2 pos8"></div>
                <div className="box2 bounce-2 pos9"></div>
                <div className="box2 bounce-2 pos10"></div>
                <div className="box2 bounce-2 pos11"></div>
                <div className="box2 bounce-2 pos12"></div>
                <div className="box2 bounce-2 pos13"></div>
                <div className="box2 bounce-2 pos14"></div>
                <div className="box2 bounce-2 pos15"></div>
                <div className="box2 bounce-2 pos16"></div>
                <div className="box2 bounce-2 pos17"></div>
                <div className="box2 bounce-2 pos18"></div>
                
                <br></br><br></br>
                {/* <img src={logo} alt="logo" height="100px"/> */}
                <div className="box bounce-6"></div>
                    <h1>Welcome to SubTrackt!</h1>
                        <p>SubTrackt is a subscription tracking and budgeting application.</p>
                        <a href="#section-a" className="button">Learn More</a>
                </header>
                <div className="money">
                <section id="section-a">

                <br></br><br></br>
                <h2>Understand Where Your Money is Going!</h2><br></br><br></br>
                <img src={graphGIF} alt="Graph Animation" /><br></br><br></br>

                    <div className="box1">
                        View all of your subscriptions via your credit card transaction history, cancel any unwanted subscriptions, and keep track of your spending with SubTrackt.
                    </div><br></br><br></br>
                </section></div>
                
            </div>
            <Footer/>
        </div>
    )
}

export default LandingPage;