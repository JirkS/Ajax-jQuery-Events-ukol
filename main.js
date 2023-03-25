class Item {
    constructor(img, name, price){
        this.img = img;
        this.name = name;
        this.price = price;
    }

    Img(){
        return this.img;
    }

    Name(){
        return this.name;
    }
    
    Price(){
        return this.price;
    }

}

let pocet;

function neco(kolikrat){
    let url = "";
    let i = 0;
    
    if($("#content").attr("data-mode") === "cards"){
        $("#content").html("");
    } else {
        $("#tbody").empty();
    }

    $(".loader").hide(0).fadeOut(1700);
    $(".content").hide(0).fadeIn(1700);
    for (i; i < kolikrat; i++) {
        switch(i){
            case 0:
                url = "https://api.coingecko.com/api/v3/coins/binance-bitcoin";
                break;
            case 1:
                url = "https://api.coingecko.com/api/v3/coins/rabbitking";
                break;
            case 2:
                url = "https://api.coingecko.com/api/v3/coins/shoot";
                break;
            case 3:
                url = "https://api.coingecko.com/api/v3/coins/signum";
                break;
            case 4:
                url = "https://api.coingecko.com/api/v3/coins/temple";
                break;
            case 5:
                url = "https://api.coingecko.com/api/v3/coins/simracer-coin";
                break;
            case 6:
                url = "https://api.coingecko.com/api/v3/coins/zynecoin";
                break;
            case 7:
                url = "https://api.coingecko.com/api/v3/coins/daovc";
                break;
            case 8:
                url = "https://api.coingecko.com/api/v3/coins/bitcoinbam";
                break;
        }
        necoDalsiho(url, false);
    }
}

function addItem(item) {
    const mode = $("#content").attr("data-mode");
        if (mode == null || mode == "" || mode == undefined) {
            console.error("Attribute data-mode not found!");
            return;
        }
        let row;
        let cell;
        let cellText;
        let img;

        switch (mode) {
            case "lines":
                row = document.createElement("tr"); // pouzivam createElement, protoze tato metoda je zhruba 4x rychlejsi, nez vytvaret tag pomoci jQuery
        
                cell = document.createElement("td");
                img = document.createElement("img");
                img.src = item.Img();
                img.setAttribute("style", "width: 25px; height: auto;");
                cell.appendChild(img);
                row.addEventListener("mouseover", () => {
                    row.setAttribute("class", "bg-warning");
                }, false);
                row.addEventListener("mouseleave", () => {
                    row.setAttribute("class", "bg-dark");
                }, false);
                row.appendChild(cell);

                cell = document.createElement("td");
                cell.setAttribute("class", "text-light");
                cellText = document.createTextNode(item.Name());
                cell.appendChild(cellText);
                row.appendChild(cell);

                cell = document.createElement("td");
                cell.setAttribute("class", "text-light");
                cellText = document.createTextNode(item.Price());
                cell.appendChild(cellText);
                row.appendChild(cell);

                $("#tbody")[0].appendChild(row);
                break;
            case "cards":
                const div = document.createElement("div"); // pouzivam createElement, protoze tato metoda je priblizne 4x rychlejsi, nez vytvaret tag pomoci jQuery
                      div.setAttribute("class", "card m-4");
                      div.setAttribute("style", "width: 20rem");
                        img = document.createElement("img");
                        img.src = item.Img();
                        img.setAttribute("class", "card-img-top");
                        const div2 = document.createElement("div");
                                div2.setAttribute("class", "card-body");
                                    cell = document.createElement("h4");
                                    cell.setAttribute("class", "card-title");
                                    cellText = document.createTextNode("Name: " +item.Name());
                                    cell.appendChild(cellText);
                                div2.appendChild(cell);
                                    cell = document.createElement("p");
                                    cell.setAttribute("class", "card-text");
                                    cellText = document.createTextNode("Price: " +item.Price());
                                    cell.appendChild(cellText);
                                div2.appendChild(cell);
                      div.appendChild(img);
                      div.appendChild(div2);
                $("#content").append(div);
                break;
    }
}

function start(){
    pocet = JSON.parse(localStorage.getItem("pocet"));
    if(pocet === null || pocet === undefined || pocet === ""){
        pocet = 9;
    }
    neco(pocet);
}
start();

function necoDalsiho(myUrl){
    $.ajax({
        type: "GET",
        url: myUrl,
        success: function(data){
          if (data === null || data === undefined || data === "") {
                alert("Error, JSON data nejsou dostupne.");
          } else {
                let item = new Item(data.image.large, data.name, data.market_data.current_price.eur);
                addItem(item);
          }
        },
    });
}

document.addEventListener('keypress', (event) => {
    if(event.code === "KeyR"){
        start();
    }
}, false);

document.addEventListener('keypress', (event) => {
    if(event.code.includes("Digit")){
        pocet = event.key;
        localStorage.setItem("pocet", JSON.stringify(pocet));
    }
}, false);

document.addEventListener('keypress', (event) => {
    if(event.code === "KeyC"){
        localStorage.clear();
    }
}, false);