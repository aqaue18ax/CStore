import http from '@/utils/http'



function agency() {
  return http.get("api/agency")
}

function province(agency_id) {
  return http.get(`api/agency/province/${agency_id}`)
}

function module() {
  return http.get("api/module/tree")
}

function markey(province, module, agency) {
  return http.post("api/statistics/dev", { province, module, agency })
}

function newly(province, module, agency, year) {
  return http.post("api/statistics/newly", { province, module, agency, year })
}

function sale(province, agency, year) {
  return http.post("api/statistics/sale", { province, agency, year })
}

function competitor(province, agency, module) {
  return http.post("api/statistics/competitor", { province, agency, module })
}

export default {
  agency,
  province,
  module,

  markey,
  newly,
  sale,
  competitor
}