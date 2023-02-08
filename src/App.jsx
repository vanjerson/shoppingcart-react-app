import React, { useState, useEffect } from 'react';
import './index.css';
import './css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	
	const [items, setItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(0);

	const handleAddButtonClick = () => {

    if (inputValue == "") {
      setShowAlert(true);
  } else {
      const newItem = {
          id: Math.floor(Math.random() * 1000),
          itemName: inputValue,
          quantity: 1,
          isSelected: false,
      };

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue('');
		setTotalItemCount(totalItemCount + 1);
	}
};

  const closeAlert = () => {
    setShowAlert(false);
}

	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal();
	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

		if(newItems[index].quantity <= 1) {
      newItems[index].quantity = 1;
  } else {
    newItems[index].quantity--;
  }

		setItems(newItems);
		calculateTotal();
	};

  const deleteItem = (index) => {
    const newItems = [...items];
    const deletedItem = newItems.splice(index,1)[0];
    setItems(newItems);
    setTotalItemCount((prevCount) => prevCount - deletedItem.quantity);
  };


	const toggleComplete = (index) => {
		const newItems = [...items];

		newItems[index].isSelected = !newItems[index].isSelected;

		setItems(newItems);
	};

	const calculateTotal = () => {
		const totalItemCount = items.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		setTotalItemCount(totalItemCount);
	};

	return (

    <div className='App'>

		<div className='app-background'>

    {showAlert && (
    <div type="button" className="btn-close" data-bs-dismiss="alert" 
    data-bs-target="#my-alert" aria-label="Close">
        <button onClick={() => closeAlert()} type="button" 
        className="btn-close" data-bs-dismiss="alert" 
        aria-label="Close"></button>
        <strong>Oh snap!</strong> Write something and try adding again.
    </div>
  )}

			<div className='main-container'>
        <h2>Black Market</h2>
				<div className='add-item-box'>
					<input value={inputValue} 
          onChange={(event) => setInputValue(event.target.value)} 
          className='add-item-input' placeholder='Add an item...' />
          
					<FontAwesomeIcon icon={faPlus} 
          onClick={() => handleAddButtonClick()} />
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name' 
              onClick={() => toggleComplete(index)}>
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} 
                  onClick={() => handleQuantityDecrease(index)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} 
                  onClick={() => handleQuantityIncrease(index)} />
								</button>
                <button>
									<FontAwesomeIcon icon={faTrashCan} 
                  onClick={() => deleteItem(index)} />
								</button>
							</div>
						</div>
					))}
				</div>
        
				<div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
  </div>
  
	);
};

export default App;