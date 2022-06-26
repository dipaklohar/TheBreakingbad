
export const addFavourite = details => {
    return {
        type: "SAVE_FAVOURITE_DETAIL",
        payload: details
    }
}

export const removeFavourite = details => {
    console.log(details);
    return {
        type: "REMOVE_FAVOURITE_DETAIL",
        payload: details
    }
}