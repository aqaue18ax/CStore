import http from '@/utils/http'

function agency() {
  return http.get("api/agency?all=1")
}

function province(agency_id, all = 0) {
  return http.get(`api/agency/province/${agency_id}/${all}`)
}

function city(code, all) {
  return http.get(`api/area/city/${code}?all=all`)
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

function kpi(province, agency, year) {
  return http.post("api/statistics/kpi", { province, agency, year })
}

function competitor(province, module, agency) {
  return http.post("api/statistics/competitor", { province, agency, module })
}

function terminal(code) {
  return http.post("api/statistics/terminal", { code })
}

export default {
  agency,
  province,
  city,
  module,

  market,
  newly,
  sale,
  kpi,
  competitor,
  terminal
}