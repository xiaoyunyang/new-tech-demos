export interface User {
  name: string;
  id: string;
}
const mockUsers = [
    { id: "u1", name: "Daryl Bishop" },
    { id: "u2", name: "Dwight Welch" },
    { id: "u3", name: "Renee Gilbert" },
    { id: "u4", name: "Debra Rose" },
    { id: "u5", name: "Annie Vasquez" },
    { id: "u6", name: "Tara Ford" },
    { id: "u7", name: "Gavin Shaw" }
];

// TODO: Need to implement api Response for error
const getAllUsers = (hasError = false): Promise<any> => {
    // eslint-disable-next-line no-console
    console.log("fetching users from api");
    const p = new Promise<User[]>(
        (resolve, reject) => (hasError
            ? setTimeout(reject, 3000, "Oops! There's an Error")
            : setTimeout(resolve, 3000, mockUsers))
    );

    return p;
};

export default getAllUsers;
