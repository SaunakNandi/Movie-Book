export function validateUserCredentials(email,password)
{
    const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid=/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/.test(password)

    if(!isEmailValid) return "Invalid email address."
    if (!isPasswordValid) return "Invalid password"

    return null
}