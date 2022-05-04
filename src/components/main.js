import React, {useState, useEffect} from "react";

import {FormControl, Paper, Select, TextField} from '@mui/material'
// jXDej9p6Z8wN2LJYHtoJetXJC6SxRXFm

const Main = () =>{

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [country1, setCountry1] = useState([]);
    const [country2, setCountry2] = useState([]);    
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();

   
   
    function getData(currency1, currency2){
        let url =`https://api.apilayer.com/fixer/latest?base=UAH`;
        //   let url =`jsonplaceholder.typicode.com`;

        fetch(url, {
            headers: {
                'apikey' : 'jXDej9p6Z8wN2LJYHtoJetXJC6SxRXFm'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCountry1(data.rates)
            setCountry2(data.rates)
         
        })
        .catch("some error");
    }


    useEffect(() => {       
        getData();
    }, []);


    function convert(){
        let res = (value2/value1)*input1;
        setInput2(res.toFixed(2));
    }


    const convertUah = (curr) => {
        return (1/country1[curr]).toFixed(2);
    };

    return (
      
            <Paper className="input-block">
                <div className='header'>
                    <h2>Currency Converter</h2>
                    <h5>
                        {`USD:${ convertUah('USD')}, EUR: ${ convertUah('EUR')}`}
                    </h5>
                </div>
                
                <div className="input-block__inputs">
                    <TextField variant="outlined" value={input1 || ''} onChange={(e)=>setInput1(e.target.value)} />
                    <FormControl variant="outlined" onChange={(e)=>setValue1(e.target.value)} >
                        <Select native>
                           {Object.keys(country1).map((value, index)=>
                                <option key={index} value={country1[value]}>{value}</option>
                           )}
                        </Select>
                    </FormControl>
                </div>
                <div className="input-block__inputs">
                    <TextField variant="outlined"  value={input2 || ''}/>
                    <FormControl variant="outlined" onChange={(e)=>setValue2(e.target.value)} >
                        <Select native>
                        {Object.keys(country2).map((value, index)=>
                           <option key={index} value={country2[value]}>{value}</option>
                        )}
                        </Select>
                    </FormControl>
                </div>
                <button className='btn' onClick={()=>convert(country1, country2)}>Convert</button>
            </Paper>
           
   
    )
}

export default Main;