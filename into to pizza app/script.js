const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
]

let cashInRegister = 100
const orderQueue = []

/**
 * Challenge: Add a utility function "addNewPizza" that takes a pizza object
 * and adds it to the menu.
 */ 

function addNewPizza(name , price ) {
  return  menu.push({name, price});
    
}

// Instructor Code 
/**
    function addNewPizza(pizzaObj) {
        menu.push(pizzaObj)
    }
*/


/**
 * Write another utility function, placeOrder, that takes a pizza name parameter and:
 * 1. finds that pizza object in the menu,
 * 2. adds the income to the cashInRegister,
 * 3. pushes a new "order object" to the orderQueue 
 *    (e.g. { pizza: selectedPizzaObjectFromStep1, status: "ordered" })
 * 4. returns the new order object (just in case we need it later)
 */
function placeOrder(name) {
    let orderedPizza ;
    for (let i = 0 ; i < menu.length ; i++) {
        if (menu[i].name == name) {
            orderedPizza = menu[i] ; 
            break;
        }
    } 
    cashInRegister += orderedPizza.price ;
    orderQueue.push({pizza: orderedPizza , status : "ordered"});
    console.log(`the pizza was ordered is ${name} and the price is ${orderedPizza.price} and the cashinorder after order become ${cashInRegister} and the order  is the return value next .`);
    return console.log(orderQueue[orderQueue.length - 1]);

    
}
placeOrder("Pepperoni");

// Instructor Code 
/**
    function placeOrder(pizzaName) {
        const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
        cashInRegister += selectedPizza.price
        const newOrder = { pizza: selectedPizza, status: "ordered" }
        orderQueue.push(newOrder)
        return newOrder
    }
*/
