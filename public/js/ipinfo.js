function fetchAndDisplayIPInfo() {
    // Store the fetched IP here
    let ipAddress = '';  

    // Fetch public IP address from GeoJS
    fetch('https://get.geojs.io/v1/ip.json')
        .then(response => response.json())
        .then(ipData => {
            ipAddress = ipData.ip;
            document.getElementById('ip').textContent = ipAddress;
            // Fetch location data from GeoJS using the fetched IP
            return fetch(`https://get.geojs.io/v1/ip/geo/${ipAddress}.json`);
        })
        .then(response => response.json())
        .then(data => {
            // Populate table with GeoJS data
            document.getElementById('city').textContent = data.city || 'N/A';
            document.getElementById('region').textContent = data.region || 'N/A';
            document.getElementById('country').textContent = data.country || 'N/A';
            document.getElementById('loc').textContent = `${data.latitude}, ${data.longitude}` || 'N/A';
            document.getElementById('org').textContent = data.organization || 'N/A';
            document.getElementById('timezone').textContent = data.timezone || 'N/A';
            document.getElementById('accuracy').textContent = data.accuracy || 'N/A';
            document.getElementById('area_code').textContent = data.area_code || 'N/A';
            document.getElementById('asn').textContent = data.asn || 'N/A';
            document.getElementById('continent_code').textContent = data.continent_code || 'N/A';
            document.getElementById('country_code').textContent = data.country_code || 'N/A';
            document.getElementById('country_code3').textContent = data.country_code3 || 'N/A';
            document.getElementById('organization_name').textContent = data.organization_name || 'N/A';
            document.getElementById('ptr').textContent = data.ptr || 'N/A';
            document.getElementById('postal').textContent = data.postal || 'N/A';
            document.getElementById('timestamp').textContent = new Date().toISOString().slice(0, 19).replace('T', ' ');

            // Construct the ipInfo object using the fetched IP and GeoJS data
            const ipInfo = {
                ip: ipAddress || 'N/A',  // Use the previously fetched IP address
                city: data.city || 'N/A',
                region: data.region || 'N/A',
                country: data.country || 'N/A',
                loc: `${data.latitude}, ${data.longitude}` || 'N/A',
                org: data.organization || 'N/A',
                accuracy: data.accuracy || 'N/A',
                area_code: data.area_code || 'N/A',
                asn: data.asn || 'N/A',
                continent_code: data.continent_code || 'N/A',
                country_code: data.country_code || 'N/A',
                country_code3: data.country_code3 || 'N/A',
                organization_name: data.organization_name || 'N/A',
                ptr: data.ptr || 'N/A',
                postal: data.postal || 'N/A',
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };
            // Save the full data to the database
            saveIPInfoToDB(ipInfo);
        })
        .catch(error => {
            console.error('Error fetching IP or location information:', error);
            document.getElementById('error').textContent = 'Error fetching IP or location information.';
        });
}

// Run the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchAndDisplayIPInfo);
