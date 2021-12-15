export const validMobileNumber = new RegExp(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{8})$/i);
export const validEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/);
export const validPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/);
export const validString = new RegExp(/^[a-zA-Z][a-zA-Z\s]+$/);
export const validAddress = new RegExp(/^[a-zA-Z][a-zA-Z0-9\s,.'-]{1,}$/);
export const validCNIC = new RegExp(/^[0-9]{5}-[0-9]{7}-$/i);
// export const validCNIC = new RegExp(/^[0-9]{5}-[0-9]{7}-[0-9]$/i);
