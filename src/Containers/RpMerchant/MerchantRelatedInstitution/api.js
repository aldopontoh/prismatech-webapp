// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256} from '../../../Utils/Utils'

export const create = api => ({
  fetchMerchantRelatedInsitution: ({merchant_id}) => {
    const body = `query{
      showRelatedInstitution(merchant_id:"${merchant_id}")
      {
        status
        error
        institution {
          institution_id
          email
          fullname
          business_name
          device_id
          address
          created_at
        }
      }
    }`
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
