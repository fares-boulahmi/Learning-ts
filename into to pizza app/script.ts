type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};
type OrderHistory = {
  orderQueue: Order;
  timeAdded: any;
};

let pizzaIds = 1;
const menu: Pizza[] = [
  { id: pizzaIds++, name: "Margherita", price: 8 },
  { id: pizzaIds++, name: "Pepperoni", price: 10 },
  { id: pizzaIds++, name: "Hawaiian", price: 10 },
  { id: pizzaIds++, name: "Veggie", price: 9 },
];

let cashInRegister = 100;
const orderQueue: Order[] = [];
const orderHistory: OrderHistory[] = [];
let orderId = 1;

function addNewPizza(newPizza: Omit<Pizza, "id">): Pizza {
  const pizza: Pizza = { id: pizzaIds++, ...newPizza };
  menu.push(pizza);
  return pizza;
}

function placeOrder(name: string): Order {
  let orderedPizza: Pizza | undefined = menu.find(
    (order) => order.name == name,
  );
  if (!orderedPizza) {
    throw new Error(`the order ${name} is not found `);
  }
  cashInRegister += orderedPizza.price;
  const orderPlaced: Order = {
    id: orderId++,
    pizza: orderedPizza,
    status: "ordered",
  };
  orderQueue.push(orderPlaced);
  return orderPlaced;
}

function completeOrder(orderId: number): Order {
  const order: Order | undefined = orderQueue.find(
    (order) => order.id == orderId,
  );
  if (!order) {
    throw new Error(`the order with the id ${orderId} is not found `);
  }
  order.status = "completed";
  orderHistory.push({
    orderQueue: order,
    timeAdded: new Date(Date.now()),
  });
  return order;
}

function getPizzaDetail(identifier: number | string) {
  let pizza: Pizza | undefined;
  if (typeof identifier === "string") {
    pizza = menu.find(
      (pizzaObj) => pizzaObj.name.toLowerCase() === identifier.toLowerCase(),
    );
  } else if (typeof identifier === "number") {
    pizza = menu.find((pizzaObj) => pizzaObj.id === identifier);
  } else {
    throw new TypeError("the `identifier` must be a number or string type ");
  }
  if (!pizza) {
    console.log(`the pizza with identifier ${identifier} not found  `);
    return;
  } else {
    console.log(pizza);
    return pizza;
  }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

placeOrder("Chicken Bacon Ranch");
completeOrder(1);
console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order que:", menu);
console.log("order history :", orderHistory);

getPizzaDetail(5);
getPizzaDetail(4);
getPizzaDetail("Chicken Bacon Ranch");
getPizzaDetail(15);

console.log(
  "generitcs challenge -------------------------------------------------------------------------------",
);
console.log(
  "------------------------------------------------------------------------------------------",
);
console.log(
  "------------------------------------------------------------------------------------------",
);

function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

// example usage:
console.log(
  addToArray(menu, { id: pizzaIds++, name: "Chicken Bacon Ranch", price: 12 }),
);
console.log(
  addToArray<Order>(orderQueue, {
    id: orderId++,
    pizza: menu[2],
    status: "completed",
  }),
);
