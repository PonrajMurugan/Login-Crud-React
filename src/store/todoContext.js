import { createContext, useReducer } from 'react';

const TODOITEM = [
  {
    id: 1,
    model: 'Note 10 Pro Max',
    brand: 'Redmi',
    price: 20000,
  },
  {
    id: 2,
    model: 'Note 11 Pro Max',
    brand: 'Redmi',
    price: 22000,
  },
  {
    id: 3,
    model: 'Note 12 Pro Plus',
    brand: 'Redmi',
    price: 25000,
  },
];

export const TodoContext = createContext({
  items: [],
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
});

const itemReducer = (state, action) => {
  switch (action.type) {
    case 'ADDITEM':
      return [...state, action.payload];

    case 'UPDATEITEM': {
      const updateItem = state.map((item) =>
        item.id === action.payload.id ? { ...action.payload } : item
      );
      return updateItem;
    }

    case 'DELETEITEM':
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
};

const TodoContextProvider = ({ children }) => {
  const [items, dispatchItem] = useReducer(itemReducer, TODOITEM);

  const onAddItem = (data) => {
    const newItem = { ...data, id: items.length + 1 };
    dispatchItem({ type: 'ADDITEM', payload: newItem });
  };

  const onUpdateItem = (data) => {
    dispatchItem({ type: 'UPDATEITEM', payload: data });
  };

  const onDeleteItem = (id) => {
    dispatchItem({ type: 'DELETEITEM', id });
  };

  const todoItem = {
    items,
    addItem: onAddItem,
    updateItem: onUpdateItem,
    deleteItem: onDeleteItem,
  };

  return (
    <TodoContext.Provider value={todoItem}>{children}</TodoContext.Provider>
  );
};

export default TodoContextProvider;
