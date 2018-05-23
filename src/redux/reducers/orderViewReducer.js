const orderView = (state = [], action) =>{
    switch (action.type) {
        case 'ORDER_VIEW':
          return [...state,action.payload];
        default:
          return state;
      }
}
export default orderView;