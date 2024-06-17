import axios from "axios";
let token = localStorage.getItem("token")

//Get Food By Category
export async function getFoodByCategory(categoryName) {
    const URL = `https://foodynest-backend.onrender.com/api/v1/food/category/${categoryName}`
    try {
        const response = await axios.get(URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

export async function getAllFoodItems() {
    const URL = `https://foodynest-backend.onrender.com/api/v1/food/getAll`
    try {
        const response = await axios.get(URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
    }
}


//Search Food Item
export async function searchFoodItem(searchTerm) {
    const URL = `https://foodynest-backend.onrender.com/api/v1/food/search?query=${searchTerm}`

    try {
        const response = await axios.get(URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

//Get All Polpular Food
export async function getAllPolpularFood() {
    const URL = `https://foodynest-backend.onrender.com/api/v1/food/popular`
    try {
        const response = await axios.get(URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
    }
}


//Get Popular food by category
export async function getPopularFoodByCategory(categoryName) {
    const URL = `https://foodynest-backend.onrender.com/api/v1/food/category/${categoryName}`;
    try {
        const response = await axios.get(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return { success: true, data: response.data };
        }
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.status, error.response.data);
            return { success: false, error: error.response.data.message || `Server error: ${error.response.status}` };
        } else if (error.request) {
            console.error('Network Error:', error.request);
            return { success: false, error: 'Network error: No response received from the server.' };
        } else {
            console.error('Error:', error.message);
            return { success: false, error: `Unexpected error: ${error.message}` };
        }
    }
}



