import React, { Component } from 'react';
import SidebarNav from './SideBarNav';
import Navbar from './Navbar';
import '../CSS/LearnMore.css';

export default class LearnMore extends Component {
  constructor() {
    super();
    this.state = {
      loginState: false,
    };
  }
  handlePurchase = () => {
    this.setState({ loginState: true });
    console.log(this.state.loginState);
    window.location = '/learn_more';
  };
  render() {
    return (
      <div className="LearnMore">
        <Navbar />
        <SidebarNav />
        <div>
          <h1 className="Learn-header">Why Loanie?</h1>
        </div>
        <div className="Learn-text-container">
          <p className="Learn-text-item Learn-text-font">
            <b>Loanie is the cutting edge tool that takes all the guess work out of getting a mortgage.</b>
          </p>
          <p className="Learn-text-list">
            <ul>
              <li className="Learn-text-font"><b>No more phone tag.</b></li>
              <li>
                <b>No more wondering if you sent the correct document or if your documents were
                accepted.
                </b>
              </li>
              <li className="Learn-text-font"><b>No more conflicting schedules slowing you down.</b></li>
              <li className="Learn-text-font">
                <b>
                Loanie is here 24 hours a day, 7 days a week to track every step of your mortgage
                process so you can relax and enjoy life.
                </b>
              </li>
            </ul>
            <p className="Learn-text-item">
              <b>
              Loanie breaks the mortgage process down into phases. In each phase your loan officer
              provides a simple list of assignments. As each assignment is completed you receive an
              optional text or email letting you know the loan officer has acknowledge the
              completion of each assignment.
              </b>
            </p>
          </p>
        </div>
        <div>
          <h1 className="Learn-header">About Us</h1>
        </div>
        <div className="Learn-text-container">
          <p className="Learn-text-item">
            <div className="AboutUs-container">
              <div className="individual-about-container">
                <img className="individual-picture-item" src="https://files.slack.com/files-pri/T4JUEB3ME-FAA4JM2DD/mecropped.jpg" alt="joshua_hall" />
                <div className="individual-name-item">
                  <b>Joshua Hall</b>
                  <p className="individual-text-item">
                    Joshua is the lead developer of Loanie. He enjoys working with
                    our diverse team and continuously looks for ways to improve not
                    only the website, but his skill set. Joshua brings many strengths
                    to the team, including his dedication, work ethic, and long-term vision.
                    In his free time, Joshua likes to step away from technology and explore
                    the world with his girlfriend, family, and friends. He also enjoys music,
                    playing video games, and watching films. His favorite movie series of all
                    time is Terminator, but lately he's found himself enjoying Inception,
                    The Matrix, and The Walking Dead.
                  </p>
                </div>
              </div>
              <div className="individual-about-container">
                <img className="individual-picture-crop" width="180px" height="180px" src="https://files.slack.com/files-pri/T4JUEB3ME-FA91UNJUU/image_uploaded_from_ios.jpg" alt="joshua_hall" />
                <div className="individual-name-item">
                  <b>Rashmi Baheti</b>
                  <p className="individual-text-item">
                    asdfoijwefiojaiofjaesfioqewrqwerqwefqweAGFASDFAS
                    jsefioashfasioefaseuifghqwefqwfwqefcqwffqwadvasdv
                    saeuiasdfsdsdfsadfsdafertqeefqwefqasdvasdvasdvasdv
                    qwefqwefqwefwqefqwfqwefqwfqwefqwefdvasdvasdvasdv
                    qwefqwfqwefqwefqwefqwecvweqvwevwvvasdvasdvasdvas
                    qwevqwevqwevqwvqwevqwevwqevqwevqwvqweadvasdvasv
                    qwvqwvqwevwevqwvqwvqwvqwvwqevqwvqwev
                  </p>
                </div>
              </div>
              <div className="individual-about-container">
                <img className="individual-picture-item" src="https://files.slack.com/files-pri/T4JUEB3ME-FA9B3NJBF/default_photo_1.jpg" alt="joshua_hall" />
                <div className="individual-name-item">
                  <b>Samuel Kim</b>
                  <p className="individual-text-item">
                    Samuel's role in this project is brining in front end knowledge to
                    increase the functionality of the front end side of the application
                    as well runnning unit tests. His abilty to excel in both a group
                    as well as individual work environment allowed the team to get Loanie
                    running in a timely manner. He has a lot of passion for learning
                    new and old technologies for building cool applications including
                    javascript web applications and even videogames using c++ libraries like SDL2.
                    When he is not busy building applications, he enjoys playing video games,
                    playing guitar and watching esports.
                  </p>
                </div>
              </div>
            </div>
          </p>
        </div>
      </div>
    );
  }
}
