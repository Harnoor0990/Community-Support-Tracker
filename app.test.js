import { handleFormSubmission, loadDataToTable, validateDonation, validateVolunteer, validateEvent } from './app';

describe('Donation Tracker, Volunteer Tracker, Event Signup', () => {
  let mockEvent;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="donation-form">
        <input id="charity-name" type="text">
        <input id="donation-amount" type="number">
        <input id="donation-date" type="date">
        <div id="donation-error-messages"></div>
        <button type="submit">Submit</button>
      </form>
      <form id="volunteer-form">
        <input id="volunteer-name" type="text">
        <input id="volunteer-email" type="email">
        <input id="volunteer-availability" type="text">
        <div id="volunteer-error-messages"></div>
        <button type="submit">Submit</button>
      </form>
      <form id="event-form">
        <input id="event-name" type="text">
        <input id="event-date" type="date">
        <input id="event-location" type="text">
        <div id="event-error-messages"></div>
        <button type="submit">Submit</button>
      </form>
      <table id="donation-table"><tbody></tbody></table>
      <table id="volunteer-table"><tbody></tbody></table>
      <table id="event-table"><tbody></tbody></table>
    `;
    mockEvent = { preventDefault: jest.fn() };
  });

  it('should validate and add donation correctly', () => {
    const form = document.getElementById('donation-form');
    const charityName = document.getElementById('charity-name');
    const donationAmount = document.getElementById('donation-amount');
    const donationDate = document.getElementById('donation-date');
    
    charityName.value = 'Charity A';
    donationAmount.value = 100;
    donationDate.value = '2024-12-01';
    
    handleFormSubmission(form, document.querySelector('tbody'), document.getElementById('donation-error-messages'), 'donations', validateDonation)(mockEvent);

    const storedDonation = JSON.parse(localStorage.getItem('donations'))[0];
    expect(storedDonation.charityName).toBe('Charity A');
    expect(storedDonation.donationAmount).toBe(100);
     it('should validate and add volunteer correctly', () => {
    const form = document.getElementById('volunteer-form');
    const volunteerName = document.getElementById('volunteer-name');
    const volunteerEmail = document.getElementById('volunteer-email');
    const volunteerAvailability = document.getElementById('volunteer-availability');
    
    volunteerName.value = 'John Doe';
    volunteerEmail.value = 'john@example.com';
    volunteerAvailability.value = 'Weekends';
    
    handleFormSubmission(form, document.querySelector('#volunteer-table tbody'), document.getElementById('volunteer-error-messages'), 'volunteers', validateVolunteer)(mockEvent);

    const storedVolunteer = JSON.parse(localStorage.getItem('volunteers'))[0];
    expect(storedVolunteer['volunteer-name']).toBe('John Doe');
    expect(storedVolunteer['volunteer-email']).toBe('john@example.com');
  });

  it('should validate and add event correctly', () => {
    const form = document.getElementById('event-form');
    const eventName = document.getElementById('event-name');
    const eventDate = document.getElementById('event-date');
    const eventLocation = document.getElementById('event-location');
    
    eventName.value = 'Fundraising Event';
    eventDate.value = '2024-12-15';
    eventLocation.value = 'Community Center';
    
    handleFormSubmission(form, document.querySelector('#event-table tbody'), document.getElementById('event-error-messages'), 'events', validateEvent)(mockEvent);

    const storedEvent = JSON.parse(localStorage.getItem('events'))[0];
    expect(storedEvent['event-name']).toBe('Fundraising Event');
    expect(storedEvent['event-location']).toBe('Community Center');
  });
});

  
