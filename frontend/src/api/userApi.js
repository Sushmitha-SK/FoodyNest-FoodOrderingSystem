import axios from "axios";
let token = localStorage.getItem("token");

//Login
export async function loginUser(email, password) {

    const url = `https://foodynest-backend.onrender.com/api/v1/auth/login`
    console.log(url)
    try {
        const response = await axios.post(url, JSON.stringify({
            "email": email,
            "password": password
        }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log('Error', error)
    }
}

//Register
export async function signupUser(username, email, password, phone, address) {
    const url = `https://foodynest-backend.onrender.com/api/v1/auth/register/`;
    try {
        const response = await axios.post(url, {
            userName: username,
            email,
            password,
            phone,
            address,
            answer: "sample answer"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred during registration.");
    }
}

//Get User Details
export async function getUserDetailsByUserID(userid) {
    const url = `https://foodynest-backend.onrender.com/api/v1/user/getUser/?id=${userid}`
    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {

    }
}


export async function updateUserProfile(username,address,phone) {
    const url = `https://foodynest-backend.onrender.com/api/v1/user/updateUser`

    try {
        const response = await axios.put(url, {

            "userName":username,
            "address": address,
            "phone": phone
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        console.log('error', error)
        throw new Error(error.response?.data?.message || "An error occurred while updating the user details.");
    }
}




