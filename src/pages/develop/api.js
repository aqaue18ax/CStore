import http from '@/utils/http'

function agency() {
  return http.get("api/agency?all=1")
}

function province(agency_id) {
  return http.get(`api/agency/province/${agency_id}`)
}

function module() {
  return http.get("api/module/tree")
}

function market(province, module, agency) {
  return http.post("api/statistics/dev", { province, module, agency })
}

function newly(province, module, agency, year) {
  return http.post("api/statistics/newly", { province, module, agency, year })
}

function sale(province, agency, year) {
  return http.post("api/statistics/sale", { province, agency, year })
}

function competitor(province, module, agency) {
  return http.post("api/statistics/competitor", { province, agency, module })
}

export default {
  agency,
  province,
  module,

  market,
  newly,
  sale,
  competitor
}