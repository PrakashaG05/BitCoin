import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../lib/canvasjs.react';

function Graph(props) {
    
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [options, setOptions] = useState();
    useEffect(() => {
        setOptions(
            {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Last 60 days trend",
                    fontSize: 12,
                    fontColor: "gray",
                    fontWeight: "normal"
                },
                axisX:{
                    valueFormatString: "DD MMM",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: false
                    }
                },
                axisY: {
                    crosshair: {
                        snapToDataPoint: true,
                    }
                },
                data: [
                    {
                        type: "area",
                        dataPoints: props.graphDataSet 
                    }
                ]
            }
        );
    },[props]);

    return (
        <div key={options?.data?.length}>
            <CanvasJSChart options={options}/>
        </div>
    );
}

export default Graph;