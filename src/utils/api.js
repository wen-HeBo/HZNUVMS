import http from './http.service'

export default {
  login(options) {
    return http.post(`/login`, options)
  },
  addUser(options) {
    return http.post(`/admin/add`, options)
  },
  getUser(params) {
    return http.get(`/admin/query`, params)
  },
  getUserById(params) {
    return http.get(`/admin/getUserById`, params)
  },
  updateUser(options) {
    return http.post(`/admin/updateUser`, options)
  },
  updatePassword(params) {
    return http.get(`/admin/updatePassword`, params)
  },
  deleteUser(params) {
    return http.get(`/admin/deleteUser`, params)
  },
  addRecruit(options) {
    return http.post(`/recruit/addRecruit`, options)
  },
  getRecruiting() {
    return http.get(`/recruit/getRecruiting`)
  },
  getRecruited(params) {
    return http.get(`/recruit/getRecruited`, params)
  },
  getRecruitById(params) {
    return http.get(`/recruit/getRecruitById`, params)
  },
  changeRecruitStatus(params) {
    return http.get(`/recruit/changeRecruitStatus`, params)
  },
  updateRecruit(options) {
    return http.post(`/recruit/updateRecruit`, options)
  },
  deleteRecruit(params) {
    return http.get(`/recruit/deleteRecruit`, params)
  },
  getRecruitNum(params) {
    return http.get(`/record-recruit/getRecord`, params)
  },
  getRecruitVolunteer(params) {
    return http.get(`/record-recruit/getRecruitVolunteer`, params)
  },
  getVolunteer(params) {
    return http.get(`/volunteer/getVolunteer`, params)
  },
  addActivity(options) {
    return http.post(`/activity/addActivity`, options)
  },
  getActivity(params) {
    return http.get(`/activity/getActivity`, params)
  },
  getActivityQuery(params) {
    return http.get(`/activity/getActivityQuery`, params)
  },
  getActivityById(params) {
    return http.get(`/activity/getActivityById`, params)
  },
  getActivityApproval(params) {
    return http.get(`/activity/getActivityApproval`, params)
  },
  approvalActivity(params) {
    return http.get(`/activity/approvalActivity`, params)
  },
  updateActivity(params) {
    return http.get(`/activity/updateActivity`, params)
  },
  getVolunteerHours(params) {
    return http.get(`/record-volunteerhours/getVolunteerHours`, params)
  },
  addBase(options) {
    return http.post(`/volunteer-base/addBase`, options)
  },
  getBaseAll(params) {
    return http.get(`/volunteer-base/getBaseAll`, params)
  },
  getBaseById(params) {
    return http.get(`/volunteer-base/getBaseById`, params)
  },
  updateBase(params) {
    return http.get(`/volunteer-base/updateBase`, params)
  },
  getBaseList(params) {
    return http.get(`/volunteer-base/getBaseList`, params)
  },
  getVolunteerHoursList(params) {
    return http.get(`/record-volunteerhours/getVolunteerHoursList`, params)
  },
  getHours(params) {
    return http.get(`/record-volunteerhours/getHours`, params)
  },
  updateVolunteerHours(params) {
    return http.get(`/record-volunteerhours/updateVolunteerHours`, params)
  },
  deleteHours(params) {
    return http.get(`/record-volunteerhours/deleteHours`, params)
  },
  getHoursAll(params) {
    return http.get(`/record-volunteerhours/getHoursAll`, params)
  },
  getHoursByActivity(params) {
    return http.get(`/record-volunteerhours/getHoursByActivity`, params)
  },
  getBlackList(params) {
    return http.get(`/record-points/getBlackList`, params)
  },
  getPointsList(params) {
    return http.get(`/record-points/getPointsList`, params)
  },
  getPoints(params) {
    return http.get(`/record-points/getPoints`, params)
  },
  addPoints(options) {
    return http.post(`/record-points/addPoints`, options)
  }
}
