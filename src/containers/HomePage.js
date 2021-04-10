import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import BitCoin from '../components/BitCoin';
import Graph from '../components/Graph';
import { ACTIONS } from '../redux/contants';
import store from '../redux/reducer';
import { formatDataSet_AND_Dispatch, formatDate } from '../util';

function HomePage() {


    const [selectedCurrency, setSelectedCurrency] = useState();
    const [graphDataSet, setGraphDataSet] = useState();

    useEffect(() => {
        if (!store.getState().currencies.length > 0) {
            fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
                .then(response => response.json())
                .then((data) => {
                    store.dispatch({
                        type: ACTIONS.ADD_CURRENCY_PRICES,
                        currency: { ...data.bpi }
                    });
                    setSelectedCurrency(Object.values(data.bpi)[0]);
                });
        }
    }, []);

    useEffect(() => {
        if (selectedCurrency) {
            if (!store.getState().dataSet[selectedCurrency.code]?.length > 0) {
                var endDate = new Date();
                endDate = formatDate(endDate);
                var startDate = new Date();
                startDate = new Date(startDate.setDate(startDate.getDate() - 60));
                startDate = formatDate(startDate);
                try {
                    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${selectedCurrency.code}&start=${startDate}&end=${endDate}`)
                        .then(response => response.json())
                        .then((data) => {
                            if (data.bpi) {
                                formatDataSet_AND_Dispatch(selectedCurrency.code, data.bpi, (res) => { setGraphDataSet(res); });
                            }
                        });
                } catch (error) {
                    console.log(error);
                }
            } else if (store.getState().dataSet[selectedCurrency.code]) {
                setGraphDataSet(store.getState().dataSet[selectedCurrency.code]);
            }
        }
    }, [selectedCurrency])

    const cardStyle = {
        boxShadow: "0 4px 20px 20px rgb(0 123 255 / 11%)"
    };

    return (
        <div className="d-flex flex-column vh-100">
            <div className="d-flex flex-row m-auto justify-content-center border rounded border-info p-4" style={cardStyle}>
                <div className="d-flex flex-column ml-4 mr-4 align-items-left">
                    <p className="text-capitalize font-weight-light mt-auto pl-0 pr-2 pt-2 pb-2 mb-0 text-secondary">1 Bitcoin Equals</p>
                    <BitCoin
                        setSelectedCurrency={setSelectedCurrency}
                        selectedCurrency={selectedCurrency}
                    />
                    <h3 className="mt-2 mb-auto pt-2 pb-2 pl-0 pr-2 text-left text-dark font-weight-bold">
                        <span className="pr-2">
                            {isNaN(selectedCurrency?.rate_float) || Number(selectedCurrency?.rate_float)?.toFixed(2)}
                        </span>
                        {selectedCurrency?.description}
                    </h3>
                </div>
                <div className="d-flex flex-column mr-0 ml-4 mt-auto mb-auto" style={{ width: "550px" }}>
                    <Graph graphDataSet={graphDataSet}></Graph>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
