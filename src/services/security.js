export const sanitiseInput = (str) => {
    str.replace(/[<>]/g, "").trim(); // removes < and >
}