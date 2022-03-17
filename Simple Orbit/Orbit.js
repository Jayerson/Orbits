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

    console.log(semi_maj, eccentricity);

    for (let time = 0; time < 10000; time += 20) {
        
        let degrees = Math.acos(
                                (
                                    (50 * semi_maj /(time **2) + 0.5)
                                    * (1 - eccentricity) - 1 + Math.PI / 2
                                )
                                    /
                                (
                                    eccentricity * semi_maj
                                )
                            );
        console.log(degrees);

        orbits.ellipse(
            centroid_x,
            centroid_y,
            semi_maj,
            semi_min,
            3*Math.PI/2, 
            degrees/360*2*Math.PI,
            (degrees + 5)/360*2*Math.PI);

        await delay(20);
        orbits.stroke();
    }
}

orbits.beginPath();
orbits.moveTo(centroid_x + 5, focus);
orbits.arc(centroid_x, focus, 5, 0, 2*Math.PI);
orbits.moveTo(centroid_x, centroid_y - 120);
variableSpeed();