async function fetchPotatos() {
    const response = await fetch('http://localhost:2015/russet.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const json = await response.json();

    console.log(json.data);
}

fetchPotatos();