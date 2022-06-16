export const rupiahFormat = (num) => {
  return parseInt(num).toLocaleString("id-ID", { style: "currency", currency: "IDR" })
}
