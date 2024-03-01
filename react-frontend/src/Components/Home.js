import React from 'react'
import BottomMenu from './BottomMenu'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "../styles/Home.css";
import Header from './header';
import mainLogo from '../images/nutri-navigator-logo_v1_0_1.png';

function Home() {
    return (
        <div>
            <Header />
            <div className="home-hero-section main-section">
                <div className="home-hero-wrapper">
                    <div className="home-hero-text-contain">
                        <div className="content-wrapper">
                            <h1 className="home-hero-heading">
                                Track your food and
                                <span className="yellow-line-span"> make every bite count</span>
                            </h1>
                        </div>
                        <div className="content-wrapper">
                            <p className="home-hero-subtext">
                                A tool created to hold yourself accountable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="how-it-works-section wf-section">

                <div className="how-it-works-wrapper">
                    <div className="how-it-works-left-contain">
                        <div className="content-wrapper">
                            <div className="tag-text-contain">
                                <div className="tag-text-line">
                                </div>
                                <div className="tag-text">
                                    How NutriNavigator works
                                </div>
                            </div>
                        </div>
                        <div className="content-wrapper">
                            <h2 className="how-it-works-heading">
                                Start using NutriNavigator in 3 simple steps</h2>
                        </div>
                        <div className="content-wrapper">
                            <div className="how-it-works-subtext">
                            Track your meals, fuel your body, and own your health.

</div></div></div><div className="how-it-works-right-contain"><div className="how-it-works-item">
                                <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cacb9611eae20b1968057_Works%20Icon%201.svg" loading="lazy" alt="" className="how-it-works-item-icon"></img>
                                <div className="how-it-works-item-heading">Set up your profile</div><div className="how-it-works-item-subtext">Setting up a fitness profile is an important first step to achieving your health and fitness goals. It involves gathering information about your current fitness level, medical history, and lifestyle habits in order to create a customized plan that is tailored to your specific needs.</div>
                            </div><div className="how-it-works-item">
                            <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cacb9941191bc9a345aac_Works%20Icon%202.svg" loading="lazy" alt="" className="how-it-works-item-icon"></img>
                            <div className="how-it-works-item-heading">We upload your data for you</div><div className="how-it-works-item-subtext">
                            Simply upload your data, and let us handle the rest, empowering you to focus on achieving your fitness goals hassle-free.
                                </div>
                        </div><div className="how-it-works-item">
                            <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cacb984254d0d202a2474_Works%20Icon%203.svg" loading="lazy" alt="" className="how-it-works-item-icon"></img>
                            <div className="how-it-works-item-heading">Start collaborating and building</div>
                            <div className="how-it-works-item-subtext">
                            Let's harness our strengths, communicate openly, and work towards our shared goals. Together, we'll create something remarkable that will make a positive impact. Let's dive in and get started!                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="customer-section wf-section">
                <div className="customer-wrapper">
                    <h2 className='customer-heading'>
                        Hear it from our
                        <span className="yellow-line-span"> clients</span>
                    </h2>
                    <div data-delay="4000" data-animation="slide" className="customer-slider w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="false" data-disable-swipe="false" data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="true" role="region" aria-label="carousel">
                        <div className="customer-slider-mask w-slider-mask" id="w-slider-mask-0">
                            <div className="customer-slide w-slide" aria-label="1 of 4" role="group">
                                <div className="customer-slide-wrapper">
                                    <div className="customer-slide-heading">25k users</div>
                                    <div className="customer-slide-paragraph">
                                    This service has made staying on top of my health goals incredibly easy and efficient. The variety of features, including calorie counting, macro tracking, and meal planning, have helped me better understand my nutritional intake and make smarter choices. What sets NutriNavigator apart is its seamless integration with popular fitness trackers, ensuring that my data is always up-to-date and accurate.
                                        <span className="customer-slide-paragraph-green">With NutriNavigator by my side, I feel more empowered and motivated than ever to lead a healthier lifestyle. I can't recommend it enough!</span>
                                    </div>
                                    <div className="author-contain">
                                        <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cb0494c220441510774dc_Author%20Image%201.png" loading="lazy" alt="" className="author-image"></img>
                                        <div className="author-text-contain">
                                            <div className="author-name">Warren </div>
                                            <div className="author-position">Premium Member</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="customer-slide w-slide" aria-label="2 of 4" role="group">
                                <div className="customer-slide-wrapper">
                                    <div className="customer-slide-heading">+10 hours saved</div>
                                    <div className="customer-slide-paragraph">
                                    This platform has completely transformed my fitness journey. The user-friendly interface makes it a breeze to log workouts, track progress, and stay motivated. I love how it syncs seamlessly with my fitness tracker, eliminating the hassle of manual entry. Plus, the personalized insights and goal tracking features keep me accountable and motivated to push myself further. Thanks to NutriNavigator, I've seen significant improvements in my health and fitness levels.                              
                                              <span className="customer-slide-paragraph-green"> Highly recommend it to anyone looking to take their fitness game to the next level
                                              </span>
                                    </div>
                                    <div className="author-contain">
                                        <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cb0494c220441510774dc_Author%20Image%201.png" loading="lazy" alt="" className="author-image"></img>
                                        <div className="author-text-contain">
                                            <div className="author-name">Warren</div>
                                            <div className="author-position">Premium Member</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* <BottomMenu /> */}




        </div>
    );
};

export default Home
