import area from "./area.js";

export default (code) => {
  if (!code) return

  code         = code.toString();
  let province = code.slice(0, 2).padEnd(6, 0);
  let city     = code.slice(0, 4).padEnd(6, 0);
  let county   = code;

  province = area.province_list[province]
  city     = area.city_list[city]
  county   = area.county_list[county]

  let address = province

  if (city) {
    address += '∙' + city
  }

  if (county) {
    address += '∙' + county
  }

  return address
}