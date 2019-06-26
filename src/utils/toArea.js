import area from "./area.js";

export default (code) => {
  if (!code) return
  code = code.toString();
  // const province = code.slice(0, 2).padEnd(6, 0);
  // const city = code.slice(0, 4).padEnd(6, 0);
  const county = code;

  return area.county_list[county];
}