// fetch api for tree inventory

async function getTreeInventory(search) {
    const response = await fetch("https://data.winnipeg.ca/api/v3/views/hfwk-jp4h/query.json");
    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    }

    // Parse and return
    const data = await response.json();
    return data;
}