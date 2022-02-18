const canvas = document.getElementById('sol');
const orbits = canvas.getContext('2d');

orbits.beginPath();
orbits.ellipse(150, 150, 120, 60, 3*Math.PI/4, 0, 2*Math.PI);
orbits.stroke();