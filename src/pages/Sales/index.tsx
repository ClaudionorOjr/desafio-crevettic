import { MenuItem, TextField, InputAdornment, Grid, Button, Popover, Typography, Modal } from '@mui/material'
import { useFormik, yupToFormErrors } from 'formik';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState, Reducer } from 'redux';

import rootReducer from '../../redux/rootReducer';
import { Sale } from '../../redux/sale/reducer';
import { useAppSelector } from '../../reduxToolkit/hooks';
import { NewCustomer } from './NewCustomer';
import * as yup from 'yup'

import styles from './styles.module.css'
import { addNewSaleAction } from '../../redux/sale/actions';

const formSchema = yup.object().shape({
  description: yup.string().required('Campo obrigatório'),
  status: yup.string().required('Campo obrigatório'),
  customer: yup.string().required('Campo obrigatório'),
  saleDate: yup.date().required('Campo obrigatório'),
  amount: yup.number().required('Campo obrigatório'),
  price: yup.number().required('Campo obrigatório')
})

export function Sales() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const { customers } = useSelector((rootReducer: CombinedState<{customerReducer: CustomerState}>) => rootReducer.customerReducer)
  console.log(customers)  

  // const {customer} = useAppSelector(state => state)


  // const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  // const handleClick = (event: MouseEvent<HTMLDivElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  const newSaleForm = useFormik({
    initialValues: {
      description: '',
      status: '',
      customer: '',
      saleDate: '',
      amount: '',
      price: ''
    },

    validationSchema: formSchema,
    onSubmit: (values) => {
      const newSale: Sale = {
        id: Math.random(),
        description: values.description,
        status: values.status,
        customer: values.customer,
        saleDate: new Date(values.saleDate),
        amount: Number(values.amount),
        price: Number(values.price),
      }

      dispatch(addNewSaleAction(newSale))

      alert(JSON.stringify(values, null, 2))
    }
  })

  const { handleSubmit, handleChange, values, touched, errors } = newSaleForm

  return (
    <div className={styles.container}>
      <Typography variant='h1' fontWeight={600}>Dados da Venda</Typography>

      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={3}>
          
          <Grid item xs={3}>
            <TextField 
              sx={{
                input: {
                  fontWeight: 500
                },
                label: { 
                  color: '#545454',
                  fontWeight: 500
                }}}
              fullWidth
              label='Descrição' 
              name='description'
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField
              sx={{
                input: {
                  fontWeight: 500
                }, 
                label: { 
                  color: '#545454', 
                  fontWeight: 500
                }}}
              fullWidth
              select
              label="Status"
              name='status'
              value={values.status}
              onChange={handleChange}
              error={touched.status && Boolean(errors.status)}
              helperText={touched.status && errors.status}
            >
              <MenuItem key='concluído' value='concluído' >
                Concluído
              </MenuItem>

              <MenuItem key='erro' value='erro'>
                Erro
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              sx={{
                input: {
                  fontWeight: 500
                }, 
                label: { 
                  color: '#545454', 
                  fontWeight: 500
                }}}
              SelectProps={{
                MenuProps: {
                  sx: { maxHeight: 200}
                }}}
              fullWidth
              select
              label="Cliente"
              name='customer'
              onChange={handleChange}
              error={touched.customer && Boolean(errors.customer)}
              helperText={touched.customer && errors.customer}
              // onClick={handleClick}
              // aria-describedby={id}

            >
              {customers.map((customer) => {
                return <MenuItem key={customer.id} value={customer.name}>{customer.name}</MenuItem>
              })}

              <MenuItem sx={{border: 1, borderRadius: 1}}>
                <Typography >
                  Deseja cadastrar outro fornecedor?
                  <Button sx={{textTransform: 'none'}} onClick={handleOpen}>Cadastrar Fornecedor+</Button>
                </Typography>
              </MenuItem>

              {/* <Popover 
                id={id} 
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical:'bottom',
                  horizontal:'left'
                }}
                sx={{width: 1, zIndex: 2}}
              >
                <Typography sx={{ width: 1, p: 2 }}>Teste</Typography>
              </Popover> */}

            </TextField>
          </Grid>

          <Modal open={open} onClose={handleClose}>
            <NewCustomer handleClose={handleClose}/>
          </Modal>

          <Grid item xs={1}>
            <TextField
              sx={{
                input: {
                  fontWeight: 500
                }, 
                label: { 
                  color: '#545454', 
                  fontWeight: 500
                }}}
              fullWidth
              label='Data da venda'
              name='saleDate'
              onChange={handleChange}
              error={touched.saleDate && Boolean(errors.saleDate)}
              helperText={touched.saleDate && errors.saleDate}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField
              sx={{
                input: {
                  fontWeight: 500
                }, 
                label: { 
                  color: '#545454', 
                  fontWeight: 500
                }}}
              InputProps={{
                endAdornment: <InputAdornment position='end'>kg</InputAdornment>
              }}
              fullWidth
              label='Quantidade'
              name='amount'
              value={values.amount}
              onChange={handleChange}
              error={touched.amount && Boolean(errors.amount)}
              helperText={touched.amount && errors.amount}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField
              sx={{
                input: {
                  fontWeight: 500
                }, 
                label: { 
                  color: '#545454', 
                  fontWeight: 500
                }}}
              fullWidth
              label='Preço da venda'
              name='price'
              onChange={handleChange}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />
          </Grid>

          <Grid item xs={3/2}>
            <Button 
              sx={{width: 1, fontWeight: 600}}
              variant='contained'
              color='neutral'
              onClick={newSaleForm.handleReset}
            > 
              Voltar
            </Button>
          </Grid>
          <Grid item xs={3/2}>
            <Button 
              sx={{width: 1, fontWeight: 600}} 
              variant='contained'
              type='submit'
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}