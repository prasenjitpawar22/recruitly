import axios from "axios"

const BASE_URL = `https://api.recruitly.io/api`
type updateCompany = {
    name: String
    city: String
    countryName: String
    description: string
    phone: string
    postCode: String
    id?: string
}


export function updateCompany(data: updateCompany) {
    return axios.post(`${BASE_URL}/company/v2`, data, {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            apiKey: import.meta.env.VITE_SOME_KEY,
        }
    })
}