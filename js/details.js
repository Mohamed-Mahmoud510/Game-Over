
class getDetails {
    async getApi(itemId) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '450890dcc9msh9cc82cfb6b84450p1c2196jsn7140f38c9077',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        let httpRq = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${itemId ? itemId : `1`}`, options)
        let data = await httpRq.json()
        return data;
    }
}


async function showItem() {
    let item = new getDetails()
    let localId = JSON.parse(localStorage.getItem(itemId))
    let itemList = await item.getApi(localId)
    console.log(itemList);
    console.log("asd");
}
if (document.getElementById("details").classList.contains("d-flex")) {
    showItem()
}
else {
    console.log("dddd");
}
