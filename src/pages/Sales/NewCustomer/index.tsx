import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { CustomBox, CustomButton } from "./styles"
import * as yup from 'yup'
import { MouseEvent, useEffect, useState } from "react"
import axios from "axios"
import { useAppDispatch } from "../../../redux/hooks"
import { addCustomer } from "../../../redux/customerSlice"

interface FormData {
  name: string,
  street: string,
  streetNumber: string,
  federationUnity: string,
  city: string,
  phone: string
}

interface UF {
  id: number,
  sigla: string,
}

interface Cities {
  id: string,
  nome: string
}

export function NewCustomer() {
  const [ufs, setUfs] = useState<UF[]>([])
  const [selectedUf, setSelectedUf] = useState('')
  const [cities, setCities] = useState<Cities[]>([])
  const dispatch = useAppDispatch()

  const initialValues: FormData = {
    name: '',
    street: '',
    streetNumber: '',
    federationUnity: '',
    city: '',
    phone: ''
  }

  const formSchema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    street: yup.string().required('Campo obrigatório'),
    streetNumber: yup.number().required('Campo obrigatório'),
    federationUnity: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    phone: yup.string().required('Campo obrigatório')
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(addCustomer(values))
      alert(JSON.stringify(values, null, 2))
    }
  })

  useEffect(() => {
    axios
    .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((response) => {
      setUfs(response.data)
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
    const uf = event.currentTarget.getAttribute('data-value')
    
    if(uf){
      setSelectedUf(uf)
    }
  }

  console.log(ufs)
  console.log(selectedUf)
  console.log(cities)
  // console.log(formik.values.state)

  return (
    <CustomBox>
      <Typography variant="h1"
        sx={{fontSize: 20}}
      >
        Adicionar novo cliente
      </Typography>

      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} columns={5} >
          <Grid item xs={5}>
            <TextField
              fullWidth 
              // id='name'
              label='Name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField 
              fullWidth
              label='Rua'
              name='street'
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField 
              fullWidth
              label='Número'
              name='streetNumber'
              value={formik.values.streetNumber}
              onChange={formik.handleChange}
              error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
              helperText={formik.touched.streetNumber && formik.errors.streetNumber}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField 
              fullWidth
              select
              label='Estado'
              name='federationUnity'
              value={formik.values.federationUnity}
              onChange={formik.handleChange}
              error={formik.touched.federationUnity && Boolean(formik.errors.federationUnity)}
              helperText={formik.touched.federationUnity && formik.errors.federationUnity}
            >
              {ufs.map((uf) => {
                return (
                  <MenuItem key={uf.id} value={uf.sigla} onClick={handleSelectedUf}>
                    {uf.sigla}
                  </MenuItem>
                )
              })}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              select
              label='Cidade'
              name='city'
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
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
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              label='Telefone'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
        </Grid>

        <Box sx={{width: 1, justifyContent: "flex-end"}}>
          {/* <CustomButton sx={{width: 176, textTransform: "none"}} variant="outlined">Cancelar</CustomButton> */}
          <Button sx={{width: 176, textTransform: "none"}} variant='outlined' type="submit">Adicionar</Button>
        </Box>
      </form>
    </CustomBox>
  )
}