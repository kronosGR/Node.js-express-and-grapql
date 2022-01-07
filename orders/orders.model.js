const orders = [
  {
    date: '2005-05-05',
    subtotal: 90.22,
    item: [
      {
        product: {
          id: 'redshoe',
          description: 'Old red Shore',
          price: 45.11,
        },
        quantity: 2,
      },
    ],
  },
];

function getAllOrders(){
  return orders;
}

module.exports = {
  getAllOrders
}