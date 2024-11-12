interface CoWorkingSpace{
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
