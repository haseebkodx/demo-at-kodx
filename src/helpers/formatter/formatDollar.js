// const formatDollar = (number) => {
//   let value = number && number.toString().replace(/\D/g, '');
//   value = value && value[0] === '$' ? value : value != null ? `$${value}` : ''
//   return value
// }

// const formatDollar = (number) => {
//   number = number && number.toString().replace(/[^\d.]/g, '').replace("$", "");
//   let [value] = Number.parseFloat(number).toFixed(2).split(".")
//   value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//   if (isNaN(value) && !value.includes(",")) return 0
//   return `$${value}`
// }

const formatDollar = (number) => {
  if (typeof number !== "number") {
    number = parseFloat(number.toString().replace(/[^\d.-]/g, ""));
    if (isNaN(number)) return "$0.00";
  }

  let value = number.toFixed(2).split(".")[0];
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `$${value}`;
};

export default formatDollar;
