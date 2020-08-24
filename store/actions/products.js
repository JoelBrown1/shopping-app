import Product from '../../models/productModel';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCTS = "SET_PRODUCTS";

export const deleteProduct = productId => { 
    return async (dispatch, getState) => {
        const token = getState().auth.userToken;
        const url = `https://shopping-app-9a925.firebaseio.com/products/${productId}.json?auth=${token}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if(!response.ok) {
            throw new Error("deleting product failed");
        }


        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        })
    }
}

export const updateProduct = (pid, title, description, imageUrl) => { 
    return async (dispatch, getState) => {
        console.log('what is in getState: ', getState());
        console.log('updateProduct - what are the props being passed in: ', title, " : ", description);
        const token = getState().auth.userToken;
        const url = `https://shopping-app-9a925.firebaseio.com/products/${pid}.json?auth=${token}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
            })
        });

        if(!response.ok) {
            throw new Error("Updating product failed");
        }

        dispatch( {
            type: UPDATE_PRODUCT,
            productData: {
                pid,
                title,
                description,
                imageUrl
            }
    
        })
    }
}
export const createProduct = (title, description, imageUrl, price) => { 
    return async (dispatch, getState) => {
        const token = getState().auth.userToken;
        const userId = getState().auth.userId;
        const url = `https://shopping-app-9a925.firebaseio.com/products.json?auth=${token}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, 
                ownerId: userId,
                description, 
                imageUrl, 
                price
            })
        });

        if(!response.ok) {
            throw new Error("creating product failed");
        }


        const respData = await response.json();

        dispatch ({
            type: CREATE_PRODUCT,
            productData: {
                id: respData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }
        })
    }
}

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        console.log('this is the userId: ', userId);
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
                // console.log('what is the product that is being fetched: ', respData[key]);
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

            const userProducts = loadedProducts.filter(prod => { 
                console.log('product ownerId: ', prod.ownerId);
                console.log('userId: ', userId);
                return prod.ownerId === userId
            });
            console.log('what is the userProducts: ', userProducts);
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts
            })
        } catch(err) {
            throw err;
        }
    }
}
