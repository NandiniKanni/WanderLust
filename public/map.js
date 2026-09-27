mapboxgl.accessToken=maptoken;
const map = new mapboxgl.Map({ 
        accessToken: maptoken,
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
    console.log(coordinates);
const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates) // listing.geometry.coordinates
    .addTo(map);//shift these coords through ejs to show as did with tokens!