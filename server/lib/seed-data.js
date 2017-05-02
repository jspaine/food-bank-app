import {utc} from 'moment'

export const foodFields = [{
  category: 'Cheese',
  items: [
    {name: 'Cheddar', quantity: 20, startDate: utc(utc('2016-03-03').format('YYYY-[W]WW')), frequency: 1},
    {name: 'Mozarella', quantity: 35, startDate: utc(utc('2016-03-10').format('YYYY-[W]WW')), frequency: 2},
    {name: 'Brie', quantity: 30, startDate: utc(utc('2016-10-15').format('YYYY-[W]WW')), frequency: 4}
  ]
}, {
  category: 'Pasta, rice etc',
  items: [
    {name: 'Penne pasta', quantity: 50, startDate: utc(utc('2017-01-05').format('YYYY-[W]WW')), frequency: 1},
    {name: 'Basmati rice', quantity: 40, startDate: utc(utc('2016-09-13').format('YYYY-[W]WW')), frequency: 1},
    {name: 'Fusilli pasta', quantity: 45, startDate: utc(utc('2016-09-13').format('YYYY-[W]WW')), frequency: 2}
  ]
}, {
  category: 'Meat',
  items: [
    {name: 'Beef mince', quantity: 25, startDate: utc(utc('2016-06-03').format('YYYY-[W]WW')), frequency: 2},
    {name: 'Chicken breast', quantity: 15, startDate: utc(utc('2016-05-10').format('YYYY-[W]WW')), frequency: 2},
    {name: 'Pork chop', quantity: 20, startDate: utc(utc('2016-04-10').format('YYYY-[W]WW')), frequency: 2}
  ]
}, {
  category: 'Vegetables',
  items: [
    {name: 'Carrots', quantity: 30, startDate: utc(utc('2016-07-12').format('YYYY-[W]WW')), frequency: 1},
    {name: 'Onions', quantity: 25, startDate: utc(utc('2016-04-12').format('YYYY-[W]WW')), frequency: 2},
    {name: 'Squash', quantity: 25, startDate: utc(utc('2016-03-02').format('YYYY-[W]WW')), frequency: 4}
  ]
}]

export const settingsFields = {
  organization: 'Foodbank Template',
  mission: 'Foodbank Template is a volunteer run organization based in (location) with the mission of helping families who are in need. We provide weekly non-perishable and freshly baked goods, to ensure that every family has delicious meals. The organization was founded in (year) in memory of (founder), who was very kind and sensitive to the needs of others.',
  instructions: '<p><strong>Please carefully read the following information:</strong>Boxes will be delivered by our volunteers every <strong>Wednesday</strong> evening between <strong>8:00PM and 11:00PM</strong>. Boxes will be left at your doorstep. Volunteers may knock on your door and quickly leave to keep anonymity. During holidays, or other special times, including severe weather conditions, time and day of delivery may change without notice.</p><p>We ask that you <strong>leave the empty box outside your door</strong> the following week, so it can be picked up by the volunteers and reused.</p><p>Volunteers do their best to check food items for expiry dates, however mistakes do occur. <strong>Please use your own judgment and discretion before consuming any food or contact the manufacturer directly if you have any concerns</strong>. If you find an item that is expired, you may throw it away. <strong>If there are items that you don\'t use, please leave them in the box, and we will make a note so that you will not receive them again</strong>.</p><p>If there is a change in your financial situation and you no longer need our assistance, if you will be away  for a certain period, if you have a change in contact information, or any other change, please inform us promptly.</p>',
  thanks: '<p>In the past year, over (amount) pounds of food was distributed on a weekly basis by our team of dedicated volunteers. Your assistance helps us respond to the ever-growing demand of our community. <strong>Thank you for taking the opportunity to help turn lives around.</strong></p><p>With your help, we are able to support the less fortunate families in our community, by providing them with nutritious food and energy to grow, learn, work, and give them hope for a better and brighter future.</p>',
  url: 'www.example.com',
  foodBankAddress: '6 Rhyd-Y-Penau Road, Cardiff, Wales, CF23 6PT',
  clientIntakeNumber: '07123 456 789',
  supportNumber: '07234 567 891',
  location: [51.520185, -3.178096]
}

