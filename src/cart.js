let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

//console.log(shopItemsData);
let basket =  JSON.parse(localStorage.getItem("Data")) || [];


let calculation = ()=> {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0);
};

calculation();

//ES6 arrow function
let generateCartItems = () => {
    if(basket.length !== 0) {
        //this will run for all the elements/items in the basket
        //x will target all the data from the local storage one by one then run the function
        return (shoppingCart.innerHTML = basket.map((x) => {
            //console.log(x);
            let {id,item} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            let {img, name, price} = search;//object destructure
            return `
            <div class="cart-item">
                <img width = "100" src ="${img}" alt = ""/> 
                <div class= "details">
                    <div class= "title-price-x">
                        <h4 class = "title-price">
                            <p>${name}</p>
                            <p class = "cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick = "removeItem(${id})" class="bi bi-x"></i>
                    </div>

                    <div class="buttons">
                        <i onclick = "decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick = "increment(${id})" class="bi bi-plus"></i>    
                    </div>
                    
                    <h3>$ ${item * price}</h3>
                </div>
            </div>              
            `;
        }).join(""));//to remove comma use .join("");
    }else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href = "index.html">
            <button class = "HomeBtn">Back to Home</button>
        </a>  
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
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

    generateCartItems();// re-rendering of our cart
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

    generateCartItems();// re-rendering of our cart
    
    localStorage.setItem("Data",JSON.stringify(basket));//put this line at the bottom when all the updates are done to see changes in the local storage

};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);

    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};


let removeItem = (id) => {
    let selectedItem = id;
    //console.log(selectedItem.id);//it will print entire HTML element but why?
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    calculation();//my logic to update cart amount in red
    totalAmount();//to update final amount after cross

    localStorage.setItem("Data",JSON.stringify(basket));
}

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();//to update cart amount
    localStorage.setItem("Data",JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let {id,item} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];

            return item * search.price;
        }).reduce((x,y) => x+y,0);
        //console.log(amount);
        label.innerHTML = `
            <h2>Total Bill : $ ${amount}</h2>
            <button class = "checkOut">Checkout</button>
            <button onclick = "clearCart()" class = "removeAll">Clear Cart</button>
        `;
    }else return;
}

totalAmount();