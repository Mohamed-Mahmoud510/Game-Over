// ^GLOBAL VARIABL
let itemId = "itemId";
let gameList;
let newItem;
let closeBtn = document.getElementById("closeBtn")
let dataLoader = document.querySelector("#dataLoader")
let detailsLoader = document.querySelector("#detailsLoader")
console.log(detailsLoader);

//^CLOSE BUTTON
closeBtn.addEventListener("click", () => {
    localStorage.clear(itemId)
    document.getElementById("Home").classList.remove("d-none")
    document.getElementById("Home").classList.add("d-block")
    document.getElementById("details").classList.remove("d-flex")
    document.getElementById("details").classList.add("d-none")
})
// ^Loader
function loaderShow() {
    dataLoader.classList.add("d-flex")
    dataLoader.classList.remove("d-none")
    document.getElementById("myData").classList.add("d-none")
    document.getElementById("myData").classList.remove("d-flex")
}
function loaderHide() {
    dataLoader.classList.remove("d-flex")
    dataLoader.classList.add("d-none")
    document.getElementById("myData").classList.remove("d-none")
    document.getElementById("myData").classList.add("d-flex")
}
function loaderShowDetails() {
    detailsLoader.classList.add("d-flex")
    detailsLoader.classList.remove("d-none")
    document.getElementById("details").classList.add("d-none")
    document.getElementById("details").classList.remove("d-flex")
}
function loaderHideDetails() {
    detailsLoader.classList.remove("d-flex")
    detailsLoader.classList.add("d-none")
    document.getElementById("details").classList.remove("d-none")
    document.getElementById("details").classList.add("d-flex")
}

// & FIRST CLASS HOME PAGE
class createItem {
    filterData() {
        const categoryLi = document.querySelectorAll(".navbar ul li a")
        categoryLi.forEach(element => {
            element.addEventListener("click", async () => {
                document.querySelector(".navbar-nav .active").classList.remove("active")
                element.classList.add("active")

                // !LOADER
                loaderShow()

                let currentCategory = await this.getApi(element.innerHTML)
                newItem.display(currentCategory)

                // !CALL ID
                getNumber()
                // !LOADER
                loaderHide()
            })
        });
    }

    async getApi(game) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '450890dcc9msh9cc82cfb6b84450p1c2196jsn7140f38c9077',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${game}`, options);
        const result = await response.json()
        return result
    }

}

// &SECOND CLASS HOME PAGE DISPLAY
class makeItem {
    display(item) {
        let cartoona = ``
        for (let i = 0; i < item.length; i++) {
            cartoona += ` <div class="col-md-6 col-lg-4 col-xl-3">
                                <div data-code=${item[i].id}
                                    class="main-card border border-3 border-dark py-1 px-3 position-relative">
                                    <figure class="my-2">
                                        <img src="${item[i].thumbnail}" class="w-100" alt=${item[i].title} id="imgCaption">
                                        <figcaption>
                                            <div
                                                class="d-flex justify-content-between mt-2 mb-3">
                                                <h2 class="h6 mt-3" id="titleCaption">${item[i].title}</h2>
                                                <button
                                                    class="btn btn-primary px-2 py-1">Free</button>
                                            </div>
                                            <p
                                                class="text-center opacity-50" id="descCaption">${(item[i].short_description).split(" ").splice(0, 8).join(" ")}
                                                Infinite,and</p>
                                        </figcaption>
                                        <footer
                                            class="d-flex align-items-center justify-content-between border-top border-3 border-dark pt-2">
                                            <span class="badge" id="type">${item[i].genre}</span>
                                            <span class="badge"id="place">${item[i].platform}</span>
                                        </footer>
                                    </figure>
                                </div>
                            </div>`
        }
        document.getElementById("myData").innerHTML = cartoona
    }
}
// & GET THE ID OF CURRENT GAME
function getNumber() {
    let mainCard = document.querySelectorAll(".main-card");
    mainCard.forEach(element => {
        element.addEventListener("click", () => {
            const itemCode = element.getAttribute("data-code");
            localStorage.setItem(itemId, JSON.stringify(itemCode))
            document.getElementById("Home").classList.add("d-none")
            document.getElementById("Home").classList.add("d-block")
            document.getElementById("details").classList.add("d-flex")
            document.getElementById("details").classList.remove("d-none")
            loaderShowDetails()
            showItem()
            loaderHideDetails()
        })
    });
}

// & USE 1ST & 2ST ClASSES
async function getItem() {
    const item = new createItem();
    gameList = await item.getApi(`MMORPG`);

    // !LOADER
    loaderShow()

    item.filterData()
    newItem = new makeItem()
    newItem.display(gameList)

    // !CALL ID
    getNumber()

    // !LOADER
    loaderHide()
}
getItem()



// *3RD CLASS GET DETAILS
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
    showDetails(item) {
        let cartoona = ``
        cartoona += ` 
                        <div class="col-md-4">
                            <img src="${item.thumbnail}" class="w-100" alt>
                        </div>
                        <div class="col-md-7">
                            <h3>Title: <strong>${item.title}</strong></h3>
                            <p>Category: <small
                                    class="btn btn-primary">${item.genre}</small></p>
                            <p>Platform: <small
                                    class="btn btn-primary">${item.platform}</small></p>
                            <p>Status: <small
                                    class="btn btn-primary">${item.status}</small></p>
                            <p>${item.description}</p>
                            <a href="${item.game_url}" target="_blank" class="btn btn-secondary fw-bold">Show
                                Game</a>
                        </div>
                    `

        document.getElementById("myDetails").innerHTML = cartoona
    }
}

// *USED 3RD CLASS GET DETAILS
async function showItem() {
    let item = new getDetails()

    // !GET ID FROM LOCATSTORAGE
    loaderShowDetails()
    let localId = JSON.parse(localStorage.getItem(itemId))
    let itemList = await item.getApi(localId)
    item.showDetails(itemList)
    loaderHideDetails()
}

