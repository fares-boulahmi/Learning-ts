const menu: any[] = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

type orderParams = {
  name: string;
  price: number;
};

type orderQueueType = {
  id: number;
  pizza: orderParams;
  status: string;
};

let cashInRegister = 100;
const orderQueue: any[] = [];
let orderId = 1;

function addNewPizza(order: orderParams) {
  return menu.push(order);
}

function placeOrder(name: string) {
  let orderedPizza: orderParams = menu.find((order) => order.name == name);
  if (!orderedPizza) {
    console.error(`the order ${name} is not found `);
    return;
  }
  cashInRegister += orderedPizza.price;
  const orderPlaced: orderQueueType = {
    id: orderId++,
    pizza: orderedPizza,
    status: "ordered",
  };
  orderQueue.push(orderPlaced);
  return orderPlaced;
}

function completeOrder(orderId: number) {
  const order = orderQueue.find((order) => order.id == orderId);
  order.status = "completed";
  return order;
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

placeOrder("Chicken Bacon Ranch");
completeOrder(1);
console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order que:", menu);
