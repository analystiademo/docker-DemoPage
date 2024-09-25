async function saveIPInfoToDB(ipInfo) {
    try {
        const response = await fetch('/save-ipinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ipInfo),  // Convert the ipInfo object to JSON for the request body
        });
    
        // Log the response status for better debugging
        if (!response.ok) {
            // Fetch the error response body for more details
            const errorData = await response.json();
            console.error('Failed to save IP information to the database. Status:', response.status);
            console.error('Error details:', errorData);
        }
        

    } catch (error) {
        // Log the actual error thrown by the fetch operation
        console.error('Error saving IP information to the database:', error.message);
    }
}
