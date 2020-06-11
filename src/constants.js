const localhost = "http://127.0.0.1:8000";
export const site_host = localhost;

const apiURL = "/api/v1";
export const endpoint = `${localhost}${apiURL}`;

export const accountEditURL = `${endpoint}/accounts/edit/`;
export const productDeleteURL = id => `${endpoint}/reklama/edit/${id}/`;

export const profileListURL = `${endpoint}/reklama/profile/list/`;

export const PostCreateCarURL = `${endpoint}/reklama/add/car/`;
export const PostCreateURL = `${endpoint}/reklama/add/car/`;
export const PostCreateMyURL = `${endpoint}/reklama/add/car/`;
export const PostCreateItemURL = `${endpoint}/reklama/add/item/`;

export const postCatedoryURL = `${endpoint}/reklama/list/`;
export const no_image = '/media/none/no-img.jpg';


export const postDetailURL = id => `${endpoint}/reklama/detail/${id}/`;

export const commentsListURL = id => `${endpoint}/comments/post/${id}/`;
export const commentsPaginURL = `${endpoint}/comments/`;

export const commentCreateURL = `${endpoint}/comments/create/`;