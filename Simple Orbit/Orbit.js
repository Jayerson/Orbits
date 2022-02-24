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
    const start = Date.now();
    
    for (let degrees = 0; degrees < 360; degrees+=5) {
        let startloop = Date.now()/1000;

        segment_time(degrees);

        orbits.ellipse(
            centroid_x,
            centroid_y,
            semi_maj,
            semi_min,
            3*Math.PI/2, 
            degrees/360*2*Math.PI,
            (degrees + 5)/360*2*Math.PI);

        await delay(segment_time);
        orbits.stroke();
        
        let endloop = Date.now()/1000;
        console.log(endloop - startloop);
    }
    console.log((Date.now() - start)/1000);
}

function segment_time(degrees) {
    let dist_angle = semi_maj * (1 - eccentricity ** 2) /
        (1 - eccentricity * Math.cos(degrees/360*2*Math.PI) - Math.PI/2);
    let segment_speed = Math.sqrt(Math.abs(2/dist_angle - 1/semi_maj));
    return Math.round(10/segment_speed);
}

orbits.beginPath();
orbits.moveTo(centroid_x + 5, focus);
orbits.arc(centroid_x, focus, 5, 0, 2*Math.PI);
orbits.moveTo(centroid_x, centroid_y - 120);
variableSpeed();