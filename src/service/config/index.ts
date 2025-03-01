// let BASE_URL1 = "http://codercba.com:9002/"
// if (import.meta.env.MODE === "production") {
//   BASE_URL1 = "http://codercba.com:9002/"
// } else {
//   BASE_URL1 = "http://codercba.com:9002/"
// }
let BASE_URL1 = "/api"
if (import.meta.env.MODE === "production") {
  BASE_URL1 = "/api"
} else {
  BASE_URL1 = "/api"
}
export { BASE_URL1 }
export const TIME_OUT1 = 10000
