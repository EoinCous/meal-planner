export const sanitiseInput = (str) => {
    return str.replace(/[<>]/g, "").trim(); // removes < and >
}