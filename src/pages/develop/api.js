import http from '@/utils/http'

//首页统计数据
function config() {
  return http.get("api/config/index")
}
function agency() {
  return http.get("api/agency?all=1")
}

function province(agency_id, all = 0) {
  return http.get(`api/agency/province/${agency_id}/${all}`)
}

function city(code, all) {
  return http.get(`api/area/city/${code}?all=${all}`)
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

// 办事处历年费用,year:年份
function agenceSpending(year) {
  return http.get("api/agency_fee/index", { year })
}

// 强弱区域终端建设历年费用,year:年份
function terminalSpending(year) {
  return http.get("api/region_contrast_fee/index", { year })
}

function marketTop10(type = 'performance', year) {
  return http.post(`api/statistics/marketTop10`, { type, year })
}

function storeTop10(type = 'performance', year) {
  return http.post(`api/statistics/storeTop10`, { type, year })
}

export default {
  config,
  agency,
  province,
  city,
  module,

  market,
  newly,
  sale,
  kpi,
  competitor,
  terminal,
  agenceSpending,
  terminalSpending,
  marketTop10,
  storeTop10,
}