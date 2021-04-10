import React from 'react';
import { Dropdown } from 'react-bootstrap';
import store from '../redux/reducer.js';

function BitCoin(props) {

    const handleSelect = (currency) => {
        props.setSelectedCurrency(currency);
    };

    return (
        <Dropdown className="mt-2 border rounded" style={{width: "fit-content"}}>
            <Dropdown.Toggle variant="success" className="btn btn-light" style={{ width: "200px" }} id="dropdown-basic">
                {props.selectedCurrency?.description}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    Object.values(store.getState().currencies).map((currency, index) => (
                        <Dropdown.Item key={index} onClick={() => handleSelect(currency)} eventKey={index}>
                            <div>{currency?.description}</div>
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default BitCoin;