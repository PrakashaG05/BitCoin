import { ACTIONS } from "./redux/contants";
import store from "./redux/reducer";

function format_Date_Month(date_or_month) {
    return ("0"+date_or_month.toString()).slice(-2);
}

export function formatDate(date) {
    var formatted_Date = format_Date_Month(date.getDate());
    var formatted_Month = format_Date_Month(date.getMonth() + 1);
    return date.getFullYear()+"-"+formatted_Month+"-"+formatted_Date;
}

export function formatDataSet_AND_Dispatch(currencyCode, dataSet, callback) {
    var formattedDataSet = [];
    // eslint-disable-next-line array-callback-return
    Object.keys(dataSet).map((key) => {
        let newData = {
            x: new Date(key),
            y: dataSet[key]
        };
        formattedDataSet.push(newData);
        
    });
    store.dispatch({
        type: ACTIONS.ADD_CURRENCY_GRAPH,
        dataSet: formattedDataSet,
        currencyCode: currencyCode
    });
    callback(formattedDataSet);
}