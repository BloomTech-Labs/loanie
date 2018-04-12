import React, { Component } from 'react';
import axios from 'axios';

export const sendUserNotifications = (managerName, managerEmail, clientEmail, clientPhoneNumber) => {
  // axios request to get client name
  const request = { email : clientEmail};
  console.log("request from loan create: ", request);
  axios
    .post('http://localhost:3030/userbyemail', request)
    .then((res) => {
      console.log("res.data.name: ", res.data.name);

      const body = {
        managerName,
        managerEmail,
        phoneNumber: clientPhoneNumber,
        clientEmail,
        clientName: res.data.name,
      };

      // axios request to send text notification
      axios
        .post('http://localhost:3030/sendsms', body)
        .then((res) => {
          console.log('Success! Response from server: ', res);
          // todo(rashmi): use following line on caller side
          // window.location = '/open_loans';
        })
        .catch((err) => {
          console.log('Loan creation failed.', err);
        });

      // axios request to send email notification
      axios
        .post('http://localhost:3030/sendemail', body)
        .then((res) => {
          console.log('Success! Response from server: ', res);
        })
        .catch((err) => {
          console.log('Loan creation failed.', err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};