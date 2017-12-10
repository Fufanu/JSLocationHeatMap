const INTENSITY = 150;
const RADIUS = 15;
const OPACITY = 0.6;
var map;
var heatmap;
var locations;
var pointArray;


function initMap() {

  locations = [];
  pointArray = new google.maps.MVCArray(locations);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: new google.maps.LatLng(54.8116, 9.48432),
    mapTypeId: 'roadmap'
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    map: map,
    maxIntensity: INTENSITY,
    radius: RADIUS,
    opacity: OPACITY
  });

  let start = 0;
  const LIMIT = 10000;
  while(start < 900000) {
    fetch(`/locations?start=${start}&limit=${LIMIT}`)
      .then((response) => {
        response.json()
          .then((result) => {
            result.forEach((val) => {
              pointArray.push( new google.maps.LatLng(val.latitudeE7 * (10 ** -7), val.longitudeE7 * (10 ** -7)));
            });
          });
      });
    start = start + LIMIT - 1;
  }
}

// Function to change the radius of data points on heatmap
function changeRadius(bool) {
  const step = 3, min = 0, max = 50;
  let current = heatmap.get('radius');
  let newValue = toggleUpDown(bool, current, step, min, max);
  heatmap.set('radius', newValue);
  document.getElementById("radiusNum").innerText = newValue;
}

// Function to change maxIntensity of the heatmap
function changeIntensity(bool) {
  const step = 25, min = 0, max = 1000;
  let current = heatmap.get('maxIntensity');
  let newValue = toggleUpDown(bool, current, step, min, max);
  heatmap.set('maxIntensity', newValue);
  document.getElementById("intensityNum").innerText = newValue;
}

// Changes our toggle values and keeps them within min/max values
function toggleUpDown(bool, current, step, min, max){
  if (bool && current >= max) return current;
  if (!bool && current <= min) return current;
  if (bool) return current + step;
  return current - step;
}
