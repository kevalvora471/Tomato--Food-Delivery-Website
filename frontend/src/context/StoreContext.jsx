import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

	const [cartItems, setCartItems] = useState({});

	// const url = "http://localhost:5000";
	const url = "https://tomato-food-delivery-website.onrender.com"

	const [token, setToken] = useState("");

	const [food_list, setFoodList] = useState([])

	const addToCart = async (itemId) => {
		setCartItems((prev = {}) => ({
			...prev,
			[itemId]: (prev[itemId] || 0) + 1
		}));

		if (token) {
			await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
		}
	};

	const removeFromCart = async (itemId) => {
		setCartItems((prev = {}) => {
			const updated = { ...prev };
			if (updated[itemId] > 1) {
				updated[itemId]--;
			} else {
				delete updated[itemId];
			}
			return updated;
		});

		if (token) {
			await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
		}
	};


	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = food_list.find((product) => product._id === item)
				totalAmount += itemInfo.price * cartItems[item];
			}
		}
		return totalAmount;
	}

	const fetchFoodList = async () => {
		const response = await axios.get(url + "/api/food/list");
		setFoodList(response.data.data)
	}

	const loadCartData = async (token) => {
		const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
		setCartItems(response.data.cartData);
	}

	useEffect(() => {
		async function loadData() {
			await fetchFoodList();
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
				await loadCartData(localStorage.getItem("token"));
			}
		}
		loadData();
	}, []);

	const contextValue = {
		food_list,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		url,
		token,
		setToken
	}
	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	)

}

export default StoreContextProvider 
