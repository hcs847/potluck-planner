import React, { useState, useContext } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';


const EventForm = () => {

    // state for guest list
    const [guestInputFields, setGuestInputFields] = useState([{
        id: Math.floor(Math.random() * 1000),
        guestName: "",
        guestEmail: ""
    }]);

    // state for dish list
    const [dishInputFields, setDishInputFields] = useState([{
        id: Math.floor(Math.random() * 1000),
        dishType: "",
        dishDescription: ""
    }]);

    // Dynamic rendering of input fields for dishes and guests
    // to enable submitter to change dishes and guests entered dynamically
    const handleChangeInputFields = (id, event, inputFields, setFieldState) => {
        const newInputFields = inputFields.map(field => {
            if (id === field.id) {
                field[event.target.name] = event.target.value
            }
            return field;
        })
        setFieldState([...newInputFields]);
    }


    // Dynamically adding new input fields and rendering object keys 
    const handleAddInputFields = (e, setFieldState, inputFields, fieldA, fieldB) => {
        e.preventDefault();
        setFieldState([...inputFields, {
            id: Math.floor(Math.random() * 100),
            [fieldA]: "",
            [fieldB]: ""
        }])
    }

    const handleRemoveInputFields = (id, setInputFields, inputFields) => {
        setInputFields([...[...inputFields].filter(inputField => inputField.id !== id)]);
    }

    // handling state for all other fields in Event Form
    const [formState, setFormState] = useState({
        eventName: '', message: '', date: '', time: '', location: ''
    });

    // handling change for other fields within form
    const handleChangeForm = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        })
    };


    const [state, dispatch] = useGlobalContext();



    const handleSubmitForm = (e) => {
        e.preventDefault();

        const newEvent = {
            id: Math.floor(Math.random() * 1000),
            ...formState,
            guests: guestInputFields,
            dishes: dishInputFields
        }

        console.log("New event: ", newEvent);
        dispatch({
            type: "ADD_EVENT",
            payload: newEvent
        })
    }

    return (
        <>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        placeholder="Event's name"
                        name="eventName"
                        type="text"
                        id="eventName"
                        onChange={handleChangeForm}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="message">Welcome message for guests</label>
                    <textarea
                        placeholder="Welcome message:"
                        name="message"
                        type="text"
                        id="message"
                        onChange={handleChangeForm}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="date">Event date:</label>
                    <input
                        placeholder="Event's date"
                        name="date"
                        type="date"
                        id="date"
                        onChange={handleChangeForm}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                        placeholder="Event's time"
                        name="time"
                        type="time"
                        id="time"
                        onChange={handleChangeForm}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        placeholder="Event's location"
                        name="location"
                        type="text"
                        id="location"
                        onChange={handleChangeForm}
                    />
                </div>

                <p style={{ fontWeight: '700' }}>Guests to Invite:</p>
                {guestInputFields.map(guestInputField => (
                    <div key={guestInputField.id}>
                        <label htmlFor="guestName">Guest Name:</label>
                        <input
                            placeholder="Guest name"
                            name="guestName"
                            type="name"
                            value={guestInputField.guestName}
                            onChange={(e) => handleChangeInputFields(guestInputField.id, e, guestInputFields, setGuestInputFields)}
                        />

                        <label htmlFor="guestEmail">Guest Email:</label>
                        <input
                            placeholder="Guest Email"
                            name="guestEmail"
                            type="email"
                            value={guestInputField.guestEmail}
                            onChange={(e) => handleChangeInputFields(guestInputField.id, e, guestInputFields, setGuestInputFields)}
                        />
                        <button onClick={(e) => handleAddInputFields(e, setGuestInputFields, guestInputFields, 'guestName', 'guestEmail')}> + Add Guests </button>
                        {/* removing guest input fields only onClick */}
                        <button onClick={() => handleRemoveInputFields(guestInputField.id, setGuestInputFields, guestInputFields)}> - Remove Guests </button>
                    </div>
                ))}

                <p style={{ fontWeight: '700' }}>Dishes to Share:</p>

                {dishInputFields.map(dishInputField => (
                    <div key={dishInputField.id}>
                        <label htmlFor="dishType">Dish Type:</label>
                        <input
                            placeholder="Dish Type"
                            name="dishType"
                            type="text"
                            value={dishInputField.dishType}
                            onChange={(e) => handleChangeInputFields(dishInputField.id, e, dishInputFields, setDishInputFields)}
                        />

                        <label htmlFor="dishDescription">Dish Description:</label>
                        <input
                            placeholder="Dish Description"
                            name="dishDescription"
                            type="text"
                            value={dishInputField.dishDescription}
                            onChange={(e) => handleChangeInputFields(dishInputField.id, e, dishInputFields, setDishInputFields)}
                        />
                        <button onClick={(e) => handleAddInputFields(e, setDishInputFields, dishInputFields, 'dishType', 'dishDescription')}> + Add Dishes </button>
                        {/* removing dish input fields only onClick */}
                        <button onClick={() => handleRemoveInputFields(dishInputField.id, setDishInputFields, dishInputFields)}> - Remove Dishes </button>
                    </div>
                ))}
                <br />
                <button
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </>
    )
}

export default EventForm;
