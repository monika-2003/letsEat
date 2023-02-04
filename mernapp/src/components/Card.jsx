import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    const priceRef = useRef();

    useEffect(()=> {
        setSize(priceRef.current.value)
    },[])

    const dispatch = useDispatchCart();
    let data = useCart();

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let options = props.options;
    let priceOptions = Object.keys(options);
    let finalPrice = qty * parseInt(options[size])

    const handleAddToCart = async() => {
        console.log("inside");
        let food = [];
        for(const item of data) {
            if(item.id === props.dataItem._id) {
                food = item;
                console.log("FOOD",food)
                break;
            }
        }

        if(food !== []) {
            if(food.size === size) {
                await dispatch({type: "UPDATE", id:  props.dataItem._id, price: finalPrice, quantity: qty});
                return;
            }
            else if(food.size !== size) {
                await dispatch({type: "ADD", id: props.dataItem._id, name: props.dataItem.name, price: finalPrice, quantity: qty, size: size});
                return;
            }
        }
        await dispatch({type: "ADD", id: props.dataItem._id, name: props.dataItem.name, price: finalPrice, quantity: qty, size: size});
    }

    return (
        <div className="card m-5"
            style={
                {width: "18rem"}
            }>
            <img className="card-img-top" id='card-img' src={props.dataItem.img}/>
            <div className="card-body">
                <h5 className="card-title">{props.dataItem.name}</h5>
                <p className="card-text">{props.dataItem.description}</p>
                <div className='container w-100'>
                    <select className='m-2 h-100 bg-success fs-7' onChange= {(e) => setQty(e.target.value)}>
                        {
                        Array.from(Array(6), (e, i) => {
                            return (
                                <option key={
                                        i + 1
                                    }
                                    value={
                                        i + 1
                                }>
                                    {
                                    i + 1
                                } </option>
                            )
                        })
                    } </select>

                    <select className='m-2 h-100 bg-success fs-7' ref={priceRef} onChange= {(e) => setSize(e.target.value)}>
                        {
                            priceOptions.map((data) => {
                                return <option key={data} value = {data}>{data}</option>
                            })
                        }
                    </select>

                    <div className='h-100 fs-7'>
                        Rs. {finalPrice} /-
                    </div>

                </div>
                <hr></hr>
                <button className='btn btn-success text-white' onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    )
}
