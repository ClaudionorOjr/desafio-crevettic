import { MouseEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {v4 as uuidv4} from 'uuid'
import axios from "axios"

import { Box, Button, Grid, MenuItem, Typography } from "@mui/material"
import { useFormik } from "formik"
import * as yup from 'yup'

import { Customer } from "../../../redux/customer/reducer"
import { addNewCustomerAction } from "../../../redux/customer/actions"

import { CustomBox, CustomTextField } from "./styles"

interface FederationUnities {
  id: number,
  sigla: string,
}

interface Cities {
  id: string,
  nome: string
}

interface NewCustomerProps {
  handleClose: () => void
}

const formSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  street: yup.string().required('Campo obrigatório'),
  streetNumber: yup.number().required('Campo obrigatório'),
  federationUnity: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
  phone: yup.string().required('Campo obrigatório')
})

export function NewCustomer({ handleClose }: NewCustomerProps) {
  const [federationUnities, setFederationUnities] = useState<FederationUnities[]>([])
  const [selectedUf, setSelectedUf] = useState('')
  const [cities, setCities] = useState<Cities[]>([])

  const dispatch = useDispatch()

  const newCustomerForm = useFormik({
    initialValues: {
      name: '',
      street: '',
      streetNumber: '',
      federationUnity: '',
      city: '',
      phone: ''
    },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {

      const newCustomer: Customer = {
        id: uuidv4(),
        name: values.name,
        street: values.street,
        streetNumber: Number(values.streetNumber),
        federationUnity: values.federationUnity,
        city: values.city,
        phone: values.phone,
      }

      dispatch(addNewCustomerAction(newCustomer))
    
      actions.resetForm()
    }
  })

  const {handleSubmit, handleChange, values, touched, errors} = newCustomerForm

  useEffect(() => {
    axios
    .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((response) => {
      setFederationUnities(response.data)
    })  
  }, [])

  useEffect(() => {
    axios
    .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then((response) => {
      setCities(response.data)
    })
  }, [selectedUf])

  function handleSelectedUf(event: MouseEvent<HTMLLIElement>) {
    const federationUnity = event.currentTarget.getAttribute('data-value')
    
    if (federationUnity){
      setSelectedUf(federationUnity)
    }
  }

  return (
    <CustomBox>
      <Typography 
        variant="h1"
        fontWeight={500}
        sx={{ fontSize: 20 , marginBottom: '2rem' }}
      >
        Adicionar novo cliente
      </Typography>

      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={5} >
          <Grid item xs={5}>
            <CustomTextField
              label='Nome'
              name='name'
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>

          <Grid item xs={4}>
            <CustomTextField
              label='Rua'
              name='street'
              value={values.street}
              onChange={handleChange}
              error={touched.street && Boolean(errors.street)}
              helperText={touched.street && errors.street}
            />
          </Grid>

          <Grid item xs={1}>
            <CustomTextField
              label='Número'
              name='streetNumber'
              value={values.streetNumber}
              onChange={handleChange}
              error={touched.streetNumber && Boolean(errors.streetNumber)}
              helperText={touched.streetNumber && errors.streetNumber}
            />
          </Grid>

          <Grid item xs={1}>
            <CustomTextField
              select
              label='Estado'
              name='federationUnity'
              value={values.federationUnity}
              onChange={handleChange}
              error={touched.federationUnity && Boolean(errors.federationUnity)}
              helperText={touched.federationUnity && errors.federationUnity}
            >
              {federationUnities.map((federationUnity) => {
                return (
                  <MenuItem 
                    key={federationUnity.id} 
                    value={federationUnity.sigla} 
                    onClick={handleSelectedUf}
                  >
                    {federationUnity.sigla}
                  </MenuItem>
                )
              })}
            </CustomTextField>
          </Grid>

          <Grid item xs={2}>
            <CustomTextField
              select
              label='Cidade'
              name='city'
              value={values.city}
              onChange={handleChange}
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
            >
              {cities.map((city) => {
                return (  
                  <MenuItem
                    key={city.id}
                    value={city.nome}
                  >
                    {city.nome}
                  </MenuItem>
                )
              })}
            </CustomTextField>
          </Grid>

          <Grid item xs={2}>
            <CustomTextField
              label='Telefone'
              name='phone'
              value={values.phone}
              onChange={handleChange}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Grid>
        </Grid>

        <Box sx={{width: 1, display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: '4rem'}}>
          <Button 
            sx={{ width: 176, textTransform:'none' }}
            variant='outlined'
            onClick={handleClose}
          >Cancelar</Button>
          <Button 
            sx={{ width: 176, textTransform: "none" }} 
            variant='contained' 
            type="submit"
          >
            Adicionar
          </Button>

        </Box>
      </form>
    </CustomBox>
  )
}