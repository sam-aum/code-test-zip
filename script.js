console.log('js:loaded')

//listen for submit
document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);

//listen for delete
document.querySelector('body').addEventListener('click', deleteLocation);


function getLocationInfo(e){
    const zip = document.querySelector('.zip').value;

    let url = `https://api.zippopotam.us/us/${zip}`

    fetch(url)
        .then(res => {
            if(res.status != 200){
                showIcon('trash');
                document.querySelector('#output').innerHTML = 
                `
                    <article class="message is-danger">
                    <div class="message-body">Invalid Zipcode, please try again
                    </div></article>
                `;
                throw Error(res.statusText);
            } else{
                showIcon('check');
                return res.json()
            }
        })
        
        .then(data => {
            let output = '';
            data.places.forEach(place => {
                output += `
                    <article class="message is-primary">
                        <div class="message-header">
                            <p>Location Info</p>
                            <button class="delete"></button>                          
                        </div>  
                        <div class="message-body">
                            <ul>
                                <li><strong>City: </strong>${place['place name']}</li>
                                <li><strong>State: </strong>${place['state']}</li>
                                <li><strong>Longitude: </strong>${place['longitude']}</li>
                                <li><strong>Latitude: </strong>${place['latitude']}</li>
                            </ul>
                        </div>  
                    </article>
                `;
            });

            //insert into output div
            document.querySelector('#output').innerHTML = output;

        }) 

        .catch(err => console.log(err));

    e.preventDefault();
}

//check icon
function showIcon(icon){
    // Clear Icons
    document.querySelector('.icon-trash').style.display = 'none';
    document.querySelector('.icon-check').style.display = 'none';
    

    // Show Correct Icons
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}


// delete function
function deleteLocation(e){
    if(e.target.className =='delete'){
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = '';
        document.querySelector('.icon-check').remove();
    }
}
