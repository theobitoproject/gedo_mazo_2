import { Common as GoogleApisCommon } from 'googleapis'

// Auth is the Google Auth object needed to authenticate/authorize request to Google APIs
export type Auth =
  | string
  | GoogleApisCommon.OAuth2Client
  | GoogleApisCommon.JWT
  | GoogleApisCommon.Compute
  | GoogleApisCommon.UserRefreshClient
  | GoogleApisCommon.BaseExternalAccountClient
  | GoogleApisCommon.GoogleAuth
