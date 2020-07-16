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
    return async dispatch => {
        const url = "https://shopping-app-9a925.firebaseio.com/products.json";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
                price
            })
        });

        const respData = await response.json()

        console.log('response data: ', respData);

        dispatch ({
            type: CREATE_PRODUCT,
            productData: {
                id: respData.name
                title,
                description,
                imageUrl,
                price
            }
        })
    }
}