import { $authHost, $host } from "."

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProducts = async (typeId, page, limit, name) => {
    const {data} = await $host.get('api/product', {params: {typeId, page, limit, name}})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $authHost.delete('api/product/' + id)
    return data
}

export const payForProductsFromBasket = async (userId, basketProducts) => {
    const {data} = await $host.post('api/payment/', {userId, basketProducts})
    return data
}