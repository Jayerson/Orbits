const canvas = document.getElementById('sol');
const orbits = canvas.getContext('2d');

let centroid_x = 150;
let centroid_y = 150;
let semi_maj = 120;
let semi_min = 100;

// set central body as focus
let focus = centroid_y - Math.sqrt((semi_maj ** 2) - (semi_min ** 2));

// equal-area time
let eccentricity = Math.sqrt(1 - ((semi_min/semi_maj)**2) );

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const variableSpeed = async () => {
    for (let degrees = 0; degrees < 360; degrees++) {
        let dist_angle = 
            semi_maj * (1 - eccentricity ** 2) /
            (1 - eccentricity * Math.cos(degrees/360*2*Math.PI) - Math.PI/2);
        let segment_speed = Math.sqrt(2/dist_angle - 1/semi_maj);
        let segment_time = Math.round(1/segment_speed);
        orbits.ellipse(centroid_x, centroid_y, semi_maj, semi_min, 3*Math.PI/2, 
            degrees/360*2*Math.PI, (degrees + 1)/360*2*Math.PI);
        let x = await delay(segment_time);
        console.log(x);
        orbits.stroke();
    }
}

orbits.beginPath();
orbits.moveTo(centroid_x + 5, focus);
orbits.arc(centroid_x, focus, 5, 0, 2*Math.PI);
// x, y, x (major) radius, y (minor) radius, rot@, start@, end@
orbits.moveTo(centroid_x, centroid_y - 120);
variableSpeed();
orbits.stroke();

