const fetchArtistsBtn = document.getElementById('fetchArtistsBtn');
const artistContainer = document.getElementById('artistContainer');
const apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]';

const displayArtistDetails = async () => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        artistContainer.innerHTML = '';

        const objectIds = data.objectIDs.slice(0, 15);
        for (const objectId of objectIds) {
            try {
                const objResponse = await fetch(`${apiUrl}/${objectId}`);
                if (!objResponse.ok) {
                    throw new Error(`Failed to fetch object with ID: ${objectId}`);
                }
                const objData = await objResponse.json();
                
                const artistName = objData.artistDisplayName || 'Unknown';
                const artistBio = objData.artistDisplayBio || 'No biography available';
                const artistImage = objData.additionalImages || '';

                const artistDiv = document.createElement('div');
                artistDiv.classList.add('artistDetails');
                artistDiv.innerHTML = `
                    <h3>${artistName}</h3>
                    <h5>${artistBio}</h5>
                    <img src="${artistImage}" alt="${artistName}" width="200">
                `;
                console.log(artistImage);

                artistContainer.appendChild(artistDiv);
            } catch (error) {
                console.error(`Error fetching object details for ID: ${objectId}`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchArtistsBtn.addEventListener('click', displayArtistDetails);
