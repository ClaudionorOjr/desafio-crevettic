import { MenuItem, TextField, InputAdornment, Grid, Button, Popover, Typography, Modal } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { NewCustomer } from './NewCustomer';

import styles from './styles.module.css'

const customers = [
  'Danilo Lameira da Costa',
  'Cândido Figueiredo Semedo',
  'Samir Afonso Tabanez',
  'Saúl Santos Sandinha',
  'Danilo Lima da Costa',
  'Cândido Figueiredo Souza',
  'Samir Afonso Tavares',
  'Saúl Ourique Sandinha',
]

export function Sales() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {customer} = useAppSelector(state => state)

  console.log(customer)

  // const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  // const handleClick = (event: MouseEvent<HTMLDivElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  return (
    <div className={styles.container}>
      <h1>Dados da Venda</h1>

      <form action="">
        <Grid container spacing={2} columns={3}>
          
          <Grid item xs={3}>
            <TextField 
              sx={{width: 1}}
              label='Descrição' 
              variant='outlined'
            />
          </Grid>

          <Grid item xs={1}>
            <TextField
              sx={{width: 1}}
              select
              label="Status"
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
              sx={{width: 1}}
              select
              label="Cliente"
              // onClick={handleClick}
              // aria-describedby={id}
              SelectProps={{
                MenuProps: {
                  sx: { maxHeight: 200}
                }
              }}
            >
              {customers.map((customer) => {
                return <MenuItem key={customer} value={customer}>{customer}</MenuItem>
              })}

              <MenuItem sx={{border: 1, borderRadius: 1}}>
                <Typography >
                  Deseja cadastrar outro fornecedor?
                  <Button onClick={handleOpen}>abc</Button>
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
            <NewCustomer />
          </Modal>

          <Grid item xs={1}>
            <TextField
              sx={{width: 1}}
              label='Data da venda'
            />
          </Grid>

          <Grid item xs={1}>
            <TextField
              sx={{width: 1}}
              label='Quantidade'
              InputProps={{
                endAdornment: <InputAdornment position='end'>kg</InputAdornment>
              }}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField
              sx={{width: 1}}
              label='Preço da venda'
            />
          </Grid>

          <Grid item xs={3/2}>
            <Button 
              sx={{width: 1, fontWeight: 600}}
              variant='contained'
              color='neutral'
            > 
              Voltar
            </Button>
          </Grid>
          <Grid item xs={3/2}>
            <Button 
              sx={{width: 1, fontWeight: 600}} 
              variant='contained'
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}