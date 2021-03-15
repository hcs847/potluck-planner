import React from 'react'

function DishForm({ onBlurDish, handleChange, setDishName, dishsName, dishes }) {
    return (
        <>
            {/* {
                dishes.map(dish => (
                    <div key={dish.dishName}> */}
            {/* <label htmlFor="dishType">Dish Type:</label>
    <input
        placeholder="Dish Type"
        name="dishType"
        type="text"
        value={dishState.dishType}
        onChange={handleChangeDishForm}
    /> */}

            <label htmlFor="dishName">Dish Name:</label>
            <input
                placeholder="Dish Name"
                name="dishName"
                type="text"
                value={dishsName}
                onChange={e => setDishName(e.target.value)}
            // onBlur={onBlurDish}
            />
        </>
    )
}


export default DishForm;

