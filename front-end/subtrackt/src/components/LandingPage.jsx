import React from 'react';
import graphGIF from '../images/graph_animation_nobg.gif';

const LandingPage = () => {
    return (
        <div className="landing">
            <div>
                <header id="showcase">
                    <h1>Welcome to SubTrackt</h1>
                        <p>SubTrackt is a subscription tracking and budgeting application.</p>
                        <a href="#section-a" class="button">Read More</a>
                </header>
                <section id="section-a">
                <h2>Understand Where Your Money is Going!</h2>
                <img src={graphGIF} alt="Graph Animation" />
                    <div class="box1">
                        View all of your subscriptions via your credit card transaction history, cancel any unwanted subscriptions, and keep track of your spending with SubTrackt.
                    </div>
                </section>
            </div>
        </div>
    )
}

export default LandingPage;