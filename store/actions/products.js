import Product from '../../models/productModel';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCTS = "SET_PRODUCTS";

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
        try{
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
            const respData = await response.json();

            dispatch ({
                type: CREATE_PRODUCT,
                productData: {
                    id: respData.name,
                    title,
                    description,
                    imageUrl,
                    price
                }
            })
        } catch(err) {
            throw err;
        }
        
    }
}

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const url = "https://shopping-app-9a925.firebaseio.com/products.json";
            const response = await fetch(url, {
                method: 'GET',
            });

            if( !response.ok ) {
                throw new Error('something went wrong: ', response);
            }

            const respData = await response.json();
            const loadedProducts = [];

            for (const key in respData) {
                loadedProducts.push(
                    new Product(
                        key, 
                        'u1', 
                        respData[key].title,
                        respData[key].imageUrl,
                        respData[key].description,
                        respData[key].price,
                    )
                )
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            })
        } catch(err) {
            throw err;
        }
    }
}
