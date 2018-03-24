import React from 'react';

export default function SideBar() {
  return (
    <div className="sidenav-container">
      <a href="/loan_list">Open Loans</a>
      <a href="/closed_loans">Closed</a>
      <a href="/billing">Billing</a>
      <a href="/settings">Settings</a>
    </div>
  );
}
