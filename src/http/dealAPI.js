import { $authHost, $host } from "."

export const fetchAllDeals = async () => {
    const {data} = await $authHost.get('api/deal/')
    return data
}

export const setGiven = async (id) => {
    const {data} = await $authHost.post('api/deal/', {id})
    return data
}

export const fetchDealProducts = async (dealId) => {
    const {data} = await $authHost.get('api/dealproduct/' + dealId)
    return data
}