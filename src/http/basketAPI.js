import { $authHost, $host } from "."

export const addProductToBasket = async (basketProduct) => {
    const {data} = await $host.post('api/basket/', basketProduct)
    return data
}

export const fetchProductsFromBasket = async (userId) => {
    const {data} = await $host.get('api/basket/' + userId)
    return data
}

export const fetchOneProductFromBasket = async (userId, productId) => {
    const {data} = await $host.get('api/basket', {params: {userId, productId}})
    return data
}

export const deleteProductFromBasket = async (userId, productId) => {
    const {data} = await $host.delete('api/basket/wholeProduct', {params: {userId, productId}})
    return data
}

export const decrementProductFromBasket = async (userId, productId) => {
    const {data} = await $host.delete('api/basket/oneOfManyProduct', {params: {userId, productId}})
    return data
}