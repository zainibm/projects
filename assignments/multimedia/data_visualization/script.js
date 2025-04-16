var xValues = ["Chloe", "Olivia", "Mia", "Emma", "Sophia", "Amelia", "Charlotte", "Emily", "Grace", "Isabella"];
var yValues = [131, 109, 88, 71, 71, 60, 57, 53, 48, 43];
var barColors = ["darkred", "darksalmon", "darkseagreen", "darkslateblue", "lightblue", "lightcoral", "lightgoldenrodyellow", "lightpink", "mediumorchid", "slateblue"];

new Chart("barCanvas", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Popular Baby Names"
    }
  }
});

var x_Values = ["Asian", "Black or African American", "Hispanic/Latino", "Indigenous American or Alaskan Native", "Native Hawaiian or Other Pacific Islander", "Other", "Mixed (Two or More Races)", "White"];
var y_Values = [2518, 2798, 2670, 11, 11, 349, 373, 2926];
var bar_Colors = ["darkred", "darkseagreen", "lightblue", "lightcoral", "lightgoldenrodyellow", "lightpink", "mediumorchid", "slateblue"];

new Chart("pieCanvas", {
  type: "pie",
  data: {
    labels: x_Values,
    datasets: [{
      backgroundColor: bar_Colors,
      data: y_Values
    }]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Brooklyn College Student Body Ethnic/Racial Diversity"
    }
  }
});
