import React, { useContext, useState } from 'react';
import './crud.css';
import { TodoContext } from '../../store/todoContext';
import Button from 'react-bootstrap/Button';

const Todo = () => {
  const { items, addItem, updateItem, deleteItem } = useContext(TodoContext);
  const [isEdit, setEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [input, setInput] = useState({
    id: '',
    model: '',
    brand: '',
    price: '',
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
       updateItem({ ...input, id: currentId });
      setEdit(false);
      setCurrentId(null);
    } else {
      addItem(input);
    }
    setInput({ id: '', model: '', brand: '', price: '' });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const onEditClick = (item) => {
    setEdit(true);
    setCurrentId(item.id);
    setInput(item);
  };

  return (
    <div className='whole-body'>
      <h1 className='awesome-header'>CruD</h1>
      <form onSubmit={onFormSubmit}>
        <input
          style={{ backgroundColor: 'transparent', borderColor: 'blue' }}
          type='text'
          placeholder='Model'
          name='model'
          value={input.model}
          onChange={onChangeInput}
        />
        <input
          style={{ backgroundColor: 'transparent', borderColor: 'blue' }}
          type='text'
          placeholder='Brand'
          name='brand'
          value={input.brand}
          onChange={onChangeInput}
        />
        <input
          style={{ backgroundColor: 'transparent', borderColor: 'blue' }}
          type='number'
          placeholder='Price'
          name='price'
          value={input.price}
          onChange={onChangeInput}
        />

        <Button variant='outline-primary' type='submit'>
          {isEdit ? 'Update Item' : 'Add Item'}
        </Button>
      </form>

      <div className='df'>
        {items.length > 0 &&
          items.map((item, inx) => {
            return (
              <div key={inx} className='cont'>
                <h4>Item No: {item.id}</h4>
                <h4>Model: {item.model}</h4>
                <h4>Brand: {item.brand}</h4>
                <h4>Price: {item.price}</h4>

                <div>
                  <button
                    style={{ marginRight: '15px' }}
                    className='btn btn-primary'
                    onClick={() => onEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todo;
