import React from 'react';
import SidebarNav from './SideBarNav';
import Navbar from './Navbar';
import '../CSS/LearnMore.css';

export default function LearnMore() {
  return (
    <div className="learn-more">
      <Navbar />
      <SidebarNav />
      <div className="learn-header">
        <h1>Why Loanie?</h1>
        <div className="learn-body">
          <p>
            No more phone tag, No more conflicting schedules, No more wondering if you sent the
            right document or if your documents were accepted. Loanie is here 24 hours a day, 7 days
            a week to track every step of your mortgage process so you can relax and enjoy life.
            Loanie breaks the mortgage process down into phases. In each phase your loan officer
            provides a simple list of assignments. As each assignment is completed you receive a
            text or email letting you know the loan officer has acknowledge the completion of your
            assignment. Loanie is the cutting edge tool that takes all the guess work out of getting
            a mortgage.
          </p>
        </div>
      </div>
    </div>
  );
}
