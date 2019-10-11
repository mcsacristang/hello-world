//.gitignore

module.exports = {
  google: {
    clientID: '726044956858-tir45cbkqr8emcvcj8unabr2hj8jf63i.apps.googleusercontent.com',
    clientSecret: 'NC71ZMyHs8GJdxG8kPf6x7I0'
  },
  outlook: {
    clientID: 'd3860e23-f14c-448b-95b0-e685e372b0be',
    clientSecret: 'wHc4Dq6uyJmYjr5V2E[VHWL/WBKOiq@]'
  },
  session: {
    cookieKey: 'N3Xt0n1A'
  }, 
  insight: {
    key: '10657acd-6a24-4ed6-9bd1-b647eeacef87'
  },
  cosmodb: {
    host: 'mongodb://nextoniadb.documents.azure.com:10255/dashboardDB',
    user: 'nextoniadb',
    psk: 'YX83Y5XILIDeNXvowaSEBDop4vZ0nzK8uC2PcnBvFlrODzOHkDtf3CgBW4PKtUFUDTWSDNiUOGUZdRSOeHhJPQ=='
  },
  pib: {
    user: 'nextoniapbi@nextonia.com.co',
    psk: 'Pbi1.9N3xt0n&A',
    /*user: 'alejandro.abdel@nextonia.com.co',
    psk: 'G4l4g3r76',*/
    workspaceId: '1183a77a-c48c-4bf3-b98c-9d8d3b8ee61a',
    reportId: 'ae81de3f-2ee7-49c9-9807-e0e4222e54ac',
    tenant: 'nextoniadmhotmailcom.onmicrosoft.com',
    /*client: 'e263ee8f-ab53-4981-8a34-8ed11048b6b7',
    secret: 'YnOt?-p:3YZ8u0F?YXE2Z[fR--Bzf[x9',*/
    //PbiTest (10/10/19)
    /*client: '89fa6aff-9164-4547-a74c-90e2f6ae46f0',
    secret: '3lsBuM8GvkcjkBb7QYeDQvbnxPVJU7BPWdreGLIli5U=',*/
    //TestPbi
    //client: '57a847ab-7f65-42c6-a171-dca39f68d445',
    //PibDeploy
    client: '570e0724-e540-4462-b51c-9729beb55ba8',
    authorityHostUrl : "https://login.windows.net",
    resourceUrl : "https://analysis.windows.net/powerbi/api",
    apiUrl : "https://api.powerbi.com/",
    embedUrlBase: 'https://app.powerbi.com/'
  }
};
