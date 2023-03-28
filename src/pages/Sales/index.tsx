import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import {
  MenuItem,
  Grid,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { RootState } from '../../redux/rootReducer'
import { Sale } from '../../redux/sale/reducer'
import { addNewSaleAction } from '../../redux/sale/actions'

import { NewCustomer } from './NewCustomer'

import {
  CustomBox,
  CustomForm,
  CustomTextField,
  CustomTypography,
} from './styles'
import { NumericFormat } from 'react-number-format'

const newSaleFormSchema = yup.object().shape({
  description: yup
    .string()
    .required('Campo obrigatório')
    .min(5, 'Descrição curta demais'),
  status: yup.string().required('Campo obrigatório'),
  customer: yup.string().required('Campo obrigatório'),
  saleDate: yup.date().required('Campo obrigatório'),
  amount: yup.string().required('Campo obrigatório'),
  price: yup.string().required('Campo obrigatório'),
})

// type newSaleFormData = yup.InferType<typeof newSaleFormSchema>

export function Sales() {
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  const handleOpen = () => setModal(true)
  const handleClose = () => setModal(false)

  const { customers } = useSelector(
    (rootReducer: RootState) => rootReducer.customerReducer,
  )

  const newSaleForm = useFormik({
    initialValues: {
      description: '',
      status: '',
      customer: '',
      saleDate: '',
      amount: '',
      price: '',
    },
    validationSchema: newSaleFormSchema,
    onSubmit: (values, actions) => {
      values.price = values.price.replace(/[R$.]/g, '')
      values.price = values.price.replace(/[,]/g, '.')

      values.amount = values.amount.replace(/[Kg]/g, '')
      values.amount = values.amount.replace(/[,]/g, '.')

      const newSale: Sale = {
        id: uuidv4(),
        description: values.description,
        status: values.status,
        customer: values.customer,
        saleDate: new Date(values.saleDate),
        amount: Number(values.amount),
        price: Number(values.price),
      }

      dispatch(addNewSaleAction(newSale))

      actions.resetForm()
    },
  })

  const {
    handleSubmit,
    handleChange,
    handleReset,
    values,
    touched,
    errors,
    isSubmitting,
  } = newSaleForm

  return (
    <Box
      sx={{
        width: '100vw',
        height: 'calc(100vh - 5rem)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CustomBox>
        <CustomTypography variant="h1">Dados da Venda</CustomTypography>

        <CustomForm noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} columns={3}>
            <Grid item xs={3}>
              <CustomTextField
                label="Descrição"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>

            <Grid item xs={1}>
              <CustomTextField
                select
                label="Status"
                name="status"
                value={values.status}
                onChange={handleChange}
                error={touched.status && Boolean(errors.status)}
                helperText={touched.status && errors.status}
              >
                <MenuItem key="concluida" value="concluida">
                  Concluída
                </MenuItem>

                <MenuItem key="cancelada" value="cancelada">
                  Cancelada
                </MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={2}>
              <CustomTextField
                SelectProps={{
                  MenuProps: {
                    sx: { maxHeight: 200 },
                  },
                }}
                select
                label="Cliente"
                name="customer"
                value={values.customer}
                onChange={handleChange}
                error={touched.customer && Boolean(errors.customer)}
                helperText={touched.customer && errors.customer}
              >
                {customers.map((customer) => {
                  return (
                    <MenuItem
                      key={customer.id}
                      value={customer.name}
                      sx={{ fontWeight: 500 }}
                    >
                      {customer.name}
                    </MenuItem>
                  )
                })}

                <MenuItem
                  sx={{ border: 1, borderRadius: 1, borderColor: '#999' }}
                >
                  <Typography>
                    Deseja cadastrar outro fornecedor?
                    <Button sx={{ textTransform: 'none' }} onClick={handleOpen}>
                      Cadastrar Fornecedor+
                    </Button>
                  </Typography>
                </MenuItem>
              </CustomTextField>
            </Grid>

            <Modal open={modal} onClose={handleClose}>
              <NewCustomer handleClose={handleClose} />
            </Modal>

            <Grid item xs={1}>
              <CustomTextField
                // label='Data da venda'
                name="saleDate"
                type="date"
                value={values.saleDate}
                onChange={handleChange}
                error={touched.saleDate && Boolean(errors.saleDate)}
                helperText={touched.saleDate && errors.saleDate}
              />
            </Grid>

            <Grid item xs={1}>
              <NumericFormat
                customInput={TextField}
                suffix={' Kg'}
                decimalScale={2}
                decimalSeparator={','}
                allowNegative={false}
                sx={{
                  width: '100%',
                  input: {
                    fontWeight: 500,
                  },
                  label: {
                    color: `#545454`,
                    fontWeight: 500,
                  },
                }}
                label="Quantidade"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
              />
            </Grid>

            <Grid item xs={1}>
              <NumericFormat
                customInput={TextField}
                prefix={'R$ '}
                thousandsGroupStyle={'thousand'}
                thousandSeparator={'.'}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator={','}
                allowNegative={false}
                sx={{
                  width: '100%',
                  input: {
                    fontWeight: 500,
                  },
                  label: {
                    color: `#545454`,
                    fontWeight: 500,
                  },
                }}
                label="Preço da venda"
                name="price"
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
            </Grid>

            <Grid item xs={3 / 2}>
              <Button
                sx={{ width: 1, fontWeight: 600 }}
                variant="contained"
                color="neutral"
                onClick={handleReset}
              >
                Voltar
              </Button>
            </Grid>
            <Grid item xs={3 / 2}>
              <Button
                sx={{ width: 1, fontWeight: 600 }}
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </CustomForm>
      </CustomBox>
    </Box>
  )
}
