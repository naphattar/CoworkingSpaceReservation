interface CoWorkingSpace{
  _id? : string,
  __v? : number,
  id : string,
  name : string,
  address : string,
  operatingHours : string,
  province : string,
  postalcode : string,
  tel : string,
  picture : string
}
interface CoWorkingSpaceJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CoWorkingSpace[]
}
