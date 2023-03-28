import logoCrevettic from '../../assets/logo.svg'

import { CustomHeader } from './styles'

export function Header() {
  return (
    <CustomHeader>
      <img src={logoCrevettic} alt="Logo Crevettic" />
    </CustomHeader>
  )
}
