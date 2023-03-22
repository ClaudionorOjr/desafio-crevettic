interface Customer {
  id: number
  name: string,
  street: string,
  streetNumber: number,
  federationUnity: string,
  city: string,
  phone: string
}

type CustomerState = {
  customers: Customer[]
}

type CustomerAction = {
  type: string,
  customer: Customer 
}