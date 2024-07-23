/* eslint-disable no-useless-escape */
let backendHost

const hostname = window && window.location && window.location.hostname
const path = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1')

if (hostname === 'localhost') {
  backendHost = `http://${hostname}:3001/api`
}
else if (hostname === 'test-mpp-lb-282459929.us-east-2.elb.amazonaws.com') {
  backendHost = `http://${hostname}/api`
}
else if (hostname === 'ec2-3-128-3-48.us-east-2.compute.amazonaws.com') {
  backendHost = `https://${hostname}/api`
}
else if (hostname === 'mpp-test.eccalon.com/') {
  backendHost = `https://${hostname}/api`
}
else if (hostname === 'mpp-staging.eccalon.com') {
  backendHost = `https://${hostname}/api`
}
else {
  backendHost = (path === 'mppstage' || path === 'mpp') ? `https://${hostname}/${path}/api` : `https://${hostname}/api`
}
export default { devUrl: backendHost }
