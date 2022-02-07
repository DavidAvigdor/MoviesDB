import { isAlphanumeric, isURL, isInt, isEmail } from 'validator';
export const validateMovie = ({ name, genres, image, premiered }) => {

    let result = [true, []]
    if (!isAlphanumeric(name, "en-US", { ignore: " -,.?()!" })) {
        result[0] = false;
        result[1].push("N")
    }
    const validateGenres = genres.split(',').map(genre => isAlphanumeric(genre, "en-US", { ignore: " -" }))
    if (validateGenres.some(genre => genre === false)) {
        result[0] = false;
        result[1].push("G")
    }
    if (!isURL(image)) {
        result[0] = false;
        result[1].push("I")
    }
    const thisYear = new Date().getFullYear();

    if (+premiered.substring(0, 4) < 1900 || +premiered.substring(0, 4) > thisYear + 3) {
        result[0] = false;
        result[1].push("P")
    }
    return result;
}


export const validateUser = ({ firstName, lastName, username, session }, users, oldUsername) => {
    let result = [true, [], []]
    if (!isAlphanumeric(firstName, "en-US", { ignore: " -" })) {
        result[0] = false;
        result[1].push("F")
    }
    if (!isAlphanumeric(lastName, "en-US", { ignore: " -" })) {
        result[0] = false;
        result[1].push("L")
    }
    if (users.some(user => (user.username === username && (oldUsername !== username)))) {
        result[0] = false;
        result[1].push("U")
        result[2] = "username alreay taken";
    }
    if (!isAlphanumeric(username, "en-US", { ignore: " -" })) {
        result[0] = false;
        result[1].push("U")
    }
    if (!isInt('' + session)) {
        result[0] = false;
        result[1].push("S")
    }
    if (session < 0) {
        result[0] = false;
        result[1].push("S")
        result[2] = "Session must me a positive number"
    }
    if (session > 1440) {
        result[0] = false;
        result[1].push("S")
        result[2] = "Session cannot be longer than a day's worth"
    }

    return result;

}
export const validateMember = ({ name, email, city }) => {
    let result = [true, [], []]
    if (!isAlphanumeric(name, "en-US", { ignore: " -." })) {
        result[0] = false;
        result[1].push("N")
    }
    if (!isEmail(email)) {
        result[0] = false;
        result[1].push("E")
    }
    if (!isAlphanumeric(city, "en-US", { ignore: " -.," })) {
        result[0] = false;
        result[1].push("C")
    }
    return result
}
export const ValidateSubscription = async (subscriptionDate, movie) => {

    if (subscriptionDate.getFullYear() < movie.premiered) return false;
}
export const validateUsername = ({ username }) => {
    let result = [true, [], []]

    if (!isAlphanumeric(username, "en-US", { ignore: " -" })) {
        result[0] = false;
        result[1].push("U")
    }
    return result
}