export const customerQuestionnaire = {
  name: 'Customer Application',
  identifier: 'qCustomers',
  sections: [{
    name: 'General Info',
    position: 0,
    fields: [
      {type: 'address', position: 0, label: 'Street', required: true},
      {type: 'address', position: 1, label: 'Town/City', required: true},
      {type: 'address', position: 2, label: 'State/Province', required: true},
      {type: 'address', position: 3, label: 'Zip/Post Code', required: true},
      {type: 'text', position: 4, label: 'Telephone Number', required: true},
      {type: 'date', position: 5, label: 'Date of Birth', required: true},
      {type: 'radio', choices: 'Male, Female', position: 6, label: 'Gender', required: true},
      {type: 'radio', choices: 'Rental, Own, Subsidized, Other', position: 7,label: 'Accommodation Type'},
      {type:'radio', choices: 'Phone, Email', position: 8, label: 'Best way to contact'},
      {type: 'textarea', position: 9, label: 'Delivery instructions', required: true},
      {type: 'textarea', position: 10, label: 'Other organizations you are currently receiving assistance from'},
      {type: 'checkbox', choices: 'Foo, Bar', position: 11, label: 'foo'}
    ]
  }, {
    name: 'Employment',
    position: 1,
    fields: [
      {type: 'radio', position: 1, choices: 'Employed, Unemployed, Laid-off, Retired, Disabled, Student', label: 'Current work status'},
      {type: 'text', position: 2, label: 'Hours per week'},
      {type: 'text', position: 3, label: 'Job title'},
    ]
  }, {
    name: 'Food Preferences',
    position: 2,
    fields: [
      {type:'foodPreferences', position: 1, label: 'Please select the foods you are interested in'},
      {type:'textarea',position: 2, label: 'Please list any food allergies or sensitivities'},
      {type: 'textarea', position: 3, label: 'Other food preferences'},
    ]
  }, {
    name: 'Financial Assessment',
    position: 3,
    fields: [
      {label:'Monthly Gross Income', rows: ['Employment Income', 'Employment Insurance Benefits', 'Social Assistance', 'Spousal/Child Support', 'Self Employment', 'Pension Income (eg. Employer Plan)', 'Disability Income', 'Pension Plan', 'Child Tax Benefits', 'Income from Rental Property', 'Severance/Termination Pay', 'Other income not listed above'], columns: ['Self', 'Other'], type: 'table', position: 1},
      {label: 'Monthly Living Expenses', rows: ['Rent, mortgage or room and board', 'Food', 'Utilities (phone, internet, water, heat/hydro)', 'Transportation, parking and other personal supports', 'Dependant Care (eg. day care)', 'Disability Needs', 'Spousal/Child support', 'Loans', 'Leases', 'Insurance', 'Credit card debt', 'Property taxes', 'Other costs not listed above'], columns: ['Household'], type: 'table', position: 2}
    ]
  }, {
    name: 'Household',
    position: 4,
    fields: [
      {type: 'household', position: 0, label: 'Household'}
    ]
  }]
}


export const donorQuestionnaire = {
  name: 'Donor Application',
  identifier: 'qDonors',
  sections: [{
    name: 'General Info',
    position: 0,
    fields: [
      {type: 'address', position: 0, label: 'Street', required:true},
      {type: 'address', position: 1, label: 'Town/City', required:true},
      {type: 'address', position: 2, label: 'State/Province', required:true},
      {type: 'address', position: 3, label: 'Zip/Post Code', required:true},
      {type: 'text', position: 4, label: 'Telephone Number', required:true},
      {type: 'textarea', position: 5,label: 'How did you hear about us?'}
    ]
  }]
}

export const volunteerQuestionnaire = {
  name: 'Volunteer Application',
  identifier: 'qVolunteers',
  sections: [{
    name: 'General Info',
    position: 0,
    fields: [
      {type: 'address', position: 0, label: 'Street', required:true},
      {type: 'address', position: 1, label: 'Town/City', required:true},
      {type: 'address', position: 2, label: 'State/Province', required:true},
      {type: 'address', position: 3, label: 'Zip/Post Code', required:true},
      {type: 'text', position: 4, label: 'Telephone Number', required:true},
      {type: 'date', position: 5, label: 'Date of Birth', required:true},
      {type: 'radio', choices: 'Phone, Email', position: 6, label: 'Best way to contact'},
      {type: 'textarea', position: 7, label: 'How did you hear about us?'},
      {type: 'textarea', position: 8, label: 'Why do you want to volunteer with us?'}
    ]
  }]
}
