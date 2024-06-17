import axios from "axios";

let token = localStorage.getItem("token")


//Create category
export async function createCategory(title, imageurl) {


    const url = `https://foodynest-backend.onrender.com/api/v1/category/create`;
    try {
        const response = await axios.post(url, {
            "title": title,
            "imageUrl": imageurl
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred during create category.");
    }
}

//Get All Category
export async function getAllCategory() {
    const URL = 'https://foodynest-backend.onrender.com/api/v1/category/getAll'
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

