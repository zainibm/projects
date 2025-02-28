let myLead = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");

const inputBtn = document.getElementById("input-btn");
inputBtn.addEventListener("click", function () {
  myLead.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLead));
  render(myLead);
  console.log(localStorage.getItem("myLeads"));
});

const ulEl = document.getElementById("ul-el");

const leadsFromLS = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLS) {
  myLead = leadsFromLS;
  render(myLead);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    console.log(leads[i]);
    listItems += `<li><a href='${leads[i]}' target='_blank'>${leads[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}

let deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLead = [];
  render(myLead);
});

let tabBtn = document.getElementById("tab-btn");
tabBtn.addEventListener("click", function () {
  /*
    chrome.tabs is an API
    chrome and tabs are objects => query is a tabs method
    active: true => currently active tab
    currentWindow: true => currently active window
     */
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLead));
    render(myLead);
  });
});
