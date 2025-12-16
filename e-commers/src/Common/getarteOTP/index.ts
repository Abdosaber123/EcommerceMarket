export const genrateOTP= ()=>{
    return Math.floor(Math.random() * 90000 + 10000) as unknown as string
}