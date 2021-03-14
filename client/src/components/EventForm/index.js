import React, { useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState';


const EventForm = () => {

    // state for guest list
    const [guestInputFields, setGuestInputFields] = useState([{
        id: Math.floor(Math.random() * 100),
        guestName: "",
        guestEmail: ""
    }]);

    // state for dish list
    const [dishInputFields, setDishInputFields] = useState([{
        id: Math.floor(Math.random() * 100),
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

    const [currentEvent, setCurrentEvent] = useState({ id: '', ...formState, guests: guestInputFields, dishes: dishInputFields });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setCurrentEvent({ id: Math.floor(Math.random() * 100), ...formState, guests: guestInputFields, dishes: dishInputFields });
        console.log("current event: ", currentEvent);
    }

    return (
        <div class="potluckbackground">
            <div class="potluckorange">
            <form onSubmit={handleSubmitForm}>
                <div>
                    <label class="potluckform" htmlFor="eventName">Event Name:</label>
                    <input class="forminput"
                        placeholder="Name Your Event"
                        name="eventName"
                        type="text"
                        id="eventName"
                        onChange={handleChangeForm}
                    />
                </div>
                <br />
                <div>
                    <label class="potluckform" htmlFor="message">Welcome Message for Guests: </label>
                    <textarea class="forminput"
                        placeholder="Leave a Message for Your Guests:"
                        name="message"
                        type="text"
                        id="message"
                        onChange={handleChangeForm}
                    />
                </div>
                <br />
                <div>
                    <label class="potluckform" htmlFor="date">Event date: </label>
                    <input class="forminput"
                        placeholder="Event's Date"
                        name="date"
                        type="date"
                        id="date"
                        onChange={handleChangeForm}
                    />
                </div>
                <br />
                <div>
                    <label class="potluckform" htmlFor="time">Time: </label>
                    <input class="forminput"
                        placeholder="Event's Time"
                        name="time"
                        type="time"
                        id="time"
                        onChange={handleChangeForm}
                    />
                </div>
                <br />
                <div>
                    <label class="potluckform" htmlFor="location">Location: </label>
                    <input class="forminput"
                        placeholder="Enter the Location"
                        name="location"
                        type="text"
                        id="location"
                        onChange={handleChangeForm}
                    />
                </div>

                <p class="potluckformheader" style={{ fontWeight: '700' }}>Guests to Invite:</p>
                {guestInputFields.map(guestInputField => (
                    <div key={guestInputField.id}>
                        <label class="potluckform" htmlFor="guestName">Guest Name: </label>
                        <input class="forminput"
                            placeholder="Enter Their Name"
                            name="guestName"
                            type="name"
                            value={guestInputField.guestName}
                            onChange={(e) => handleChangeInputFields(guestInputField.id, e, guestInputFields, setGuestInputFields)}
                        />
                        <br />

                        <label class="potluckform" htmlFor="guestEmail">Guest Email: </label>
                        <input class="forminput"
                            placeholder="Enter Their Email"
                            name="guestEmail"
                            type="email"
                            value={guestInputField.guestEmail}
                            onChange={(e) => handleChangeInputFields(guestInputField.id, e, guestInputFields, setGuestInputFields)}
                        />
                        < br />
                        <button class="btn" onClick={(e) => handleAddInputFields(e, setGuestInputFields, guestInputFields, 'guestName', 'guestEmail')}> + Add Guests </button>
                        {/* removing guest input fields only onClick */}
                        <button class="btn" onClick={() => handleRemoveInputFields(guestInputField.id, setGuestInputFields, guestInputFields)}> - Remove Guests </button>
                    </div>
                ))}

                <p class="potluckformheader" style={{ fontWeight: '700' }}>Dishes to Share:</p>

                {dishInputFields.map(dishInputField => (
                    <div key={dishInputField.id}>
                        <label class="potluckform" htmlFor="dishType">Dish Type: </label>
                        <input class="forminput"
                            placeholder="Enter the Dish Type"
                            name="dishType"
                            type="text"
                            value={dishInputField.dishType}
                            onChange={(e) => handleChangeInputFields(dishInputField.id, e, dishInputFields, setDishInputFields)}
                        />

                        <label class="potluckform" htmlFor="dishDescription"> Dish Description: </label>
                        <input class="forminput"
                            placeholder="Describe the Dish"
                            name="dishDescription"
                            type="text"
                            value={dishInputField.dishDescription}
                            onChange={(e) => handleChangeInputFields(dishInputField.id, e, dishInputFields, setDishInputFields)}
                        />
                        <button class="btn" onClick={(e) => handleAddInputFields(e, setDishInputFields, dishInputFields, 'dishType', 'dishDescription')}> + Add Dishes </button>
                        {/* removing dish input fields only onClick */}
                        <button class="btn" onClick={() => handleRemoveInputFields(dishInputField.id, setDishInputFields, dishInputFields)}> - Remove Dishes </button>
                    </div>
                ))}
                <br />
                <button class="submitbutton"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
        </div>
    )
}

export default EventForm;
