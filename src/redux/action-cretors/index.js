export const getTimeZone = (timezone) => {
    return {
        type: "TIMEZONE",
        payload: timezone
    }

}

export const getAllCountry = (country) => {
    return {
        type: "ALL_COUNTRIES",
        payload: country
    }

}

export const getSelectClocks = (slelctedClocks) => {
    return {
        type: "SELECTED_CLOCKS",
        payload: slelctedClocks
    }
}
