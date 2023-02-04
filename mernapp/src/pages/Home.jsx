import React from 'react';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import {useState, useEffect} from 'react';

export default function Home() {

    const [foodItem, setFoodItem] = useState([]);
    const [category, setCategory] = useState([]);

    const dataFetching = async () => {
        const dataResponse = await fetch('http://localhost:5000/api/foodData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const Response = await dataResponse.json()

        setFoodItem(Response[0]);
        setCategory(Response[1]);
        console.log(Response[0], Response[1]);
    }

    useEffect(() => {
        dataFetching();
    }, [])

    return (
        <div>
            <Navbar/>
            <Carousel/>
            <div>
              {
                category.map((ele)=> {
                  return (
                  <div key = {ele._id}>
                    <p id ='food-type'>{ele.CategoryName}</p>
                    <div className="card-display">
                    {
                      foodItem.filter((item)=> item.CategoryName === ele.CategoryName).map((data)=> {
                        return(
                          <div key = {data._id}>
                            <Card dataItem={data} options = {data.options[0]} />
                          </div>
                        )
                      })
                    }
                    </div>
                  </div>
                  
                  )
                })
              }
            </div>
        </div>
    )
}
