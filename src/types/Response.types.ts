export type SuccessResponse = {
  success : boolean | null,
  message : string | null,
  field : string | null
}

export type AuthPayloadSuccess = {
  success : boolean,
  message : string,
  field : string,
  token : string,
  role : string
}

export type RoomResponse = {
  success : boolean,
  message : string
}
