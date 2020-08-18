import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import CreateStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import { any } from 'ramda'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    app: require('./AppRedux').reducer,
    // begin Ignite-Entity-Login
    privilege: require('../features/Privilege/redux').reducer,
    myprofile: require('../Containers/Myprofile/redux').reducer,
    courseenrollment: require('../features/CourseEnrollment/redux').reducer,
    tablepagination: require('../features/TablePagination/redux').reducer,
    login: require('../Containers/Login/redux').reducer,
    pagination: require('../Containers/Pagination/redux').reducer,
    modal: require('../Containers/Modal/redux').reducer,
    signup: require('../features/Signup/redux').reducer,
    // signup: require('../Containers/Signup/redux').reducer,
    rptransaction: require('../Containers/RpMerchant/Transaction/redux').reducer,
    rptransactionfilter: require('../Containers/RpMerchant/TransactionHistory/redux').reducer,
    rptopupemoney: require('../Containers/RpMerchant/TopupEmoney/redux').reducer,
    rppayment: require('../Containers/RpMerchant/PayBill/redux').reducer,
    rpqrmerchant: require('../Containers/RpMerchant/ModalQrMerchant/redux').reducer,
    rpmerchantprofile: require('../Containers/RpMerchant/Profile/redux').reducer,
    rpforgetpassword: require('../Containers/ForgetPassword/redux').reducer,
    rpchangepassword: require('../Containers/RpMerchant/ModalChangePassword/redux').reducer,
    myaccountpage: require('../Containers/RpMerchant/MyAccount/redux').reducer,
    merchantdashboard: require('../Containers/RpMerchant/Dashboard/redux').reducer,
    merchantsettlement: require('../Containers/RpMerchant/Settlement/redux').reducer,
    merchantrelatedinstitution: require('../Containers/RpMerchant/MerchantRelatedInstitution/redux').reducer,
    splash: require('../Containers/RpMerchant/SplashScreen/redux').reducer,
    changepassword: require('../features/ChangePassword/redux').reducer
  })
  let finalReducers = rootReducer

  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, rootReducer)
  }
  const store = CreateStore(finalReducers, rootSaga)
  return { store }

  // return configureStore(finalReducers, rootSaga)
}