import React from 'react'

function DishForm({ handleChange, handleSubmit, dish }) {
    return (

        <form onSubmit={handleSubmit}>
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
                value={dish.dishName}
                onChange={handleChange}
            />

            <button
                type="submit"
            >
                Update dish/ add another dish
</button>
        </form>

    )
}

export default DishForm;

