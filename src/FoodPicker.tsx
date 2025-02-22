import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import "./FoodPicker.css";

interface Restaurant {
  name: string;
  category: string;
}

const categories: string[] = ["Light Meal", "Heavy Meal"];

const defaultRestaurants: Restaurant[] = [
  { name: "留湘", category: "Heavy Meal" },
  { name: "老弄堂", category: "Heavy Meal" },
  { name: "山城私房菜", category: "Heavy Meal" },
  { name: "汉家宴", category: "Heavy Meal" },
  { name: "四季面馆", category: "Light Meal" },
  { name: "小香骨", category: "Light Meal" },
  { name: "鱼你在一起", category: "Light Meal" },
  { name: "金城拉面", category: "Light Meal" }
];

export default function RestaurantTracker() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [newRestaurant, setNewRestaurant] = useState<Restaurant>({ name: "", category: "Light Meal" });
  const [recommendation, setRecommendation] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("restaurants");
    let savedRestaurants: Restaurant[] = defaultRestaurants;

    try {
      if (storedData) {
        savedRestaurants = JSON.parse(storedData) as Restaurant[];
        if (!Array.isArray(savedRestaurants) || savedRestaurants.length === 0) {
          savedRestaurants = defaultRestaurants;
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      savedRestaurants = defaultRestaurants;
    }

    setRestaurants(savedRestaurants);
  }, []);

  useEffect(() => {
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
  }, [restaurants]);

  const addRestaurant = () => {
    if (newRestaurant.name.trim() === "") return;
    if (restaurants.some((r, index) => r.name.toLowerCase() === newRestaurant.name.toLowerCase() && index !== editingIndex)) return;

    if (editingIndex !== null) {
      const updatedRestaurants = [...restaurants];
      updatedRestaurants[editingIndex] = newRestaurant;
      setRestaurants(updatedRestaurants);
      setEditingIndex(null);
    } else {
      setRestaurants([...restaurants, { name: newRestaurant.name, category: newRestaurant.category }]);
    }
    setNewRestaurant({ name: "", category: "Light Meal" });
  };

  const getRecommendation = (category: string | null = null) => {
    let filteredRestaurants = restaurants;
    if (category) {
      filteredRestaurants = restaurants.filter(r => r.category === category);
    }
    if (filteredRestaurants.length === 0) return;
    const randomRestaurant = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
    setRecommendation(randomRestaurant.name);
  };

  const editRestaurant = (index: number) => {
    setNewRestaurant(restaurants[index]);
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Restaurant Picker</h1>
        <div className="button-group">
          <button className="button" onClick={() => getRecommendation()}>Random</button>
          <button className="button" onClick={() => getRecommendation("Light Meal")}>Light Meal</button>
          <button className="button" onClick={() => getRecommendation("Heavy Meal")}>Heavy Meal</button>
        </div>
        {recommendation && <p className="recommendation">Recommended: {recommendation}</p>}
        <div className="input-group">
          <input
            type="text"
            placeholder="Restaurant name"
            value={newRestaurant.name}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
            className="input"
          />
          <select
            value={newRestaurant.category}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, category: e.target.value })}
            className="select"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className="button primary" onClick={addRestaurant}>{editingIndex !== null ? "Update" : "Add"}</button>
        </div>
        <div className="button-group">
          <button className="button" onClick={() => setShowList(!showList)}>
            {showList ? "Hide" : "Show"} Restaurant List
          </button>
        </div>
        {showList && (
          <ul className="restaurant-list">
            {restaurants.map((restaurant, index) => (
              <li key={index} className="restaurant-item">
                <strong>{restaurant.name}</strong> ({restaurant.category})
                <button className="button edit" onClick={() => editRestaurant(index)}>
                  <FaEdit />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
