import { CustomerActionTypes } from "./actions"

const initialState: CustomerState = {
  customers: [
    {
      id: 1,
      name: 'Danilo Lameira da Costa',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999'
    },
    {
      id: 2,
      name: 'Samir Afonso Tabanez',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999'
    },
    {
      id: 3,
      name: 'Cândido Figueiredo Semedo',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999'
    },
    {
      id: 4,
      name: 'Saúl Santos Sandinha',
      street: 'Rua Francisco Mota',
      streetNumber: 572,
      federationUnity: 'RN',
      city: 'Mossoró',
      phone: '999999999'
    },
  ]
}

// type PayloadAciton = {
//   type: string,
//   payload: {
//     name: string,
//     street: string
//   }
// }

// ! Alterar a tipagem da 'action'
function customerReducer(state = initialState, action: any) {
  switch (action.type) {
    case CustomerActionTypes.ADD_NEW_CUSTOMER: 
    // const newCustomer: Customer = {
    //   id: Math.random(),
    //   name: action.customer.name,
    //   street: action.customer.street,
    //   streetNumber: action.customer.streetNumber,
    //   federationUnity: action.customer.federationUnity,
    //   city: action.customer.city,
    //   phone: action.customer.phone,
    // }
    //state.customers.concat(newCustomer) 
      return {
        ...state,
        customers: [...state.customers, action.payload.customer]
      }
    default:
      return state
  }

}

export default customerReducer