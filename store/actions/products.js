export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const deleteProduct = productId => { 
    return {
        type: DELETE_PRODUCT,
        pid: productId
    }
}

export const updateProduct = (pid, title, description, imageUrl) => { 
    console.log("inside prod actions update roduct")
    return {
        type: UPDATE_PRODUCT,
        productData: {
            pid,
            title,
            description,
            imageUrl
        }
    }
}
export const createProduct = (title, description, imageUrl, price) => { 
    console.log('inside the actions file')
    return {
        type: CREATE_PRODUCT,
        productData: {
            title,
            description,
            imageUrl,
            price
        }
    }
}