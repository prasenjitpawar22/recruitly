import axios from "axios";


const BASE_URL = `https://api.recruitly.io/api`

export async function getPaginatedCompanyList({ page, size }: { page: number, size: number }) {
    return (axios.get(`${BASE_URL}/company/list`, {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            apiKey: import.meta.env.VITE_SOME_KEY,
            pageNumber: page,
            pageSize: size,
        },
        paramsSerializer: { indexes: false }
    }))
}

export async function getCompany(id: string) {
    return axios.get(`${BASE_URL}/company/${id}`, {
        params: {
            apiKey: import.meta.env.VITE_SOME_KEY,
        }
    })
}