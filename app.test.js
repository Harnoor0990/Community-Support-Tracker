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
      <table id="donation-table"><tbody></tbody></table>
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
  });
});