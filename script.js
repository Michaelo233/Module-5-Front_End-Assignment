async function getTreeInventory(search) {
    
    const apiUrl = `https://data.winnipeg.ca/resource/hfwk-jp4h.json?` + 
                    `$where=common_name LIKE '%${treeInput.value}%'` + 
                    '&$order=diameter_at_breast_height DESC' +
                    '&$limit=100';
    const encodedURL = encodeURI(apiUrl);
    
    const response = await fetch(encodedURL);
    try {
        
        if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
        }

        // Parse and return
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

async function displayTreeInventory() {
    try {
        const data = await getTreeInventory();
        display.innerHTML = '';
        data.forEach(tree => {
            
            const treeTable = Object.entries(tree).map(item => ({
                treeID: item[0],
                commonName: item[2],
                botanicalName: item[1],
                neighbourhood: item[4]
            }));
            console.log(tree)
            console.table(treeTable.slice(0, 20));
            

        });



    } catch (error) {
        console.error("Failed to display data:", error);
    }

}
