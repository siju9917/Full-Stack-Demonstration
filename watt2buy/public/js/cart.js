localStorage.clear();

let items;
// loadCart();

// show cart
(function(){
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    })
})();

function loadCart(){
    if(localStorage.getItem('items')){
        items = JSON.parse(localStorage.getItem('items'));   
    }

    console.log(items[0].name);
  

    if(items.length > 0){
        for(let i = 0 ; i < items.length; i++){
            
            const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
                    cartItem.innerHTML = `
                        <img src="${items[i].image}" class="img-fluid rounded-circle" id="item-img" alt="">
                        
                        <div class="item-text">
                        <p id="cart-item-title" class="font-weight-bold mb-0">${items[i].name}</p>
                        <span>$</span>
                        <span id="cart-item-price" class="cart-item-price" class="mb-0">${items[i].price}</span>
                        </div>
    
                        <a href="#" id='cart-item-remove' class="cart-item-remove">
                        <i class="fas fa-trash"></i>
                        </a>
    
                    </div>`;
    
                    const cart = document.getElementById('cart');
                    const total = document.querySelector('.cart-total-container');
    
                    cart.insertBefore(cartItem, total);
                    showTotals();
        }
    }
}


// add items to cart
(function(){

    const cartBtn = document.querySelectorAll('.store-item-icon');
    items = [];

    // cart button
    cartBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){
            if(event.target.parentElement.classList.contains('store-item-icon')){
                
                let fullPath = event.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf("img") + 3;
                let partPath = fullPath.slice(pos);

                imagePath = `img-cart${partPath}` 
                const item = {};
                item.img = imagePath;
                
                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name = name;

                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                let finalPrice = price.slice(1).trim();
                finalPrice = Number(finalPrice.replace(/[^0-9\.-]+/g,""));
                item.price = finalPrice;

                // get id for checkout
                let shopItem = event.target.parentElement.parentElement.parentElement.parentElement;
                let id = shopItem.dataset.itemId;

                // console.log(partPath);
                // console.log(name);
                // console.log(price);
                // console.log(item);


                const cartItem = document.createElement('div');
                cartItem.dataset.itemId = id;
                cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
                cartItem.innerHTML = `
                    <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                    
                    <div class="item-text">
                    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                    <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                    </div>

                    <a href="#" id='cart-item-remove' class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                    </a>

                </div>`;

                const cart = document.getElementById('cart');
                const total = document.querySelector('.cart-total-container');

                cart.insertBefore(cartItem, total);
                showTotals();
                

                // local storage
                
                if(localStorage.getItem('items')){
                    items = JSON.parse(localStorage.getItem('items'));
                }
                
                items.push({'name' : name, 'image' : imagePath, 'price' : finalPrice});
                localStorage.setItem('items', JSON.stringify(items));
            }
            
            // CreateCookie("itemslist",JSON.stringify(item),1);

            const removeBtn = document.getElementsByClassName('cart-item-remove');
        
            for(var i = 0; i < removeBtn.length; i++){
                var button = removeBtn[i];
                button.addEventListener('click', function(event){
                    var btnClicked = event.target;
                    btnClicked.parentElement.parentElement.remove();
                    // console.log(btnClicked.parentElement);
                    showTotals();
                })
            }


           

        })
    })

    


    // show totals
    function showTotals(){
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');
        // console.log(items);
        if(items.length === 0){
            document.getElementById('cart-total').textContent = 0;
            document.querySelector('.item-total').textContent = 0;
            document.getElementById('item-count').textContent = 0;
        }
        items.forEach(function(item){
            total.push(parseFloat(item.textContent));

            const totalMoney = total.reduce(function(total, item){
                total += item;
                return total;
            },0);

            const finalMoney = totalMoney.toFixed(2);

            document.getElementById('cart-total').textContent = finalMoney;
            document.querySelector('.item-total').textContent = finalMoney;
            document.getElementById('item-count').textContent = total.length;
    
            
            return [finalMoney, total.length];

        });
    }


})();



function clearCart(){
   
    document.querySelectorAll('.cart-item').forEach(e => e.remove());
    document.getElementById('cart-total').textContent = 0;
    document.querySelector('.item-total').textContent = 0;
    document.getElementById('item-count').textContent = 0;
}


let stripeHandler = StripeCheckout.configure({
    key : stripePublicKey,
    locale : 'en',
    token : function(token) {
        // console.log(token);
        var pur_items = [];
        // var cartItemContainer = document.getElementsByClassName('cart')[0];
        var cartRows = document.getElementsByClassName('cart-item');
        for(var i = 0; i < cartRows.length; i++){
            var cartRow = cartRows[i];
            var id = cartRow.dataset.itemId;
            pur_items.push({
                id: id
            })
        }

        fetch('/purchase', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                stripeTokenId : token.id,
                items : pur_items
            })
        }).then(function(res){
            return res.json();
        }).then(function(data){
            alert(data.message);
            clearCart();
        }).catch(function(error){
            console.error(error);
        })
    }
})
function purchaseClicked(){
    let priceElement = document.getElementsByClassName('item-total'[0]);
    let price = parseFloat(priceElement.innerHTML);
    console.log(price);
    stripeHandler.open({
        amount : price
    })
}