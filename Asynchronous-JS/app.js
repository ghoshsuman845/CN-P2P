let stocks = {
  fruits: ["strawberry", "banana", "apple", "mango", "grapes", "sitaphal"],
  liquid: ["milk", "ice"],
  holder: ["cone", "cup", "stick"],
  toppings: ["chocolate", "sprinkles"],
};

// callback

let orderIceCream = (fruitName, call_production) => {
  console.log("order is placed");

  setTimeout(() => {
    console.log(`${stocks.fruits[fruitName]} has been selected by customer`);
    call_production();
  }, 2000);
};
let production = () => {
  setTimeout(() => {
    console.log("production has started");
    setTimeout(() => {
      console.log("the fruit has been chopped");
      setTimeout(() => {
        console.log(`${stocks.liquid[0]} ${stocks.liquid[1]} are added`);
        setTimeout(() => {
          console.log("start the machine");
          setTimeout(() => {
            console.log(`ice cream placed on ${stocks.holder[1]}`);
            setTimeout(() => {
              console.log(`${stocks.toppings[0]} as toppings`);
              setTimeout(() => {
                console.log("serve ice cream");
              }, 1000);
            }, 3000);
          }, 2000);
        }, 1000);
      }, 1000);
    }, 2000);
  }, 0);
};

orderIceCream(1, production);

// Resolved => ice cream delivered
// Rejected => customer hasn't received the ice cream

const is_shop_open = true;

let order = (time, work) => {
  return new Promise((resolve, reject) => {
    if (is_shop_open) {
      setTimeout(() => {
        resolve(work());
      }, time);
    } else reject(console.log("our shop is closed"));
  });
};

order(2000, () => console.log(`${stocks.fruits[0]} was selected`))
  .then(() => {
    return order(0, () => console.log("production has started"));
  })
  .then(() => {
    return order(1000, () => console.log("the fruit has been chopped"));
  })
  .then(() => {
    return order(2000, () =>
      console.log(`${stocks.liquid[0]} ${stocks.liquid[1]} are added`)
    );
  })
  .then(() => {
    return order(1000, () => console.log("start the machine"));
  })
  .then(() => {
    return order(2000, () =>
      console.log(`ice cream placed on ${stocks.holder[1]}`)
    );
  })
  .then(() => {
    return order(2000, () => console.log("serve ice cream"));
  })
  .catch(() => console.log("customer left"))
  .finally(() => console.log("day ended, shop is closed"));

// async await

let startProduction = async () => {
  try {
    await order(2000, () => console.log(`${stocks.fruits[0]} was selected`));
    await order(0, () => console.log("production has started"));
    await order(1000, () => console.log("the fruit has been chopped"));
    await order(2000, () =>
      console.log(`${stocks.liquid[0]} ${stocks.liquid[1]} are added`)
    );
    await order(1000, () => console.log("start the machine"));
    await order(2000, () =>
      console.log(`ice cream placed on ${stocks.holder[1]}`)
    );
    await order(2000, () => console.log("serve ice cream"));
  } catch (error) {
    console.log("customer left");
  } finally {
    console.log("day ended, shop is closed");
  }
};
console.log("start the production ==> ");

production();
