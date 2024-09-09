import { useState } from "react";
import { useEffect } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";


const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState("");

    // If The component's (useState()) value in the input field has the value as 1 "useState(1)", 
    // Even if there's a placeholder "HTMML Attribute" like "("Enter an amount...")" the only thing that will be display will be the "1"
    // If a string placeholder is needed, it is best to put "" inside the input field for the useState Component's value
    // const [amount, setAmount] = useState(1); = Placeholder (visibility is not essential) 
    // const [amount, setAmount] = useState(""); = Placeholder (visibility is essential) 

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState(null)
    const [converting, setConverting] = useState(false)
    const [favorites, setFavorites] = useState( () => JSON.parse(localStorage.getItem("favorites"))  || ["EUR", "USD"] )
    // "useState(JSON.parse(localStorage.getItems("favorites")))" is using the "localStorage" method, 
    // so the browser webpage can be refreshed, but the "favorites" will still be saved (on the localhost browser's API without needing a server) 
    // and the previous execution (of making a currency a favorite) 
    // and their function will not be lost (due to a refresh)
    // " || ["EUR", "USD"] " = or else display the currencies "EUR", & "USD"



    // currencies -> https://api.frankfurter.app/currencies
const fetchCurrencies = async () => { 
    //since the "Try" block's RESponse ("res") is await, we have to use an "async" function
    try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data = await res.json()

        setCurrencies(Object.keys(data));
        //Due to the fact that the ".map" method in the dropdown.jsx file, can only be used on arrays. 
        //We need to convert the Objects to arrays, and the way to do that is to use "(Object.keys("The object that is being converted to arrays"));"
        
    } catch (error) {
        console.error("Error Fetching", error)
    }
};

useEffect(() => {
    fetchCurrencies();
}, []);

console.log(currencies);

    // currencies -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR


    const convertCurrency = async () => {
        // Conversion Logic
        if(!amount)return
        setConverting(true)
        try {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            );
            const data = await res.json()
    
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
          } catch (error) {
            console.error("Error Fetching", error)
          }
            finally
            {setConverting(false)}
        }


 const handleFavorite = (currency) => {
    // It will take currency (in the input field) and add it to favorite(s)
    let updateFavorites = [...favorites]
    
        if (favorites.includes(currencies)) {
            updateFavorites = updateFavorites.filter((fav) => fav !== currency);
        }   else {
            updateFavorites.push(currency);
        }

        setFavorites(updateFavorites)
        localStorage.setItem("favorites", JSON.stringify(updateFavorites));

 }

 const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
 }

    // currencies -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
        <h2 className="mb-5 text-2xl font-semibold text-gray-700">
            Currency Converter
            </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            {/* "sm:" means for if greater than small screen */}
                <CurrencyDropdown 
                favorites={favorites}
                currencies={currencies} 
                title="From:"
                currency={fromCurrency}
                setCurrency={setFromCurrency}
                handleFavorite={handleFavorite}/>
                
                {/*Swap Currency Button*/}
                <div className="flex justify-center -mb-5 sm:mb-0">
                {/* "sm:" means for if greater than small screen */}
                    <button 
                    onClick={swapCurrencies} 
                    className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                        <HiArrowsRightLeft 
                        className="text-xl text-gray-700"/>
                    </button>
                </div>

            <CurrencyDropdown 
            favorites={favorites}
            currencies={currencies} 
            title="To:"
            currency={toCurrency}
            setCurrency={setToCurrency}
            handleFavorite={handleFavorite}/>
        </div>

        <div className="mt-2">
            <label htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
            >Amount:</label>
            <input 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter an amount..."

            type="number"
            className="w-full p-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"></input>
        </div>

        <div className="flex justify-end mt-6">
            <button 
            onClick={convertCurrency}
            className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            ${converting?"animate-pulse" : ""}
            //If converting is true show the animation, pulse, if it's false, don't show anything
            `}>
                CONVERT
                </button>
        </div>
        
        {convertedAmount && ( 
            <div 
            className="mt-4 text-lg font-medium text-right text-green-600">
            Converted Amount: {convertedAmount}
        </div>
    )}
    </div>
  )
}


export default CurrencyConverter