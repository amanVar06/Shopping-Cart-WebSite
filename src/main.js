let shop = document.getElementById("shop");
//console.log(shop);

let basket =  JSON.parse(localStorage.getItem("Data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x)=>{ 
        //x means running map for all the items
        //destructuring the object //to prevent writing x. multiple times
        let {id, name, price, desc, img} = x;
        let search1 = basket.find((x) => x.id === id) || [];
        return  `
        <div id = product-id-${id} class="item">
                <img width = "220" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price_quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick = "decrement(${id})" class="bi bi-dash"></i>
                            <div id=${id} class="quantity">
                            ${search1.item === undefined? 0 : search1.item}
                            </div>
                            <i onclick = "increment(${id})" class="bi bi-plus"></i>    
                        </div>
                    </div>
                </div>
            </div>`;
    }).join(""));
};

generateShop();

//we gave id to uniquely identify each item

/**
* ? i didn't get how selecteitem.id gets the id and why the thing is printing when i am try to printing selectedItem
**/

let increment = (id) => {
    let selectedItem = id;
    //console.log(selectedItem);//it will print entire HTML element but why?
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    }else{
        search.item += 1;
    }
    //storing in the local storage
    localStorage.setItem("Data",JSON.stringify(basket));

    //console.log(basket);
    update(selectedItem.id);

};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
        return;
    }else if(search.item === 0){
        return;
    }
    else{
        search.item -= 1;
    }
    

    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !== 0);

    //console.log(basket);
    
    localStorage.setItem("Data",JSON.stringify(basket));//put this line at the bottom when all the updates are done to see changes in the local storage

};

//ES6 arrow function

let calculation = ()=> {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0);
    //0 means its a default number 
    //we want the calcultion to  start from 0
    //using map function
    //two arguments x and y one is previous number and another is next number
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);

    document.getElementById(id).innerHTML = search.item;
    calculation();
};

calculation();

//use local storage to preserve the data even after referesh
//built in storage of our browser
//i want specifically basket to store in the local storage
//need to retrieve the data also from the local storage after refresh
