const fetchArtistsBtn = document.getElementById('fetchArtistsBtn');
const artistContainer = document.getElementById('artistContainer');
const apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';

// Function to fetch and display artist details
const displayArtistDetails = async () => {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Clear previous artist details
        artistContainer.innerHTML = '';

        // Loop through a subset of object IDs (for demonstration)
        const objectIds = data.objectIDs.slice(0, 15);
        for (const objectId of objectIds) {
            try {
                // Fetch details for each object ID
                const objResponse = await fetch(`${apiUrl}/${objectId}`);
                if (!objResponse.ok) {
                    throw new Error(`Failed to fetch object with ID: ${objectId}`);
                }
                const objData = await objResponse.json();
                
                // Extract artist details
                const artistName = objData.artistDisplayName || 'Unknown';
                const artistBio = objData.artistDisplayBio || 'No biography available';
                const artistImage = objData.additionalImages || '';

                // Create a div to display artist details
                const artistDiv = document.createElement('div');
                artistDiv.classList.add('artistDetails');
                artistDiv.innerHTML = `
                    <h3>${artistName}</h3>
                    <h5>${artistBio}</h5>
                    <img src="${artistImage}" alt="${artistName}" width="200">
                `;
                console.log(artistImage);

                // Append the artist div to the container
                artistContainer.appendChild(artistDiv);
            } catch (error) {
                console.error(`Error fetching object details for ID: ${objectId}`, error);
                // Handle error if needed
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
    }
};

// Event listener for the button click
fetchArtistsBtn.addEventListener('click', displayArtistDetails);
