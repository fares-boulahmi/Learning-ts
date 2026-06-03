const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
]

let cashInRegister = 100
const orderQueue = [];
let orderId = 1;

/**
 * Challenge: Add a utility function "addNewPizza" that takes a pizza object
 * and adds it to the menu.
 */ 

function addNewPizza(order) {
  return  menu.push(order);
    
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
    orderQueue.push({id: orderId++ ,  pizza: orderedPizza , status : "ordered"});
    console.log(`the pizza was ordered is ${name} and the price is ${orderedPizza.price} and the cashinorder after order become ${cashInRegister} and the order  is the return value next ${orderQueue[orderQueue.length - 1]}.`);
    return orderQueue[orderQueue.length - 1];

    
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




/**
 * Challenge: write another utility function, completeOrder, that takes an orderId as a parameter
 * finds the correct order in the orderQueue, and marks its status as "completed". For good measure,
 * return the found order from the function.
 * 
 * Note: you'll need to ensure that we're adding IDs to our orders when we create new orders. You can use a global `nextOrderId` variable and increment it every time a new order is created to simulate real IDs being managed for us by a database.
 */

function completeOrder(orderId) {
    let orderCompleted ;
    for (let i = 0; i < orderQueue.length; i++) {
        if (orderQueue[i].id == orderId) {
            orderQueue[i].status = "completed" ;
            orderCompleted = orderQueue[i];
        }
    }
    return orderCompleted;
}


// Instructor Code 
/**
function completeOrder(orderId) {
    const order = orderQueue.find(order => order.id === orderId)
    order.status = "completed"
    return order
}
*/


addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order que:", menu)

export {};