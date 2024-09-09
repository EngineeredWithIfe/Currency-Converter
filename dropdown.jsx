import PropTypes from 'prop-types';
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from 'react-icons/hi2';
const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title = " ",
    // These are the properties of the CurrencyDropdown component from the "currency-converter.jsx" file
}) => {

    const isFavorite = curr=>favorites.includes(curr)

  return (
    <div>
        <label htmlFor={title}
        className="block text-sm font-medium text-gray-700"
        >
            {title}
            </label>

        <div className="mt-1 relative">
            <select value={currency} 
            onChange={(e) => setCurrency(e.target.value)} 
            // The "onChange" attribute is an event handler that listens for changes to the dropdown's value. It becomes triggered when the user selects a different option
            // than what was previous value of the element (A new value).
            // When the user selects a new option from (or in) the dropdown list, the function is triggered
            // "e" is the event object that is automatically passed to the event handler when the "onChange" event occurs
            // "e" refers to the "<select>" element itself
            // "e.target.value" is the value of the selected option in the dropdown (list) = Whatever is selected becomes 
            // the new value that gets displayed. Moreover, the attributes and functions that it possesses are also recognized (if the logic is correct) and 
            // gets implemented into the specific function ()
            // "setCurrency(e.target.value)" is a function call that updates the "currency" state with the new selected value. This is how React
            // keeps track of the user's selection.

            className = "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">

                {favorites.map((currency) => {
                return <option className="bg-gray-200" value={currency} key={currency}>
                {currency}
                </option>
                })}
                <hr/>


            {currencies
                .filter((c) => !favorites.includes(c))
                .map((currency) => {
                return <option value={currency} key={currency}>
                {currency}

                {/* use "Set" to remove duplicates 
                Duplicates = currencies that have already been added to favorites, but are still showing up in the currency dropdown list*/}
            
                </option>
            })}
            </select>

            <button 
            onClick={() => handleFavorite(currency)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5">

                {isFavorite(currency) ?
                <HiStar />
                :
                <HiOutlineStar /> }
            </button>
            </div>
    </div>
  );
};

// This defines the props (or properties (of the CurrencyDropdown component))
CurrencyDropdown.propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    // Since it is a list of strings (which can be a list of objects) (For this context, it is a list of an n amount of strings (different currrencies) 
    // with different corresponding values), it is interpreted 
    // as a(n) (fixed) array it needs the "...: PropTypes.arrayOf(PropTypes,string).isRequired" syntax
    // This means the prop must be an array, and each element in the array must be a string. It enforces that the entire array follows a specific type rule.

    // This is a required array of strings, where each string represents a currency code. 
    // PropTypes.arrayOf(PropTypes.string) indicates that 'currencies' is an array where each element must be a string.

    currency: PropTypes.string.isRequired,
    // Since it is a list of (the) strings(') name that is being read (or being analyzed) it needs the "...: PropTypes,string.isRequired" syntax
    // This means the prop must be a string, often used for values like labels or identifiers.

    // This is the currently selected currency, which is a required string. 
    // PropTypes.string means the prop must be a string.

    setCurrency: PropTypes.func.isRequired,
    // Since it is a function for (or of) the CurrencyDropdown component, it needs the "...: PropTypes,string.isRequired" syntax
    // This means the prop must be a function, often used for event handlers or setters

    // This is a required function that updates the selected currency. 
    // PropTypes.func means the prop must be a function.

    favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
    // Since it is a list of objects (A list of an n amount of strings (different currrencies) with different corresponding values), it is interpreted 
    // as a(n) (fixed) array it needs the "...: PropTypes.arrayOf(PropTypes,string).isRequired" syntax
    // This means the prop must be an array, and each element in the array must be a string. It enforces that the entire array follows a specific type rule.

    // This is a required array of strings, where each string is a favorite currency. 
    // Similar to 'currencies', it's an array where each element is a string.

    handleFavorite: PropTypes.func.isRequired,
    // Since it is a function for (or of) the CurrencyDropdown component, it needs the "...: PropTypes,string.isRequired" syntax
    // This means the prop must be a function, often used for event handlers or setters

    // This is a required function that handles adding/removing currencies to/from the favorites list. 
    // PropTypes.func means the prop must be a function.

    title: PropTypes.string,
    // Since it is just the strings' name that is being read (or being analyzed) it needs the "...: PropTypes,string" syntax
    // This means the prop must be a string, often used for values like labels or identifiers.

    // This is an optional string that serves as a title or label for the currency dropdown. 
    // Since it's not marked as required, it can be undefined or a string.

}

export default CurrencyDropdown